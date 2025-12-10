// src/components/reading-list/ReadingListToggle.tsx
// Toggle button for header to open reading list drawer

'use client'

import { cn } from '@/lib/utils'
import { useReadingList } from '@/contexts/ReadingListContext'

interface ReadingListToggleProps {
  variant?: 'icon' | 'button'
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
}

export function ReadingListToggle({
  variant = 'icon',
  size = 'md',
  showCount = true,
  className,
}: ReadingListToggleProps) {
  const { count, openDrawer } = useReadingList()

  const sizeClasses = {
    sm: {
      button: 'h-8 px-3 text-xs gap-1.5',
      icon: 'w-8 h-8',
      iconSize: 'w-4 h-4',
      badge: 'w-4 h-4 text-[10px] -top-1 -right-1',
    },
    md: {
      button: 'h-10 px-4 text-sm gap-2',
      icon: 'w-10 h-10',
      iconSize: 'w-5 h-5',
      badge: 'w-5 h-5 text-xs -top-1 -right-1',
    },
    lg: {
      button: 'h-12 px-5 text-base gap-2',
      icon: 'w-12 h-12',
      iconSize: 'w-6 h-6',
      badge: 'w-6 h-6 text-sm -top-1.5 -right-1.5',
    },
  }

  const BookmarkIcon = () => (
    <svg
      className={sizeClasses[size].iconSize}
      fill={count > 0 ? 'currentColor' : 'none'}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  )

  // Icon variant
  if (variant === 'icon') {
    return (
      <button
        onClick={openDrawer}
        className={cn(
          'relative flex items-center justify-center rounded-full transition-colors',
          count > 0
            ? 'text-primary hover:bg-primary/10'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800',
          sizeClasses[size].icon,
          className
        )}
        aria-label={`Okuma listesi (${count} yazı)`}
      >
        <BookmarkIcon />
        
        {/* Badge */}
        {showCount && count > 0 && (
          <span
            className={cn(
              'absolute flex items-center justify-center rounded-full',
              'bg-primary text-black font-bold',
              sizeClasses[size].badge
            )}
          >
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>
    )
  }

  // Button variant
  return (
    <button
      onClick={openDrawer}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all',
        'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
        sizeClasses[size].button,
        className
      )}
      aria-label={`Okuma listesi (${count} yazı)`}
    >
      <BookmarkIcon />
      <span>Okuma Listesi</span>
      {showCount && count > 0 && (
        <span className="ml-1 px-1.5 py-0.5 rounded bg-primary text-black text-xs font-bold">
          {count}
        </span>
      )}
    </button>
  )
}

export default ReadingListToggle
