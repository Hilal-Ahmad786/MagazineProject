// src/hooks/index.ts
// Central export for all custom hooks

// Context hooks (re-exported from contexts for convenience)
export { useTheme } from '@/contexts/ThemeContext'
export { useSearch } from '@/contexts/SearchContext'
export { useReadingList } from '@/contexts/ReadingListContext'
export { useComments } from '@/contexts/CommentsContext'
export { useAnalytics } from '@/contexts/AnalyticsContext'
export { useLanguage, useTranslation } from '@/contexts/LanguageContext'

// Utility hooks
export { useLocalStorage, default as useLocalStorageDefault } from './useLocalStorage'
export { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  useBreakpoint,
  usePrefersDark,
  usePrefersReducedMotion,
} from './useMediaQuery'
export { 
  useScrollProgress, 
  useReadingProgress, 
  useScrollPast,
  useScrollToTop,
  useScrollToElement,
} from './useScrollProgress'
export { useReadingTracker } from './useReadingTracker'
export { usePWA, useOnlineStatus } from './usePWA'

// Additional utility hooks

/**
 * Hook to copy text to clipboard
 */
export function useCopyToClipboard() {
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      } catch {
        return false
      }
    }

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  return copyToClipboard
}

/**
 * Hook to detect clicks outside an element
 */
import { useEffect, useRef, type RefObject } from 'react'

export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])

  return ref
}

/**
 * Hook to handle keyboard shortcuts
 */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean
    enabled?: boolean
  } = {}
) {
  const { ctrl = false, shift = false, alt = false, meta = false, enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const handler = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift &&
        event.altKey === alt &&
        event.metaKey === meta
      ) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback, ctrl, shift, alt, meta, enabled])
}

/**
 * Hook to detect if component is mounted
 */
import { useState } from 'react'

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

/**
 * Hook for debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/**
 * Hook to toggle boolean state
 */
import { useCallback } from 'react'

export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)
  
  const toggle = useCallback(() => setValue(v => !v), [])
  const set = useCallback((v: boolean) => setValue(v), [])

  return [value, toggle, set]
}

/**
 * Hook for window size
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
