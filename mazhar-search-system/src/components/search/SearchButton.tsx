// src/components/search/SearchButton.tsx
// Button to trigger search modal

'use client'

import { cn } from '@/lib/utils'
import { useSearch } from '@/contexts/SearchContext'

interface SearchButtonProps {
  variant?: 'icon' | 'button' | 'input'
  size?: 'sm' | 'md' | 'lg'
  showShortcut?: boolean
  className?: string
}

export function SearchButton({
  variant = 'button',
  size = 'md',
  showShortcut = true,
  className,
}: SearchButtonProps) {
  const { openSearch } = useSearch()

  // Icon only variant
  if (variant === 'icon') {
    const iconSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    }

    const svgSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    }

    return (
      <button
        onClick={openSearch}
        className={cn(
          'flex items-center justify-center rounded-full',
          'text-zinc-400 hover:text-white hover:bg-zinc-800',
          'transition-colors',
          iconSizes[size],
          className
        )}
        aria-label="Ara"
      >
        <svg
          className={svgSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    )
  }

  // Input-like variant (looks like a search input)
  if (variant === 'input') {
    const inputSizes = {
      sm: 'h-9 text-sm pl-9 pr-12',
      md: 'h-10 text-sm pl-10 pr-14',
      lg: 'h-12 text-base pl-11 pr-16',
    }

    const iconPositions = {
      sm: 'left-2.5',
      md: 'left-3',
      lg: 'left-3.5',
    }

    return (
      <button
        onClick={openSearch}
        className={cn(
          'relative flex items-center w-full max-w-xs',
          'bg-zinc-900 border border-zinc-800 rounded-lg',
          'text-zinc-500 hover:border-zinc-700 hover:text-zinc-400',
          'transition-all cursor-text',
          inputSizes[size],
          className
        )}
        aria-label="Ara"
      >
        {/* Search Icon */}
        <svg
          className={cn(
            'absolute w-4 h-4 pointer-events-none',
            iconPositions[size]
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Placeholder */}
        <span>Ara...</span>

        {/* Keyboard Shortcut */}
        {showShortcut && (
          <kbd className="absolute right-2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-zinc-800 rounded border border-zinc-700">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        )}
      </button>
    )
  }

  // Default button variant
  const buttonSizes = {
    sm: 'h-8 px-3 text-sm gap-2',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-5 text-base gap-3',
  }

  return (
    <button
      onClick={openSearch}
      className={cn(
        'inline-flex items-center justify-center rounded-lg',
        'bg-zinc-900 border border-zinc-800',
        'text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800',
        'transition-all',
        buttonSizes[size],
        className
      )}
      aria-label="Ara"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span>Ara</span>
      {showShortcut && (
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded border border-zinc-700 ml-1">
          <span>⌘</span>K
        </kbd>
      )}
    </button>
  )
}

export default SearchButton
