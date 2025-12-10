// src/components/reading-progress/ReadingStats.tsx
// Reading statistics display (time remaining, progress)

'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ReadingStatsProps {
  /** Total reading time in minutes */
  readingTime: number
  /** Target element selector to track */
  target?: string
  /** Display variant */
  variant?: 'inline' | 'badge' | 'detailed'
  /** Show after scrolling past this amount */
  showAfterScroll?: number
  /** Position for fixed variant */
  position?: 'top-center' | 'bottom-center'
  /** Fixed positioning */
  fixed?: boolean
  className?: string
}

export function ReadingStats({
  readingTime,
  target = 'article',
  variant = 'inline',
  showAfterScroll = 0,
  position = 'top-center',
  fixed = false,
  className,
}: ReadingStatsProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(showAfterScroll === 0)

  const calculateProgress = useCallback(() => {
    const targetElement = document.querySelector(target)
    
    if (!targetElement) {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      return Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100)
    }

    const rect = targetElement.getBoundingClientRect()
    const elementTop = rect.top + window.scrollY
    const elementHeight = rect.height
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight

    const scrolledPast = scrollTop - elementTop + windowHeight
    const totalScrollable = elementHeight

    if (scrolledPast <= 0) return 0
    if (scrolledPast >= totalScrollable) return 100

    return Math.min(Math.max((scrolledPast / totalScrollable) * 100, 0), 100)
  }, [target])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      if (showAfterScroll > 0) {
        setIsVisible(scrollY > showAfterScroll)
      }

      setProgress(calculateProgress())
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [calculateProgress, showAfterScroll])

  // Calculate remaining time
  const remainingTime = Math.max(Math.ceil(readingTime * (1 - progress / 100)), 0)
  const progressPercent = Math.round(progress)

  // Position classes for fixed variant
  const positionClasses = {
    'top-center': 'top-20 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-4 text-sm text-zinc-400', className)}>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {readingTime} dk okuma
        </span>
        {progress > 0 && progress < 100 && (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {remainingTime} dk kaldı
          </span>
        )}
        {progress >= 100 && (
          <span className="flex items-center gap-1.5 text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Tamamlandı
          </span>
        )}
      </div>
    )
  }

  // Badge variant
  if (variant === 'badge') {
    const baseClasses = cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
      'bg-zinc-900/90 backdrop-blur-sm border border-zinc-800',
      'text-sm text-zinc-300',
      fixed && 'fixed z-40 transition-all duration-300',
      fixed && positionClasses[position],
      fixed && (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'),
      className
    )

    if (fixed && !isVisible && showAfterScroll > 0) {
      return null
    }

    return (
      <div className={baseClasses}>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-primary"
            style={{ opacity: 0.3 + (progress / 100) * 0.7 }}
          />
          <span className="font-medium">{progressPercent}%</span>
        </div>
        <span className="text-zinc-500">•</span>
        <span>
          {progress >= 100 ? 'Tamamlandı' : `${remainingTime} dk kaldı`}
        </span>
      </div>
    )
  }

  // Detailed variant
  const detailedClasses = cn(
    'p-4 rounded-xl bg-zinc-900/90 backdrop-blur-sm border border-zinc-800',
    fixed && 'fixed z-40 transition-all duration-300',
    fixed && positionClasses[position],
    fixed && (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'),
    className
  )

  if (fixed && !isVisible && showAfterScroll > 0) {
    return null
  }

  return (
    <div className={detailedClasses}>
      {/* Progress bar */}
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{progressPercent}%</span>
          <span className="text-zinc-500">okundu</span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {progress >= 100 ? (
            <span className="text-green-500">Tamamlandı</span>
          ) : (
            <span>{remainingTime} dk kaldı</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadingStats
