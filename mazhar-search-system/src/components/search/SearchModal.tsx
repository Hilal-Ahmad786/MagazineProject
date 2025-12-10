// src/components/search/SearchModal.tsx
// Full-screen search modal with keyboard navigation

'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSearch } from '@/contexts/SearchContext'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { RecentSearches } from './RecentSearches'

interface SearchModalProps {
  className?: string
}

export function SearchModal({ className }: SearchModalProps) {
  const router = useRouter()
  const {
    isOpen,
    query,
    results,
    isLoading,
    recentSearches,
    closeSearch,
    setQuery,
    search,
    clearRecentSearches,
  } = useSearch()

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const modalRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1)
  }, [results])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      const totalResults = results.length

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < totalResults - 1 ? prev + 1 : 0
          )
          break

        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : totalResults - 1
          )
          break

        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(results[selectedIndex].href)
            closeSearch()
          } else if (query.trim()) {
            search(query)
          }
          break

        case 'Escape':
          e.preventDefault()
          closeSearch()
          break
      }
    },
    [isOpen, results, selectedIndex, query, router, closeSearch, search]
  )

  // Add keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      )
      selectedElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSearch()
    }
  }

  // Handle recent search select
  const handleRecentSelect = (searchQuery: string) => {
    setQuery(searchQuery)
    search(searchQuery)
  }

  // Handle result click
  const handleResultClick = () => {
    closeSearch()
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]',
        'bg-black/80 backdrop-blur-sm',
        className
      )}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Arama"
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          'w-full max-w-2xl mx-4 bg-zinc-900 rounded-2xl shadow-2xl',
          'border border-zinc-800 overflow-hidden',
          'animate-in fade-in zoom-in-95 duration-200'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-zinc-800">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={() => search(query)}
            onClear={closeSearch}
            placeholder="Yazı, yazar veya sayı ara..."
            autoFocus
            size="lg"
            variant="filled"
          />
        </div>

        {/* Content */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto overscroll-contain"
        >
          {query ? (
            // Search Results
            <SearchResults
              results={results}
              isLoading={isLoading}
              query={query}
              selectedIndex={selectedIndex}
              onResultClick={handleResultClick}
              className="p-4"
            />
          ) : (
            // Recent Searches (when no query)
            <RecentSearches
              searches={recentSearches}
              onSelect={handleRecentSelect}
              onClear={clearRecentSearches}
            />
          )}

          {/* Empty State - No query and no recent searches */}
          {!query && recentSearches.length === 0 && (
            <div className="py-12 text-center">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-zinc-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-zinc-500">Aramak için yazmaya başlayın</p>
            </div>
          )}
        </div>

        {/* Footer with Keyboard Hints */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-center gap-6 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
                ↵
              </kbd>
              Seç
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
                ↓
              </kbd>
              Gezin
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
                ESC
              </kbd>
              Kapat
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
