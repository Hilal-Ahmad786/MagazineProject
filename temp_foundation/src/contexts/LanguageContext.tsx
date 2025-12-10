// src/contexts/LanguageContext.tsx
// Language context for internationalization (TR/EN)

'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS } from '@/lib/constants'
import {
  translations,
  getTranslation,
  type Locale,
  type TranslationKey,
} from '@/lib/i18n/translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  defaultLocale?: Locale
}

export function LanguageProvider({
  children,
  defaultLocale = 'tr',
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  // Detect browser language
  const detectBrowserLanguage = useCallback((): Locale => {
    if (typeof window === 'undefined') return defaultLocale
    
    const browserLang = navigator.language.split('-')[0].toLowerCase()
    
    // Check if browser language is supported
    if (browserLang === 'en') return 'en'
    if (browserLang === 'tr') return 'tr'
    
    return defaultLocale
  }, [defaultLocale])

  // Initialize locale from storage or browser
  useEffect(() => {
    setMounted(true)
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.locale) as Locale | null
      
      if (stored && (stored === 'tr' || stored === 'en')) {
        setLocaleState(stored)
      } else {
        // Try to detect from browser
        const detected = detectBrowserLanguage()
        setLocaleState(detected)
      }
    } catch (e) {
      // localStorage not available, use browser detection
      const detected = detectBrowserLanguage()
      setLocaleState(detected)
    }
  }, [detectBrowserLanguage])

  // Update document lang attribute when locale changes
  useEffect(() => {
    if (!mounted) return
    
    document.documentElement.lang = locale
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.locale, locale)
    } catch (e) {
      // localStorage not available
    }
  }, [locale, mounted])

  // Set locale
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
  }, [])

  // Translate function
  const t = useCallback(
    (key: TranslationKey): string => {
      return getTranslation(locale, key)
    },
    [locale]
  )

  // Check if current locale is RTL (for future Arabic support)
  const isRTL = false // Turkish and English are LTR

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          locale: defaultLocale,
          setLocale: () => {},
          t: (key) => getTranslation(defaultLocale, key),
          isRTL: false,
        }}
      >
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Alias for convenience
export const useTranslation = useLanguage

export { LanguageContext }
