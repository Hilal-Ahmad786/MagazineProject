// src/components/search/SearchResultItem.tsx
// Individual search result item

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/types'

interface SearchResultItemProps {
  result: SearchResult
  isSelected?: boolean
  onClick?: () => void
}

export function SearchResultItem({
  result,
  isSelected = false,
  onClick,
}: SearchResultItemProps) {
  const typeIcons = {
    article: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    author: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    issue: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  }

  const typeLabels = {
    article: 'Yazı',
    author: 'Yazar',
    issue: 'Sayı',
  }

  return (
    <Link
      href={result.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg transition-all',
        'hover:bg-zinc-800/50',
        isSelected && 'bg-zinc-800/50 ring-1 ring-primary/50'
      )}
    >
      {/* Image/Avatar */}
      {result.image ? (
        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
          <Image
            src={result.image}
            alt={result.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">
          {typeIcons[result.type]}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate">{result.title}</h4>
        {result.subtitle && (
          <p className="text-sm text-zinc-400 truncate">{result.subtitle}</p>
        )}
      </div>

      {/* Type Badge */}
      <span className="flex-shrink-0 text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400">
        {typeLabels[result.type]}
      </span>

      {/* Arrow */}
      <svg
        className="w-5 h-5 text-zinc-600 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  )
}

export default SearchResultItem
