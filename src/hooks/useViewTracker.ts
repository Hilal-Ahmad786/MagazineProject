'use client'

import { useEffect, useRef } from 'react'
import { useStats } from '@/contexts/StatsContext'

export function useViewTracker(articleId: string) {
  const { trackView, trackReadTime } = useStats()
  const hasTrackedView = useRef(false)
  const startTime = useRef<number>(Date.now())

  // Track initial view
  useEffect(() => {
    if (!hasTrackedView.current) {
      trackView(articleId)
      hasTrackedView.current = true
      startTime.current = Date.now()
    }
  }, [articleId, trackView])

  // Track read time on unmount
  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        trackReadTime(articleId, timeSpent)
      }
    }
  }, [articleId, trackReadTime])
}
