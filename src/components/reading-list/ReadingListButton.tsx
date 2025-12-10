// src/components/reading-list/ReadingListButton.tsx
// Button to add/remove articles from reading list

'use client'

import { cn } from '@/lib/utils'
import { useReadingList } from '@/contexts/ReadingListContext'
import type { Article } from '@/types'

interface ReadingListButtonProps {
  article: Article
  variant?: 'icon' | 'button' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ReadingListButton({
  article,
  variant = 'button',
  size = 'md',
  showLabel = true,
  className,
}: ReadingListButtonProps) {
  const { addItem, removeItem, isInList } = useReadingList()
  const inList = isInList(article.id)

  const handleClick = () => {
    if (inList) {
      removeItem(article.id)
    } else {
      addItem(article)
    }
  }

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

  const BookmarkIcon = ({ filled }: { filled: boolean }) => (
    <svg
      className={sizeClasses[size].iconSize}
      fill={filled ? 'currentColor' : 'none'}
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

  // Icon only variant
  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center justify-center rounded-full transition-all',
          inList
            ? 'text-primary bg-primary/10 hover:bg-primary/20'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800',
          sizeClasses[size].icon,
          className
        )}
        aria-label={inList ? 'Listeden çıkar' : 'Listeye ekle'}
        title={inList ? 'Listeden çıkar' : 'Listeye ekle'}
      >
        <BookmarkIcon filled={inList} />
      </button>
    )
  }

  // Minimal variant (just icon + optional text, no background)
  if (variant === 'minimal') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-1.5 transition-colors',
          inList
            ? 'text-primary'
            : 'text-zinc-500 hover:text-white',
          className
        )}
        aria-label={inList ? 'Listeden çıkar' : 'Listeye ekle'}
      >
        <BookmarkIcon filled={inList} />
        {showLabel && (
          <span className="text-sm">
            {inList ? 'Kaydedildi' : 'Kaydet'}
          </span>
        )}
      </button>
    )
  }

  // Button variant (default)
  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all',
        inList
          ? 'bg-primary text-black hover:bg-primary/90'
          : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
        sizeClasses[size].button,
        className
      )}
      aria-label={inList ? 'Listeden çıkar' : 'Listeye ekle'}
    >
      <BookmarkIcon filled={inList} />
      {showLabel && (
        <span>{inList ? 'Kaydedildi' : 'Kaydet'}</span>
      )}
    </button>
  )
}

export default ReadingListButton
