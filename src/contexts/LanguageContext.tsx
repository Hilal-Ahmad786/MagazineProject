'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { translations, Locale, TranslationKey } from '@/lib/i18n/translations'
export type { Locale }

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'mazhar_locale'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr')
  const [mounted, setMounted] = useState(false)

  // Load from localStorage or browser
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null

    if (stored && (stored === 'tr' || stored === 'en')) {
      setLocaleState(stored)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'en') {
        setLocaleState('en')
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, locale)
      document.documentElement.lang = locale
    }
  }, [locale, mounted])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
  }, [])

  const t = useCallback((key: TranslationKey): string => {
    return translations[locale][key] || key
  }, [locale])

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
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
