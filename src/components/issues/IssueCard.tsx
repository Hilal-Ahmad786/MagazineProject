'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Issue } from '@/types';

interface IssueCardProps {
  issue: Issue;
  variant?: 'default' | 'large' | 'compact';
  className?: string;
}

export function IssueCard({ issue, variant = 'default', className }: IssueCardProps) {
  const formattedDate = new Date(issue.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
  });

  // Large Variant - Featured Issue
  if (variant === 'large') {
    return (
      <Link
        href={`/sayilar/${issue.id}`}
        className={cn(
          'group block bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300',
          className
        )}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] md:aspect-auto">
            <Image
              src={issue.coverImage}
              alt={`Sayı ${issue.number} Kapak`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {issue.featured && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-neutral-900 px-3 py-1 rounded-full text-sm font-bold">
                Güncel Sayı
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-yellow-500 font-bold">Sayı {issue.number}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-yellow-500 transition-colors">
                {issue.title}
              </h2>

              {issue.theme && (
                <p className="text-neutral-400">
                  Tema: <span className="text-neutral-300">{issue.theme}</span>
                </p>
              )}

              {issue.editorsNote && (
                <p className="text-neutral-400 line-clamp-3 leading-relaxed">
                  {issue.editorsNote}
                </p>
              )}

              <div className="flex items-center gap-4 pt-2">
                {(issue as any).articles && (
                  <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                    <FileText className="w-4 h-4" />
                    {(issue as any).articles.length} Yazı
                  </span>
                )}
              </div>

              <div className="pt-4">
                <span className="inline-flex items-center gap-2 text-yellow-500 font-medium group-hover:gap-3 transition-all">
                  Sayıyı İncele
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Compact Variant
  if (variant === 'compact') {
    return (
      <Link
        href={`/sayilar/${issue.id}`}
        className={cn(
          'group block bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300',
          className
        )}
      >
        <div className="p-4">
          <div className="flex gap-4">
            {/* Small Cover */}
            <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={issue.coverImage}
                alt={`Sayı ${issue.number}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className="text-yellow-500 text-sm font-bold">
                Sayı {issue.number}
              </span>
              <h3 className="text-white font-semibold mt-1 group-hover:text-yellow-500 transition-colors line-clamp-2">
                {issue.title}
              </h3>
              <p className="text-neutral-500 text-sm mt-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default Variant
  return (
    <Link
      href={`/sayilar/${issue.id}`}
      className={cn(
        'group block bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300',
        className
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={issue.coverImage}
          alt={`Sayı ${issue.number} Kapak`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {issue.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-neutral-900 px-2.5 py-1 rounded-full text-xs font-bold">
            Güncel
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-yellow-500 font-bold text-sm">
            Sayı {issue.number}
          </span>
          <span className="text-neutral-500 text-sm flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-yellow-500 transition-colors mb-2 line-clamp-2">
          {issue.title}
        </h3>

        {issue.theme && (
          <p className="text-neutral-400 text-sm mb-3">
            {issue.theme}
          </p>
        )}

        {(issue as any).articles && (
          <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-4">
            <FileText className="w-4 h-4" />
            <span>{(issue as any).articles.length} Yazı</span>
          </div>
        )}

        <div className="pt-2">
          <span className="inline-block px-4 py-2 bg-yellow-500 text-neutral-900 text-sm font-bold rounded-lg hover:bg-yellow-400 transition-colors">
            Okumaya Başla
          </span>
        </div>
      </div>
    </Link>
  );
}
