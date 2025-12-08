'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Fuse from 'fuse.js'
import { useSearch } from '@/contexts/SearchContext'
import { SearchResults } from './SearchResults'

interface SearchableItem {
  type: 'article' | 'author' | 'issue'
  id: string
  title: string
  subtitle?: string
  slug?: string
  excerpt?: string
  content?: string
  theme?: string
}

interface SearchModalProps {
  articles: SearchableItem[]
  authors: SearchableItem[]
  issues: SearchableItem[]
}

export function SearchModal({ articles, authors, issues }: SearchModalProps) {
  const { isOpen, closeSearch } = useSearch()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchableItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Combine all searchable items
  const allItems = useMemo(() => [
    ...articles.map(a => ({ ...a, type: 'article' as const })),
    ...authors.map(a => ({ ...a, type: 'author' as const })),
    ...issues.map(i => ({ ...i, type: 'issue' as const })),
  ], [articles, authors, issues])

  // Initialize Fuse.js
  const fuse = useMemo(() => new Fuse(allItems, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'subtitle', weight: 0.2 },
      { name: 'excerpt', weight: 0.2 },
      { name: 'content', weight: 0.1 },
      { name: 'theme', weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  }), [allItems])

  // Search function
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)

    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    const searchResults = fuse.search(searchQuery)
    setResults(searchResults.map(r => r.item).slice(0, 10))
  }, [fuse])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }

      // Open with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          closeSearch()
        } else {
          // We can't open from here since we don't have openSearch
          // This is handled in the provider
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeSearch])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeSearch}
      />

      {/* Modal */}
      <div className="relative flex items-start justify-center pt-[10vh] px-4">
        <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-800">
            {/* Search icon */}
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Yazı, yazar veya sayı ara..."
              className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-600 focus:outline-none"
            />

            {/* Keyboard shortcut hint */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-600">
              <kbd className="px-2 py-1 bg-gray-800 rounded">ESC</kbd>
              <span>kapat</span>
            </div>

            {/* Close button */}
            <button
              onClick={closeSearch}
              className="p-2 hover:bg-gray-800 transition-colors"
              aria-label="Aramayı kapat"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Results */}
          <SearchResults
            results={results}
            query={query}
            onClose={closeSearch}
          />

          {/* Footer - Quick links when no query */}
          {query.length === 0 && (
            <div className="p-4 border-t border-gray-800">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Hızlı Erişim</p>
              <div className="flex flex-wrap gap-2">
                {['Yazılar', 'Yazarlar', 'Sayılar', 'Hakkımızda'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item.toLowerCase())}
                    className="px-3 py-1.5 bg-gray-800 text-gray-400 text-sm hover:bg-yellow-400 hover:text-black transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
