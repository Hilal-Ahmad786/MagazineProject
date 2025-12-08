'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage, Locale } from '@/contexts/LanguageContext'

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'dropdown'
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find(l => l.code === locale) || languages[0]

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
        className="p-2 text-current hover:text-yellow-400 transition-colors font-bold"
        aria-label="Dil değiştir"
      >
        {locale.toUpperCase()}
      </button>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <span>{currentLang.flag}</span>
          <span className="text-sm font-bold">{currentLang.code.toUpperCase()}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 shadow-lg z-50">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                  lang.code === locale ? 'text-yellow-400' : ''
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-sm">{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default: Button group
  return (
    <div className="flex items-center bg-gray-800">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors ${
            lang.code === locale
              ? 'bg-yellow-400 text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}
