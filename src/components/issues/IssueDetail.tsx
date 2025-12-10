'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, BookOpen, Calendar, FileText, Users, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareButtons } from '@/components/share/ShareButtons';
import type { Issue, Article } from '@/types';

interface IssueDetailProps {
  issue: Issue;
  articles?: Article[];
  className?: string;
}

export function IssueDetail({ issue, articles = [], className }: IssueDetailProps) {
  const formattedDate = new Date(issue.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const uniqueAuthors = new Set(articles.map((a) => a.author.id)).size;

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Cover */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={issue.coverImage}
              alt={`Sayı ${issue.number} Kapak`}
              fill
              className="object-cover"
              priority
            />
            {issue.featured && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-neutral-900 px-3 py-1 rounded-full text-sm font-bold">
                Güncel Sayı
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-3 space-y-6">
          {/* Issue Number & Date */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="bg-yellow-500 text-neutral-900 px-3 py-1 rounded-full font-bold">
              Sayı {issue.number}
            </span>
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>

          {/* Title & Theme */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {issue.title}
            </h1>
            {issue.theme && (
              <p className="text-lg text-neutral-400">
                Tema: <span className="text-yellow-500">{issue.theme}</span>
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 py-4 border-y border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-neutral-800 rounded-lg">
                <FileText className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-white font-semibold">{articles.length}</p>
                <p className="text-neutral-500 text-sm">Yazı</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-neutral-800 rounded-lg">
                <Users className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-white font-semibold">{uniqueAuthors}</p>
                <p className="text-neutral-500 text-sm">Yazar</p>
              </div>
            </div>
          </div>

          {/* Editor's Note */}
          {issue.editorsNote && (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-yellow-500 mb-2 uppercase tracking-wider">
                Editörün Notu
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                {issue.editorsNote}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {issue.pdfUrl && (
              <>
                <Link
                  href={`/oku/${issue.id}`}
                  className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Çevrimiçi Oku
                </Link>
                <a
                  href={issue.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors border border-neutral-700"
                >
                  <Download className="w-5 h-5" />
                  PDF İndir
                </a>
              </>
            )}
            <a
              href={issue.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white px-4 py-2.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Yeni Sekmede Aç
            </a>
          </div>

          {/* Share */}
          <div>
            <p className="text-sm text-neutral-500 mb-2">Bu sayıyı paylaş</p>
            <ShareButtons
              url={`/sayilar/${issue.id}`}
              title={`${issue.title} - Sayı ${issue.number}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini version for sidebars or related sections
interface IssueDetailMiniProps {
  issue: Issue;
  className?: string;
}

export function IssueDetailMini({ issue, className }: IssueDetailMiniProps) {
  const formattedDate = new Date(issue.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <Link
      href={`/sayilar/${issue.id}`}
      className={cn(
        'group flex gap-4 p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-yellow-500/50 transition-all',
        className
      )}
    >
      {/* Mini Cover */}
      <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={issue.coverImage}
          alt={`Sayı ${issue.number}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-yellow-500 text-xs font-bold">
          Sayı {issue.number}
        </span>
        <h4 className="text-white font-semibold mt-1 line-clamp-1 group-hover:text-yellow-500 transition-colors">
          {issue.title}
        </h4>
        <p className="text-neutral-500 text-sm mt-1">{formattedDate}</p>
      </div>
    </Link>
  );
}
