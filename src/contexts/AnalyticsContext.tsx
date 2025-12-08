'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface ArticleStats {
  articleId: string
  views: number
  readTime: number // seconds spent reading
  scrollDepth: number // percentage
  lastViewed: string
}

interface AnalyticsData {
  totalViews: number
  totalReadTime: number
  articleStats: Record<string, ArticleStats>
  visitHistory: Array<{ date: string; views: number }>
}

interface AnalyticsContextType {
  data: AnalyticsData
  trackView: (articleId: string) => void
  trackReadTime: (articleId: string, seconds: number) => void
  trackScrollDepth: (articleId: string, depth: number) => void
  getArticleStats: (articleId: string) => ArticleStats | null
  getMostViewedArticles: (limit?: number) => string[]
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

const STORAGE_KEY = 'mazhar_analytics'

const defaultData: AnalyticsData = {
  totalViews: 0,
  totalReadTime: 0,
  articleStats: {},
  visitHistory: [],
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AnalyticsData>(defaultData)

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setData(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse analytics:', e)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const trackView = useCallback((articleId: string) => {
    const today = new Date().toISOString().split('T')[0]
    
    setData(prev => {
      const articleStats = prev.articleStats[articleId] || {
        articleId,
        views: 0,
        readTime: 0,
        scrollDepth: 0,
        lastViewed: '',
      }

      // Update visit history
      const visitHistory = [...prev.visitHistory]
      const todayIndex = visitHistory.findIndex(v => v.date === today)
      if (todayIndex >= 0) {
        visitHistory[todayIndex].views += 1
      } else {
        visitHistory.push({ date: today, views: 1 })
      }
      // Keep last 30 days
      const recentHistory = visitHistory.slice(-30)

      return {
        ...prev,
        totalViews: prev.totalViews + 1,
        articleStats: {
          ...prev.articleStats,
          [articleId]: {
            ...articleStats,
            views: articleStats.views + 1,
            lastViewed: new Date().toISOString(),
          },
        },
        visitHistory: recentHistory,
      }
    })
  }, [])

  const trackReadTime = useCallback((articleId: string, seconds: number) => {
    setData(prev => {
      const articleStats = prev.articleStats[articleId]
      if (!articleStats) return prev

      return {
        ...prev,
        totalReadTime: prev.totalReadTime + seconds,
        articleStats: {
          ...prev.articleStats,
          [articleId]: {
            ...articleStats,
            readTime: articleStats.readTime + seconds,
          },
        },
      }
    })
  }, [])

  const trackScrollDepth = useCallback((articleId: string, depth: number) => {
    setData(prev => {
      const articleStats = prev.articleStats[articleId]
      if (!articleStats) return prev

      return {
        ...prev,
        articleStats: {
          ...prev.articleStats,
          [articleId]: {
            ...articleStats,
            scrollDepth: Math.max(articleStats.scrollDepth, depth),
          },
        },
      }
    })
  }, [])

  const getArticleStats = useCallback((articleId: string) => {
    return data.articleStats[articleId] || null
  }, [data])

  const getMostViewedArticles = useCallback((limit = 10) => {
    return Object.values(data.articleStats)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
      .map(s => s.articleId)
  }, [data])

  return (
    <AnalyticsContext.Provider value={{
      data,
      trackView,
      trackReadTime,
      trackScrollDepth,
      getArticleStats,
      getMostViewedArticles,
    }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}
