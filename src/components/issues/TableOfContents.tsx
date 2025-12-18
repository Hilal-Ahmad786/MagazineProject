'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, User, BookOpen, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';

interface TableOfContentsProps {
  articles: Article[];
  issueNumber: number;
  showPageNumbers?: boolean;
  className?: string;
}

export function TableOfContents({
  articles,
  issueNumber,
  showPageNumbers = true,
  className,
}: TableOfContentsProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Group articles by category
  const groupedArticles = articles.reduce((acc, article) => {
    const category = article.category || 'Diğer';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  const categories = Object.keys(groupedArticles);

  return (
    <div className={cn('space-y-6', className)}>
      {/* View Toggle */}
      <div className="flex justify-end">
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded-md transition-colors',
              viewMode === 'list'
                ? 'bg-yellow-500 text-neutral-900'
                : 'text-neutral-400 hover:text-white'
            )}
            aria-label="Liste görünümü"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded-md transition-colors',
              viewMode === 'grid'
                ? 'bg-yellow-500 text-neutral-900'
                : 'text-neutral-400 hover:text-white'
            )}
            aria-label="Grid görünümü"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              {/* Category Header */}
              <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {category}
              </h3>

              {/* Articles */}
              <div className="space-y-2">
                {groupedArticles[category].map((article, index) => (
                  <TableOfContentsItem
                    key={article.id}
                    article={article}
                    index={index + 1}
                    showPageNumber={showPageNumbers}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <TableOfContentsCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400">Bu sayıda henüz yazı bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}

// Single item in list view
interface TableOfContentsItemProps {
  article: Article;
  index: number;
  showPageNumber?: boolean;
}

function TableOfContentsItem({
  article,
  index,
  showPageNumber = true,
}: TableOfContentsItemProps) {
  return (
    <Link
      href={`/yazilar/${article.slug}`}
      className="group flex items-center gap-4 p-4 bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-800 hover:border-yellow-500/50 transition-all"
    >
      {/* Index Number */}
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-neutral-800 group-hover:bg-yellow-500 rounded-lg transition-colors">
        <span className="text-neutral-400 group-hover:text-neutral-900 font-bold transition-colors">
          {index.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold group-hover:text-yellow-500 transition-colors line-clamp-1">
          {article.title}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {article.author?.name}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime} dk
          </span>
        </div>
      </div>

      {/* Page Number & Arrow */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {showPageNumber && article.page && (
          <span className="text-neutral-600 text-sm">
            s. {article.page}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

// Card item in grid view
interface TableOfContentsCardProps {
  article: Article;
}

function TableOfContentsCard({ article }: TableOfContentsCardProps) {
  return (
    <Link
      href={`/yazilar/${article.slug}`}
      className="group block p-5 bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-800 hover:border-yellow-500/50 transition-all"
    >
      {/* Category Badge */}
      <span className="inline-block text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full mb-3">
        {article.category}
      </span>

      {/* Title */}
      <h4 className="text-white font-semibold group-hover:text-yellow-500 transition-colors line-clamp-2 mb-3">
        {article.title}
      </h4>

      {/* Author & Read Time */}
      <div className="flex items-center gap-2">
        {article.author?.avatar && (
          <div className="relative w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <span className="text-sm text-neutral-400">{article.author?.name}</span>
        <span className="text-neutral-600">•</span>
        <span className="text-sm text-neutral-500">{article.readTime} dk</span>
      </div>
    </Link>
  );
}

// Compact Table of Contents for sidebar
interface TableOfContentsCompactProps {
  articles: Article[];
  maxItems?: number;
  className?: string;
}

export function TableOfContentsCompact({
  articles,
  maxItems = 5,
  className,
}: TableOfContentsCompactProps) {
  const displayArticles = articles.slice(0, maxItems);

  return (
    <div className={cn('space-y-2', className)}>
      {displayArticles.map((article, index) => (
        <Link
          key={article.id}
          href={`/yazilar/${article.slug}`}
          className="group flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-lg transition-colors"
        >
          <span className="text-neutral-600 text-sm font-mono">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className="text-neutral-300 group-hover:text-yellow-500 transition-colors line-clamp-1 text-sm">
            {article.title}
          </span>
        </Link>
      ))}
      {articles.length > maxItems && (
        <p className="text-sm text-neutral-500 pl-10">
          +{articles.length - maxItems} yazı daha...
        </p>
      )}
    </div>
  );
}
