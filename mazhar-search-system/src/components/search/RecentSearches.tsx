// src/components/search/RecentSearches.tsx
// Recent searches display with click to search

'use client'

import { cn } from '@/lib/utils'

interface RecentSearchesProps {
  searches: string[]
  onSelect: (query: string) => void
  onClear: () => void
  className?: string
}

export function RecentSearches({
  searches,
  onSelect,
  onClear,
  className,
}: RecentSearchesProps) {
  if (searches.length === 0) return null

  return (
    <div className={cn('py-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-sm font-medium text-zinc-400">Son Aramalar</h3>
        </div>
        <button
          onClick={onClear}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Temizle
        </button>
      </div>

      {/* Search Items */}
      <div className="space-y-1">
        {searches.map((query, index) => (
          <button
            key={`${query}-${index}`}
            onClick={() => onSelect(query)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 text-left',
              'text-zinc-300 hover:bg-zinc-800/50 transition-colors rounded-lg'
            )}
          >
            <svg
              className="w-4 h-4 text-zinc-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="truncate">{query}</span>
            <svg
              className="w-4 h-4 text-zinc-700 ml-auto flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches
