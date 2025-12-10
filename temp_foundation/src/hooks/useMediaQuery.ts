// src/hooks/useMediaQuery.ts
// Custom hook for responsive media queries

'use client'

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/lib/constants'

/**
 * Custom hook to detect media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', listener)

    // Cleanup
    return () => mediaQuery.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Hook to check if screen is mobile size
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`)
}

/**
 * Hook to check if screen is tablet size
 */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  )
}

/**
 * Hook to check if screen is desktop size
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)
}

/**
 * Hook to get current breakpoint name
 */
export function useBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const isXs = useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`)
  const isSm = useMediaQuery(
    `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`
  )
  const isMd = useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  )
  const isLg = useMediaQuery(
    `(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`
  )
  const isXl = useMediaQuery(
    `(min-width: ${BREAKPOINTS.xl}px) and (max-width: ${BREAKPOINTS['2xl'] - 1}px)`
  )

  if (isXs) return 'xs'
  if (isSm) return 'sm'
  if (isMd) return 'md'
  if (isLg) return 'lg'
  if (isXl) return 'xl'
  return '2xl'
}

/**
 * Hook to check if user prefers dark mode
 */
export function usePrefersDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

/**
 * Hook to check if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export default useMediaQuery
