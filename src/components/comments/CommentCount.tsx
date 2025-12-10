// src/components/comments/CommentCount.tsx
// Comment count badge/button for article cards

'use client'

import { cn } from '@/lib/utils'
import { useComments } from '@/contexts/CommentsContext'

interface CommentCountProps {
  articleId: string
  variant?: 'badge' | 'button' | 'text'
  size?: 'sm' | 'md' | 'lg'
  showZero?: boolean
  onClick?: () => void
  className?: string
}

export function CommentCount({
  articleId,
  variant = 'badge',
  size = 'md',
  showZero = false,
  onClick,
  className,
}: CommentCountProps) {
  const { getCommentCount } = useComments()
  const count = getCommentCount(articleId)

  // Don't render if zero and showZero is false
  if (count === 0 && !showZero) return null

  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const content = (
    <>
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
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span>{count}</span>
    </>
  )

  // Badge variant
  if (variant === 'badge') {
    return (
      <span
        className={cn(
          'inline-flex items-center text-zinc-400',
          sizeClasses[size],
          className
        )}
      >
        {content}
      </span>
    )
  }

  // Text variant
  if (variant === 'text') {
    return (
      <span
        className={cn(
          'inline-flex items-center text-zinc-500',
          sizeClasses[size],
          className
        )}
      >
        {content}
        <span className="ml-1">{count === 1 ? 'yorum' : 'yorum'}</span>
      </span>
    )
  }

  // Button variant
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center text-zinc-400 hover:text-white transition-colors',
        sizeClasses[size],
        className
      )}
    >
      {content}
    </button>
  )
}

export default CommentCount
