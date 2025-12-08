'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface ArticleStats {
  views: number
  readTime: number // seconds spent
  lastViewed: string
}

interface StatsData {
  [articleId: string]: ArticleStats
}

interface StatsContextType {
  stats: StatsData
  trackView: (articleId: string) => void
  trackReadTime: (articleId: string, seconds: number) => void
  getArticleStats: (articleId: string) => ArticleStats | null
  getTotalViews: () => number
  getMostViewed: (limit?: number) => Array<{ id: string; stats: ArticleStats }>
}

const StatsContext = createContext<StatsContextType | undefined>(undefined)

const STORAGE_KEY = 'mazhar_stats'

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<StatsData>({})

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setStats(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stats:', e)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(stats).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
    }
  }, [stats])

  const trackView = useCallback((articleId: string) => {
    setStats(prev => ({
      ...prev,
      [articleId]: {
        views: (prev[articleId]?.views || 0) + 1,
        readTime: prev[articleId]?.readTime || 0,
        lastViewed: new Date().toISOString(),
      }
    }))

    // Also send to API for server-side tracking
    fetch('/api/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId }),
    }).catch(console.error)
  }, [])

  const trackReadTime = useCallback((articleId: string, seconds: number) => {
    setStats(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        views: prev[articleId]?.views || 1,
        readTime: (prev[articleId]?.readTime || 0) + seconds,
        lastViewed: new Date().toISOString(),
      }
    }))
  }, [])

  const getArticleStats = useCallback((articleId: string) => {
    return stats[articleId] || null
  }, [stats])

  const getTotalViews = useCallback(() => {
    return Object.values(stats).reduce((sum, s) => sum + s.views, 0)
  }, [stats])

  const getMostViewed = useCallback((limit = 5) => {
    return Object.entries(stats)
      .map(([id, stats]) => ({ id, stats }))
      .sort((a, b) => b.stats.views - a.stats.views)
      .slice(0, limit)
  }, [stats])

  return (
    <StatsContext.Provider value={{
      stats,
      trackView,
      trackReadTime,
      getArticleStats,
      getTotalViews,
      getMostViewed,
    }}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}
