// src/components/search/SearchHighlight.tsx
// Highlight search terms in text

'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface SearchHighlightProps {
  text: string
  query: string
  className?: string
  highlightClassName?: string
}

export function SearchHighlight({
  text,
  query,
  className,
  highlightClassName = 'bg-primary/30 text-primary',
}: SearchHighlightProps) {
  const parts = useMemo(() => {
    if (!query.trim()) {
      return [{ text, highlight: false }]
    }

    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part) => ({
      text: part,
      highlight: part.toLowerCase() === query.toLowerCase(),
    }))
  }, [text, query])

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.highlight ? (
          <mark
            key={index}
            className={cn('bg-transparent font-medium', highlightClassName)}
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </span>
  )
}

// Helper to escape regex special characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default SearchHighlight
