// src/hooks/useReadingTracker.ts
// Custom hook for tracking article reading behavior

'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { throttle } from '@/lib/utils'
import { ANALYTICS_CONFIG } from '@/lib/constants'

interface UseReadingTrackerOptions {
  /** Minimum time (seconds) before tracking read time */
  minReadTime?: number
  /** Throttle interval for scroll tracking (ms) */
  scrollThrottleMs?: number
  /** Whether to track this page */
  enabled?: boolean
}

/**
 * Custom hook to track reading behavior for an article
 * 
 * Tracks:
 * - Page views
 * - Time spent reading
 * - Scroll depth (how far user scrolled)
 * 
 * Usage:
 * ```tsx
 * function ArticlePage({ article }) {
 *   useReadingTracker(article.id)
 *   return <article>...</article>
 * }
 * ```
 */
export function useReadingTracker(
  articleId: string,
  options: UseReadingTrackerOptions = {}
) {
  const {
    minReadTime = ANALYTICS_CONFIG.minReadTime,
    scrollThrottleMs = 200,
    enabled = true,
  } = options

  const { trackView, trackReadTime, trackScrollDepth } = useAnalytics()
  
  // Track start time
  const startTimeRef = useRef<number>(Date.now())
  
  // Track max scroll depth
  const maxScrollDepthRef = useRef<number>(0)
  
  // Track if view has been counted
  const viewTrackedRef = useRef<boolean>(false)

  // Calculate scroll depth percentage
  const calculateScrollDepth = useCallback((): number => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY
    
    // Calculate how far user has scrolled
    const scrollableHeight = documentHeight - windowHeight
    if (scrollableHeight <= 0) return 100
    
    const scrollPercent = Math.round((scrollTop / scrollableHeight) * 100)
    return Math.min(100, Math.max(0, scrollPercent))
  }, [])

  // Handle scroll event
  const handleScroll = useCallback(() => {
    const currentDepth = calculateScrollDepth()
    
    // Only update if we've scrolled further than before
    if (currentDepth > maxScrollDepthRef.current) {
      maxScrollDepthRef.current = currentDepth
      trackScrollDepth(articleId, currentDepth)
    }
  }, [articleId, calculateScrollDepth, trackScrollDepth])

  // Track view on mount
  useEffect(() => {
    if (!enabled || viewTrackedRef.current) return
    
    trackView(articleId)
    viewTrackedRef.current = true
    startTimeRef.current = Date.now()
  }, [articleId, enabled, trackView])

  // Track scroll depth
  useEffect(() => {
    if (!enabled) return

    const throttledScroll = throttle(handleScroll, scrollThrottleMs)
    
    // Initial calculation
    handleScroll()
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [enabled, handleScroll, scrollThrottleMs])

  // Track read time on unmount
  useEffect(() => {
    if (!enabled) return

    return () => {
      const endTime = Date.now()
      const timeSpent = Math.floor((endTime - startTimeRef.current) / 1000)
      
      // Only track if user spent minimum time on page
      if (timeSpent >= minReadTime) {
        trackReadTime(articleId, timeSpent)
      }
    }
  }, [articleId, enabled, minReadTime, trackReadTime])

  // Handle page visibility change (when user switches tabs)
  useEffect(() => {
    if (!enabled) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, track current read time
        const currentTime = Date.now()
        const timeSpent = Math.floor((currentTime - startTimeRef.current) / 1000)
        
        if (timeSpent >= minReadTime) {
          trackReadTime(articleId, timeSpent)
        }
        
        // Reset start time for when user returns
        startTimeRef.current = Date.now()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [articleId, enabled, minReadTime, trackReadTime])

  // Return current stats for optional display
  return {
    scrollDepth: maxScrollDepthRef.current,
    getTimeSpent: () => Math.floor((Date.now() - startTimeRef.current) / 1000),
  }
}

export default useReadingTracker
