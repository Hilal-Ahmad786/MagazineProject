// src/components/theme/ThemeToggle.tsx
// Theme toggle button with multiple variants

'use client'

import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import type { Theme } from '@/types'

interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'switch' | 'dropdown'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

  const sizeClasses = {
    sm: {
      button: 'h-8 px-3 text-xs gap-1.5',
      icon: 'w-8 h-8',
      iconSize: 'w-4 h-4',
    },
    md: {
      button: 'h-10 px-4 text-sm gap-2',
      icon: 'w-10 h-10',
      iconSize: 'w-5 h-5',
    },
    lg: {
      button: 'h-12 px-5 text-base gap-2',
      icon: 'w-12 h-12',
      iconSize: 'w-6 h-6',
    },
  }

  // Sun icon
  const SunIcon = () => (
    <svg
      className={sizeClasses[size].iconSize}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )

  // Moon icon
  const MoonIcon = () => (
    <svg
      className={sizeClasses[size].iconSize}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )

  // System icon
  const SystemIcon = () => (
    <svg
      className={sizeClasses[size].iconSize}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )

  const CurrentIcon = () => {
    if (theme === 'system') return <SystemIcon />
    return resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />
  }

  const labels: Record<Theme, string> = {
    light: 'Açık',
    dark: 'Koyu',
    system: 'Sistem',
  }

  // Icon only variant - simple toggle
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'flex items-center justify-center rounded-full transition-colors',
          'text-zinc-400 hover:text-white hover:bg-zinc-800',
          sizeClasses[size].icon,
          className
        )}
        aria-label={`Tema: ${labels[theme]}`}
        title={`Tema: ${labels[theme]}`}
      >
        <CurrentIcon />
      </button>
    )
  }

  // Button variant
  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all',
          'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
          sizeClasses[size].button,
          className
        )}
        aria-label={`Tema: ${labels[theme]}`}
      >
        <CurrentIcon />
        {showLabel && <span>{labels[theme]}</span>}
      </button>
    )
  }

  // Switch variant - 3-way toggle
  if (variant === 'switch') {
    const themes: Theme[] = ['light', 'system', 'dark']
    
    return (
      <div
        className={cn(
          'inline-flex items-center p-1 rounded-full bg-zinc-800 border border-zinc-700',
          className
        )}
        role="radiogroup"
        aria-label="Tema seçimi"
      >
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={cn(
              'flex items-center justify-center rounded-full transition-all',
              sizeClasses[size].icon,
              theme === t
                ? 'bg-primary text-black'
                : 'text-zinc-400 hover:text-white'
            )}
            role="radio"
            aria-checked={theme === t}
            aria-label={labels[t]}
            title={labels[t]}
          >
            {t === 'light' && <SunIcon />}
            {t === 'system' && <SystemIcon />}
            {t === 'dark' && <MoonIcon />}
          </button>
        ))}
      </div>
    )
  }

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className={cn(
            'appearance-none bg-zinc-800 border border-zinc-700 rounded-lg',
            'text-white cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
            sizeClasses[size].button,
            'pr-10'
          )}
          aria-label="Tema seçimi"
        >
          <option value="light">☀️ Açık</option>
          <option value="dark">🌙 Koyu</option>
          <option value="system">💻 Sistem</option>
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    )
  }

  return null
}

export default ThemeToggle
