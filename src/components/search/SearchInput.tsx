// src/components/search/SearchInput.tsx
// Search input field with icon and clear button

'use client'

import { useRef, useEffect, type ChangeEvent, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  onClear?: () => void
  placeholder?: string
  autoFocus?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'filled'
  className?: string
  showShortcut?: boolean
  onFocus?: () => void
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Ara...',
  autoFocus = false,
  size = 'md',
  variant = 'default',
  className,
  showShortcut = false,
  onFocus,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault()
      onSubmit()
    }
    if (e.key === 'Escape' && onClear) {
      e.preventDefault()
      onClear()
    }
  }

  const handleClear = () => {
    onChange('')
    onClear?.()
    inputRef.current?.focus()
  }

  const sizeClasses = {
    sm: 'h-9 text-sm pl-9 pr-9',
    md: 'h-11 text-base pl-11 pr-11',
    lg: 'h-14 text-lg pl-14 pr-14',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const iconPositions = {
    sm: 'left-2.5',
    md: 'left-3.5',
    lg: 'left-4',
  }

  const clearPositions = {
    sm: 'right-2.5',
    md: 'right-3.5',
    lg: 'right-4',
  }

  const variantClasses = {
    default: 'bg-zinc-900 border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary/20',
    minimal: 'bg-transparent border-b border-zinc-800 rounded-none focus:border-primary',
    filled: 'bg-zinc-800/50 border-transparent focus:bg-zinc-800 focus:ring-2 focus:ring-primary/20',
  }

  return (
    <div className={cn('relative', className)}>
      {/* Search Icon */}
      <svg
        className={cn(
          'absolute top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none',
          iconSizes[size],
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

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-lg text-white placeholder-zinc-500 outline-none transition-all',
          sizeClasses[size],
          variantClasses[variant]
        )}
      />

      {/* Clear Button or Shortcut Hint */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 flex items-center gap-2',
          clearPositions[size]
        )}
      >
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-zinc-500 hover:text-white transition-colors rounded"
            aria-label="Temizle"
          >
            <svg
              className={iconSizes[size]}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : showShortcut ? (
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-zinc-500 bg-zinc-800 rounded border border-zinc-700">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        ) : null}
      </div>
    </div>
  )
}

export default SearchInput
