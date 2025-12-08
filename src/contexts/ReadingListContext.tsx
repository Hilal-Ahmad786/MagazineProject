'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface ReadingListItem {
  id: string
  type: 'article' | 'issue'
  title: string
  slug?: string
  excerpt?: string
  image?: string
  author?: string
  addedAt: string
}

interface ReadingListContextType {
  items: ReadingListItem[]
  addToList: (item: Omit<ReadingListItem, 'addedAt'>) => void
  removeFromList: (id: string) => void
  isInList: (id: string) => boolean
  clearList: () => void
  itemCount: number
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(undefined)

const STORAGE_KEY = 'mazhar_reading_list'

export function ReadingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ReadingListItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse reading list:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToList = useCallback((item: Omit<ReadingListItem, 'addedAt'>) => {
    setItems(prev => {
      // Don't add if already exists
      if (prev.some(i => i.id === item.id)) return prev
      
      return [{
        ...item,
        addedAt: new Date().toISOString()
      }, ...prev]
    })
  }, [])

  const removeFromList = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const isInList = useCallback((id: string) => {
    return items.some(item => item.id === id)
  }, [items])

  const clearList = useCallback(() => {
    setItems([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <ReadingListContext.Provider value={{ 
      items, 
      addToList, 
      removeFromList, 
      isInList, 
      clearList,
      itemCount: items.length 
    }}>
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
