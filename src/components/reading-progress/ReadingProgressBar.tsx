// src/components/reading-progress/ReadingProgressBar.tsx
// Horizontal reading progress bar

'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ReadingProgressBarProps {
  /** Target element selector to track (default: article) */
  target?: string
  /** Position of the bar */
  position?: 'top' | 'bottom'
  /** Height of the bar in pixels */
  height?: number
  /** Show percentage text */
  showPercentage?: boolean
  /** Color variant */
  variant?: 'primary' | 'gradient' | 'rainbow'
  /** Only show after scrolling past header */
  showAfterScroll?: number
  /** Custom z-index */
  zIndex?: number
  className?: string
}

export function ReadingProgressBar({
  target = 'article',
  position = 'top',
  height = 3,
  showPercentage = false,
  variant = 'primary',
  showAfterScroll = 0,
  zIndex = 50,
  className,
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(showAfterScroll === 0)

  const calculateProgress = useCallback(() => {
    const targetElement = document.querySelector(target)
    
    if (!targetElement) {
      // Fallback to document scroll
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      return Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100)
    }

    const rect = targetElement.getBoundingClientRect()
    const elementTop = rect.top + window.scrollY
    const elementHeight = rect.height
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight

    // Calculate how much of the article has been scrolled through
    const scrolledPast = scrollTop - elementTop + windowHeight
    const totalScrollable = elementHeight

    if (scrolledPast <= 0) return 0
    if (scrolledPast >= totalScrollable) return 100

    return Math.min(Math.max((scrolledPast / totalScrollable) * 100, 0), 100)
  }, [target])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Handle visibility
      if (showAfterScroll > 0) {
        setIsVisible(scrollY > showAfterScroll)
      }

      // Calculate progress
      setProgress(calculateProgress())
    }

    // Initial calculation
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [calculateProgress, showAfterScroll])

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary',
    gradient: 'bg-gradient-to-r from-primary via-yellow-300 to-primary',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
  }

  if (!isVisible && showAfterScroll > 0) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed left-0 right-0 pointer-events-none',
        position === 'top' ? 'top-0' : 'bottom-0',
        showAfterScroll > 0 && 'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{ zIndex }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Okuma ilerlemesi"
    >
      {/* Background track */}
      <div
        className="w-full bg-zinc-900/50 backdrop-blur-sm"
        style={{ height: `${height}px` }}
      >
        {/* Progress fill */}
        <div
          className={cn(
            'h-full transition-all duration-150 ease-out',
            variantStyles[variant]
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage indicator */}
      {showPercentage && progress > 0 && (
        <div
          className={cn(
            'absolute top-full mt-2 px-2 py-1 rounded text-xs font-medium',
            'bg-zinc-900 text-white border border-zinc-800 shadow-lg',
            'transition-all duration-150'
          )}
          style={{ left: `${Math.min(progress, 95)}%`, transform: 'translateX(-50%)' }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </div>
  )
}

export default ReadingProgressBar
