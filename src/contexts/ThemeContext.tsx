'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'mazhar_theme'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')
  const [mounted, setMounted] = useState(false)

  // Get system preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // Resolve theme based on current setting
  const resolveTheme = useCallback(
    (t: Theme): ResolvedTheme => {
      if (t === 'system') {
        return getSystemTheme()
      }
      return t
    },
    [getSystemTheme]
  )

  // Apply theme to document
  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    const root = document.documentElement
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    
    // Add the new theme class
    root.classList.add(resolved)
    
    // Set color-scheme for native elements (scrollbars, form inputs, etc.)
    root.style.colorScheme = resolved
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolved === 'dark' ? '#000000' : '#ffffff')
    }
  }, [])

  // Initialize theme from storage on mount
  useEffect(() => {
    setMounted(true)
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setThemeState(stored)
        const resolved = resolveTheme(stored)
        setResolvedTheme(resolved)
        applyTheme(resolved)
      } else {
        // Apply default theme
        const resolved = resolveTheme(defaultTheme)
        setResolvedTheme(resolved)
        applyTheme(resolved)
      }
    } catch (e) {
      // localStorage not available
      const resolved = resolveTheme(defaultTheme)
      setResolvedTheme(resolved)
      applyTheme(resolved)
    }
  }, [defaultTheme, resolveTheme, applyTheme])

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        const resolved = getSystemTheme()
        setResolvedTheme(resolved)
        applyTheme(resolved)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted, theme, getSystemTheme, applyTheme])

  // Set theme function
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      const resolved = resolveTheme(newTheme)
      setResolvedTheme(resolved)
      applyTheme(resolved)
      
      try {
        localStorage.setItem(STORAGE_KEY, newTheme)
      } catch (e) {
        // localStorage not available
      }
    },
    [resolveTheme, applyTheme]
  )

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [resolvedTheme, setTheme])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: defaultTheme,
          resolvedTheme: 'dark',
          setTheme: () => {},
          toggleTheme: () => {},
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeContext }
