'use client'

import { useTheme } from '@/contexts/ThemeContext'

interface ThemeToggleProps {
  variant?: 'default' | 'icon' | 'switch'
}

export function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme()

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 text-current hover:text-yellow-400 transition-colors"
        aria-label={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
        title={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    )
  }

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          isDark ? 'bg-gray-700' : 'bg-yellow-400'
        }`}
        aria-label={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
      >
        <span 
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
            isDark ? 'left-0.5' : 'left-7'
          }`}
        >
          {isDark ? (
            <svg className="w-4 h-4 m-1 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 m-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </span>
      </button>
    )
  }

  // Default variant
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-200 text-current hover:bg-yellow-400 hover:text-black transition-colors"
    >
      {isDark ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Açık Mod
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          Koyu Mod
        </>
      )}
    </button>
  )
}
