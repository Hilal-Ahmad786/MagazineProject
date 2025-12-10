// src/contexts/SearchContext.tsx
// Search context for global search functionality

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS, MAX_RECENT_SEARCHES, DEBOUNCE_DELAY } from '@/lib/constants'
import { debounce, safeJsonParse } from '@/lib/utils'
import type { SearchResult, Article, Author, Issue } from '@/types'

interface SearchState {
  isOpen: boolean
  query: string
  results: SearchResult[]
  isLoading: boolean
  recentSearches: string[]
}

interface SearchContextValue extends SearchState {
  openSearch: () => void
  closeSearch: () => void
  setQuery: (query: string) => void
  search: (query: string) => Promise<void>
  clearRecentSearches: () => void
  addRecentSearch: (query: string) => void
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined)

interface SearchProviderProps {
  children: ReactNode
  // Optional: pass data for searching
  articles?: Article[]
  authors?: Author[]
  issues?: Issue[]
}

export function SearchProvider({
  children,
  articles = [],
  authors = [],
  issues = [],
}: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQueryState] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.recentSearches)
      if (stored) {
        setRecentSearches(safeJsonParse<string[]>(stored, []))
      }
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearches = useCallback((searches: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.recentSearches, JSON.stringify(searches))
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Add to recent searches
  const addRecentSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return

      setRecentSearches((prev) => {
        const filtered = prev.filter(
          (s) => s.toLowerCase() !== searchQuery.toLowerCase()
        )
        const updated = [searchQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES)
        saveRecentSearches(updated)
        return updated
      })
    },
    [saveRecentSearches]
  )

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    try {
      localStorage.removeItem(STORAGE_KEYS.recentSearches)
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Search function
  const performSearch = useCallback(
    async (searchQuery: string): Promise<SearchResult[]> => {
      if (!searchQuery.trim()) return []

      const query = searchQuery.toLowerCase()
      const searchResults: SearchResult[] = []

      // Search articles
      articles.forEach((article) => {
        if (
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          searchResults.push({
            type: 'article',
            id: article.id,
            title: article.title,
            subtitle: `${article.author.name} • ${article.category}`,
            image: article.image,
            href: `/yazilar/${article.slug}`,
          })
        }
      })

      // Search authors
      authors.forEach((author) => {
        if (
          author.name.toLowerCase().includes(query) ||
          author.bio.toLowerCase().includes(query)
        ) {
          searchResults.push({
            type: 'author',
            id: author.id,
            title: author.name,
            subtitle: author.role,
            image: author.avatar,
            href: `/yazarlar/${author.slug}`,
          })
        }
      })

      // Search issues
      issues.forEach((issue) => {
        if (
          issue.title.toLowerCase().includes(query) ||
          issue.theme?.toLowerCase().includes(query) ||
          String(issue.number).includes(query)
        ) {
          searchResults.push({
            type: 'issue',
            id: issue.id,
            title: `Sayı ${issue.number}: ${issue.title}`,
            subtitle: issue.theme || issue.date,
            image: issue.coverImage,
            href: `/sayilar/${issue.id}`,
          })
        }
      })

      return searchResults
    },
    [articles, authors, issues]
  )

  // Debounced search
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      setIsLoading(true)
      try {
        const searchResults = await performSearch(searchQuery)
        setResults(searchResults)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, DEBOUNCE_DELAY),
    [performSearch]
  )

  // Search handler
  const search = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const searchResults = await performSearch(searchQuery)
        setResults(searchResults)
        addRecentSearch(searchQuery)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [performSearch, addRecentSearch]
  )

  // Set query with debounced search
  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery)
      if (newQuery.trim()) {
        debouncedSearch(newQuery)
      } else {
        setResults([])
      }
    },
    [debouncedSearch]
  )

  // Open search modal
  const openSearch = useCallback(() => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  // Close search modal
  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQueryState('')
    setResults([])
    document.body.style.overflow = ''
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          closeSearch()
        } else {
          openSearch()
        }
      }

      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, openSearch, closeSearch])

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        query,
        results,
        isLoading,
        recentSearches,
        openSearch,
        closeSearch,
        setQuery,
        search,
        clearRecentSearches,
        addRecentSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export { SearchContext }
