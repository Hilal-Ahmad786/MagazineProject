// src/components/reading-progress/ReadingProgressCircle.tsx
// Circular reading progress indicator

'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ReadingProgressCircleProps {
  /** Target element selector to track */
  target?: string
  /** Size of the circle */
  size?: 'sm' | 'md' | 'lg'
  /** Show percentage text inside */
  showPercentage?: boolean
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Only show after scrolling past this amount */
  showAfterScroll?: number
  /** Click to scroll to top */
  scrollToTop?: boolean
  /** Custom z-index */
  zIndex?: number
  className?: string
}

export function ReadingProgressCircle({
  target = 'article',
  size = 'md',
  showPercentage = true,
  position = 'bottom-right',
  showAfterScroll = 100,
  scrollToTop = true,
  zIndex = 40,
  className,
}: ReadingProgressCircleProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const sizeConfig = {
    sm: { size: 40, stroke: 3, fontSize: 'text-xs' },
    md: { size: 52, stroke: 4, fontSize: 'text-sm' },
    lg: { size: 64, stroke: 5, fontSize: 'text-base' },
  }

  const config = sizeConfig[size]
  const radius = (config.size - config.stroke) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  }

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
      setIsVisible(scrollY > showAfterScroll)
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

  const handleClick = () => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        'fixed transition-all duration-300',
        positionClasses[position],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
      style={{ zIndex }}
    >
      <button
        onClick={handleClick}
        disabled={!scrollToTop}
        className={cn(
          'relative flex items-center justify-center rounded-full',
          'bg-zinc-900/90 backdrop-blur-sm border border-zinc-800',
          'shadow-lg transition-transform',
          scrollToTop && 'hover:scale-110 cursor-pointer',
          !scrollToTop && 'cursor-default'
        )}
        style={{ width: config.size, height: config.size }}
        aria-label={scrollToTop ? `${Math.round(progress)}% okundu - Başa dön` : `${Math.round(progress)}% okundu`}
      >
        {/* SVG Circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={config.size}
          height={config.size}
        >
          {/* Background circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-zinc-800"
          />
          {/* Progress circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            className="text-primary transition-all duration-150"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>

        {/* Content */}
        {showPercentage ? (
          <span className={cn('font-bold text-white', config.fontSize)}>
            {Math.round(progress)}
          </span>
        ) : (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default ReadingProgressCircle
