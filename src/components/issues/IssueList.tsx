'use client';

import { useState, useMemo } from 'react';
import { IssueCard } from './IssueCard';
import { Grid, List, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Issue } from '@/types';

interface IssueListProps {
  issues: Issue[];
  showFeatured?: boolean;
  showYearFilter?: boolean;
  className?: string;
}

export function IssueList({
  issues,
  showFeatured = true,
  showYearFilter = true,
  className,
}: IssueListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Get unique years from issues
  const years = useMemo(() => {
    const yearSet = new Set(issues.map((issue) => new Date(issue.date).getFullYear()));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [issues]);

  // Find featured issue
  const featuredIssue = useMemo(() => {
    return issues.find((issue) => issue.featured);
  }, [issues]);

  // Filter issues by year and exclude featured
  const filteredIssues = useMemo(() => {
    let filtered = issues;

    // Exclude featured from regular list if showing featured separately
    if (showFeatured && featuredIssue) {
      filtered = filtered.filter((issue) => issue.id !== featuredIssue.id);
    }

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(
        (issue) => new Date(issue.date).getFullYear().toString() === selectedYear
      );
    }

    // Sort by date descending
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [issues, selectedYear, showFeatured, featuredIssue]);

  return (
    <div className={cn('space-y-8', className)}>
      {/* Featured Issue */}
      {showFeatured && featuredIssue && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Güncel Sayı</h2>
          <IssueCard issue={featuredIssue} variant="large" />
        </section>
      )}

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">
          {showFeatured ? 'Geçmiş Sayılar' : 'Tüm Sayılar'}
        </h2>

        <div className="flex items-center gap-4">
          {/* Year Filter */}
          {showYearFilter && years.length > 1 && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="all">Tüm Yıllar</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1">
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
          </div>
        </div>
      </div>

      {/* Issues Grid/List */}
      {filteredIssues.length > 0 ? (
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          )}
        >
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              variant={viewMode === 'list' ? 'compact' : 'default'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-400">
            {selectedYear !== 'all'
              ? `${selectedYear} yılına ait sayı bulunamadı.`
              : 'Henüz sayı bulunmuyor.'}
          </p>
        </div>
      )}
    </div>
  );
}
