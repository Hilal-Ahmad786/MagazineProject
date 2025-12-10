// src/contexts/AnalyticsContext.tsx
// Analytics context for tracking reading behavior

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS, ANALYTICS_CONFIG } from '@/lib/constants'
import { formatDateISO, safeJsonParse } from '@/lib/utils'
import type { AnalyticsData, ArticleStats, VisitHistoryItem } from '@/types'

const initialAnalyticsData: AnalyticsData = {
  totalViews: 0,
  totalReadTime: 0,
  articleStats: {},
  visitHistory: [],
}

interface AnalyticsContextValue {
  data: AnalyticsData
  trackView: (articleId: string) => void
  trackReadTime: (articleId: string, seconds: number) => void
  trackScrollDepth: (articleId: string, depth: number) => void
  getArticleStats: (articleId: string) => ArticleStats | null
  getMostViewedArticles: (limit?: number) => ArticleStats[]
  getTotalReadTime: () => number
  getAverageReadTime: () => number
  clearAnalytics: () => void
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(
  undefined
)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [data, setData] = useState<AnalyticsData>(initialAnalyticsData)
  const [mounted, setMounted] = useState(false)

  // Load analytics from localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.analytics)
      if (stored) {
        const parsed = safeJsonParse<AnalyticsData>(stored, initialAnalyticsData)
        // Clean up old history entries
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - ANALYTICS_CONFIG.maxHistoryDays)
        const cutoffStr = formatDateISO(cutoffDate)
        
        parsed.visitHistory = parsed.visitHistory.filter(
          (item) => item.date >= cutoffStr
        )
        
        setData(parsed)
      }
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Save to localStorage
  const saveToStorage = useCallback((newData: AnalyticsData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.analytics, JSON.stringify(newData))
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Update visit history
  const updateVisitHistory = useCallback(
    (history: VisitHistoryItem[]): VisitHistoryItem[] => {
      const today = formatDateISO(new Date())
      const existingIndex = history.findIndex((item) => item.date === today)

      if (existingIndex >= 0) {
        const updated = [...history]
        updated[existingIndex] = {
          ...updated[existingIndex],
          views: updated[existingIndex].views + 1,
        }
        return updated
      }

      return [...history, { date: today, views: 1 }]
    },
    []
  )

  // Track a page view
  const trackView = useCallback(
    (articleId: string) => {
      setData((prev) => {
        const existingStats = prev.articleStats[articleId]
        const now = new Date().toISOString()

        const newStats: ArticleStats = existingStats
          ? {
              ...existingStats,
              views: existingStats.views + 1,
              lastViewed: now,
            }
          : {
              articleId,
              views: 1,
              readTime: 0,
              scrollDepth: 0,
              lastViewed: now,
            }

        const updated: AnalyticsData = {
          ...prev,
          totalViews: prev.totalViews + 1,
          articleStats: {
            ...prev.articleStats,
            [articleId]: newStats,
          },
          visitHistory: updateVisitHistory(prev.visitHistory),
        }

        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage, updateVisitHistory]
  )

  // Track read time
  const trackReadTime = useCallback(
    (articleId: string, seconds: number) => {
      if (seconds < ANALYTICS_CONFIG.minReadTime) return

      setData((prev) => {
        const existingStats = prev.articleStats[articleId]
        if (!existingStats) return prev

        const newStats: ArticleStats = {
          ...existingStats,
          readTime: existingStats.readTime + seconds,
        }

        const updated: AnalyticsData = {
          ...prev,
          totalReadTime: prev.totalReadTime + seconds,
          articleStats: {
            ...prev.articleStats,
            [articleId]: newStats,
          },
        }

        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Track scroll depth
  const trackScrollDepth = useCallback(
    (articleId: string, depth: number) => {
      setData((prev) => {
        const existingStats = prev.articleStats[articleId]
        if (!existingStats) return prev

        // Only update if new depth is greater
        if (depth <= existingStats.scrollDepth) return prev

        const newStats: ArticleStats = {
          ...existingStats,
          scrollDepth: Math.min(100, depth),
        }

        const updated: AnalyticsData = {
          ...prev,
          articleStats: {
            ...prev.articleStats,
            [articleId]: newStats,
          },
        }

        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // Get stats for a specific article
  const getArticleStats = useCallback(
    (articleId: string): ArticleStats | null => {
      return data.articleStats[articleId] || null
    },
    [data.articleStats]
  )

  // Get most viewed articles
  const getMostViewedArticles = useCallback(
    (limit: number = 5): ArticleStats[] => {
      return Object.values(data.articleStats)
        .sort((a, b) => b.views - a.views)
        .slice(0, limit)
    },
    [data.articleStats]
  )

  // Get total read time
  const getTotalReadTime = useCallback((): number => {
    return data.totalReadTime
  }, [data.totalReadTime])

  // Get average read time per article
  const getAverageReadTime = useCallback((): number => {
    const articlesWithReadTime = Object.values(data.articleStats).filter(
      (stats) => stats.readTime > 0
    )
    if (articlesWithReadTime.length === 0) return 0
    
    const totalTime = articlesWithReadTime.reduce(
      (sum, stats) => sum + stats.readTime,
      0
    )
    return Math.round(totalTime / articlesWithReadTime.length)
  }, [data.articleStats])

  // Clear all analytics data
  const clearAnalytics = useCallback(() => {
    setData(initialAnalyticsData)
    try {
      localStorage.removeItem(STORAGE_KEYS.analytics)
    } catch (e) {
      // localStorage not available
    }
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <AnalyticsContext.Provider
        value={{
          data: initialAnalyticsData,
          trackView: () => {},
          trackReadTime: () => {},
          trackScrollDepth: () => {},
          getArticleStats: () => null,
          getMostViewedArticles: () => [],
          getTotalReadTime: () => 0,
          getAverageReadTime: () => 0,
          clearAnalytics: () => {},
        }}
      >
        {children}
      </AnalyticsContext.Provider>
    )
  }

  return (
    <AnalyticsContext.Provider
      value={{
        data,
        trackView,
        trackReadTime,
        trackScrollDepth,
        getArticleStats,
        getMostViewedArticles,
        getTotalReadTime,
        getAverageReadTime,
        clearAnalytics,
      }}
    >
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

export { AnalyticsContext }
