// src/contexts/ReadingListContext.tsx
// Reading list context for saving articles

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS, MAX_READING_LIST_ITEMS } from '@/lib/constants'
import { generateId, safeJsonParse } from '@/lib/utils'
import type { ReadingListItem, Article } from '@/types'

interface ReadingListContextValue {
  items: ReadingListItem[]
  addItem: (article: Article) => void
  removeItem: (articleId: string) => void
  isInList: (articleId: string) => boolean
  clearList: () => void
  count: number
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

const ReadingListContext = createContext<ReadingListContextValue | undefined>(
  undefined
)

interface ReadingListProviderProps {
  children: ReactNode
}

export function ReadingListProvider({ children }: ReadingListProviderProps) {
  const [items, setItems] = useState<ReadingListItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load reading list from localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.readingList)
      if (stored) {
        setItems(safeJsonParse<ReadingListItem[]>(stored, []))
      }
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Save to localStorage whenever items change
  const saveToStorage = useCallback((newItems: ReadingListItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.readingList, JSON.stringify(newItems))
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Add article to reading list
  const addItem = useCallback(
    (article: Article) => {
      setItems((prev) => {
        // Check if already in list
        if (prev.some((item) => item.articleId === article.id)) {
          return prev
        }

        // Create new item
        const newItem: ReadingListItem = {
          id: generateId(),
          articleId: article.id,
          title: article.title,
          author: article.author.name,
          image: article.image,
          slug: article.slug,
          addedAt: new Date().toISOString(),
        }

        // Add to beginning, limit total items
        const updated = [newItem, ...prev].slice(0, MAX_READING_LIST_ITEMS)
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Remove article from reading list
  const removeItem = useCallback(
    (articleId: string) => {
      setItems((prev) => {
        const updated = prev.filter((item) => item.articleId !== articleId)
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Check if article is in reading list
  const isInList = useCallback(
    (articleId: string) => {
      return items.some((item) => item.articleId === articleId)
    },
    [items]
  )

  // Clear entire reading list
  const clearList = useCallback(() => {
    setItems([])
    try {
      localStorage.removeItem(STORAGE_KEYS.readingList)
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Drawer controls
  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
    document.body.style.overflow = ''
  }, [])

  const toggleDrawer = useCallback(() => {
    if (isDrawerOpen) {
      closeDrawer()
    } else {
      openDrawer()
    }
  }, [isDrawerOpen, openDrawer, closeDrawer])

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, closeDrawer])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ReadingListContext.Provider
        value={{
          items: [],
          addItem: () => {},
          removeItem: () => {},
          isInList: () => false,
          clearList: () => {},
          count: 0,
          isDrawerOpen: false,
          openDrawer: () => {},
          closeDrawer: () => {},
          toggleDrawer: () => {},
        }}
      >
        {children}
      </ReadingListContext.Provider>
    )
  }

  return (
    <ReadingListContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInList,
        clearList,
        count: items.length,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </ReadingListContext.Provider>
  )
}

export function useReadingList() {
  const context = useContext(ReadingListContext)
  if (context === undefined) {
    throw new Error('useReadingList must be used within a ReadingListProvider')
  }
  return context
}

export { ReadingListContext }
