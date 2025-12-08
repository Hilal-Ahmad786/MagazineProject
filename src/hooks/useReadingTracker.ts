'use client'

import { useEffect, useRef } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'

export function useReadingTracker(articleId: string) {
  const { trackView, trackReadTime, trackScrollDepth } = useAnalytics()
  const startTime = useRef<number>(Date.now())
  const hasTrackedView = useRef<boolean>(false)

  // Track view on mount
  useEffect(() => {
    if (!hasTrackedView.current) {
      trackView(articleId)
      hasTrackedView.current = true
    }
    startTime.current = Date.now()

    // Track read time on unmount
    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        trackReadTime(articleId, timeSpent)
      }
    }
  }, [articleId, trackView, trackReadTime])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      trackScrollDepth(articleId, scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [articleId, trackScrollDepth])
}
