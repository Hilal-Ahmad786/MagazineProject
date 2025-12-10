'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  variant?: 'default' | 'icon' | 'switch'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ThemeToggle({
  variant = 'default',
  size = 'md',
  className,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  // Switch variant
  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
          isDark ? 'bg-neutral-700' : 'bg-yellow-500',
          className
        )}
        aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
      >
        <span
          className={cn(
            'inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform',
            isDark ? 'translate-x-1' : 'translate-x-7'
          )}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-neutral-700" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-600" />
          )}
        </span>
      </button>
    )
  }

  // Icon only variant
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'rounded-full transition-all duration-300',
          sizeClasses[size],
          isDark
            ? 'text-neutral-400 hover:text-yellow-500 hover:bg-neutral-800'
            : 'text-neutral-600 hover:text-yellow-600 hover:bg-neutral-200',
          className
        )}
        aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
      >
        {isDark ? (
          <Sun className={cn(iconSizes[size], 'transition-transform hover:rotate-45')} />
        ) : (
          <Moon className={cn(iconSizes[size], 'transition-transform hover:-rotate-12')} />
        )}
      </button>
    )
  }

  // Default variant with background
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'rounded-full transition-all duration-300 border',
        sizeClasses[size],
        isDark
          ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-yellow-500 hover:border-yellow-500/50'
          : 'bg-white border-neutral-300 text-neutral-600 hover:text-yellow-600 hover:border-yellow-500',
        className
      )}
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      {isDark ? (
        <Sun className={cn(iconSizes[size], 'transition-transform hover:rotate-45')} />
      ) : (
        <Moon className={cn(iconSizes[size], 'transition-transform hover:-rotate-12')} />
      )}
    </button>
  )
}

export default ThemeToggle
