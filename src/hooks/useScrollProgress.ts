// src/hooks/useScrollProgress.ts
// Custom hook for tracking scroll progress

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { throttle } from '@/lib/utils'

interface ScrollProgress {
  /** Scroll progress as percentage (0-100) */
  progress: number
  /** Current scroll position in pixels */
  scrollY: number
  /** Total scrollable height */
  scrollHeight: number
  /** Whether user is scrolling down */
  isScrollingDown: boolean
  /** Whether page is at top */
  isAtTop: boolean
  /** Whether page is at bottom */
  isAtBottom: boolean
}

/**
 * Custom hook to track scroll progress
 * Useful for reading progress bars and scroll-based animations
 */
export function useScrollProgress(throttleMs: number = 100): ScrollProgress {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const lastScrollY = useRef(0)

  const calculateProgress = useCallback(() => {
    const winScroll = window.scrollY
    const height = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0
    
    setProgress(Math.min(100, Math.max(0, scrolled)))
    setScrollY(winScroll)
    setScrollHeight(height)
    setIsScrollingDown(winScroll > lastScrollY.current)
    lastScrollY.current = winScroll
  }, [])

  useEffect(() => {
    // Initial calculation
    calculateProgress()

    // Throttled scroll handler
    const throttledHandler = throttle(calculateProgress, throttleMs)

    window.addEventListener('scroll', throttledHandler, { passive: true })
    window.addEventListener('resize', throttledHandler, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandler)
      window.removeEventListener('resize', throttledHandler)
    }
  }, [calculateProgress, throttleMs])

  return {
    progress,
    scrollY,
    scrollHeight,
    isScrollingDown,
    isAtTop: scrollY < 10,
    isAtBottom: progress >= 99,
  }
}

/**
 * Hook specifically for reading progress bar
 * Returns progress as a percentage
 */
export function useReadingProgress(): number {
  const { progress } = useScrollProgress(50)
  return progress
}

/**
 * Hook to detect when user has scrolled past a threshold
 */
export function useScrollPast(threshold: number = 100): boolean {
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsPast(window.scrollY > threshold)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isPast
}

/**
 * Hook to scroll to top of page
 */
export function useScrollToTop() {
  const scrollToTop = useCallback((smooth: boolean = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'instant',
    })
  }, [])

  return scrollToTop
}

/**
 * Hook to scroll to an element
 */
export function useScrollToElement() {
  const scrollTo = useCallback((
    element: HTMLElement | string,
    offset: number = 0,
    smooth: boolean = true
  ) => {
    const el = typeof element === 'string' 
      ? document.querySelector(element) 
      : element
    
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top,
        behavior: smooth ? 'smooth' : 'instant',
      })
    }
  }, [])

  return scrollTo
}

export default useScrollProgress
