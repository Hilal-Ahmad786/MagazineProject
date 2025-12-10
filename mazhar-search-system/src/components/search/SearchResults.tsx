// src/components/search/SearchResults.tsx
// Search results display with grouping

'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SearchResultItem } from './SearchResultItem'
import type { SearchResult } from '@/types'

interface SearchResultsProps {
  results: SearchResult[]
  isLoading?: boolean
  query?: string
  selectedIndex?: number
  onResultClick?: () => void
  groupByType?: boolean
  maxResults?: number
  emptyMessage?: string
  className?: string
}

export function SearchResults({
  results,
  isLoading = false,
  query = '',
  selectedIndex,
  onResultClick,
  groupByType = true,
  maxResults = 20,
  emptyMessage = 'Sonuç bulunamadı',
  className,
}: SearchResultsProps) {
  // Group results by type
  const groupedResults = useMemo(() => {
    if (!groupByType) return { all: results.slice(0, maxResults) }

    const groups: Record<string, SearchResult[]> = {
      article: [],
      author: [],
      issue: [],
    }

    results.slice(0, maxResults).forEach((result) => {
      groups[result.type].push(result)
    })

    // Remove empty groups
    return Object.fromEntries(
      Object.entries(groups).filter(([_, items]) => items.length > 0)
    )
  }, [results, groupByType, maxResults])

  const groupLabels: Record<string, string> = {
    article: 'Yazılar',
    author: 'Yazarlar',
    issue: 'Sayılar',
    all: 'Sonuçlar',
  }

  const groupIcons: Record<string, JSX.Element> = {
    article: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    author: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    issue: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    all: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('py-12', className)}>
        <div className="flex flex-col items-center justify-center text-zinc-500">
          <svg
            className="w-8 h-8 animate-spin mb-3"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm">Aranıyor...</span>
        </div>
      </div>
    )
  }

  // Empty state
  if (results.length === 0 && query) {
    return (
      <div className={cn('py-12', className)}>
        <div className="flex flex-col items-center justify-center text-zinc-500">
          <svg
            className="w-12 h-12 mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-base mb-1">{emptyMessage}</p>
          <p className="text-sm text-zinc-600">
            &quot;{query}&quot; için sonuç bulunamadı
          </p>
        </div>
      </div>
    )
  }

  // Calculate flat index for keyboard navigation
  let flatIndex = 0

  return (
    <div className={cn('divide-y divide-zinc-800/50', className)}>
      {Object.entries(groupedResults).map(([type, items]) => (
        <div key={type} className="py-4 first:pt-0 last:pb-0">
          {/* Group Header */}
          <div className="flex items-center gap-2 px-4 mb-2">
            <span className="text-zinc-500">{groupIcons[type]}</span>
            <h3 className="text-sm font-medium text-zinc-400">
              {groupLabels[type]}
            </h3>
            <span className="text-xs text-zinc-600">({items.length})</span>
          </div>

          {/* Group Items */}
          <div className="space-y-1">
            {items.map((result) => {
              const currentIndex = flatIndex++
              return (
                <SearchResultItem
                  key={`${result.type}-${result.id}`}
                  result={result}
                  isSelected={selectedIndex === currentIndex}
                  onClick={onResultClick}
                />
              )
            })}
          </div>
        </div>
      ))}

      {/* Results count */}
      {results.length > 0 && (
        <div className="pt-4 px-4">
          <p className="text-xs text-zinc-600 text-center">
            {results.length} sonuç bulundu
            {results.length > maxResults && ` (ilk ${maxResults} gösteriliyor)`}
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchResults
