// src/hooks/useLocalStorage.ts
// Custom hook for localStorage with SSR support

'use client'

import { useState, useEffect, useCallback } from 'react'
import { safeJsonParse } from '@/lib/utils'

/**
 * Custom hook for managing localStorage state
 * Handles SSR and provides type-safe access
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage after mount
  useEffect(() => {
    setMounted(true)
    try {
      const item = localStorage.getItem(key)
      if (item !== null) {
        setStoredValue(safeJsonParse<T>(item, initialValue))
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        
        setStoredValue(valueToStore)
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Return initial value on server, actual value on client
  return [mounted ? storedValue : initialValue, setValue, removeValue]
}

export default useLocalStorage
