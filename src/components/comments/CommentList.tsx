// src/components/comments/CommentList.tsx
// List of comments with sorting options

'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { CommentItem } from './CommentItem'
import type { Comment } from '@/types'

type SortOption = 'newest' | 'oldest' | 'popular'

interface CommentListProps {
  comments: Comment[]
  articleId: string
  onReply: (parentId: string, data: { name: string; email: string; content: string }) => void
  onLike: (commentId: string) => void
  onDelete?: (commentId: string) => void
  className?: string
}

export function CommentList({
  comments,
  articleId,
  onReply,
  onLike,
  onDelete,
  className,
}: CommentListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  // Sort comments
  const sortedComments = useMemo(() => {
    const sorted = [...comments]

    switch (sortBy) {
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'oldest':
        return sorted.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      case 'popular':
        return sorted.sort((a, b) => b.likes - a.likes)
      default:
        return sorted
    }
  }, [comments, sortBy])

  // Count total comments including replies
  const totalCount = useMemo(() => {
    const countReplies = (comments: Comment[]): number => {
      return comments.reduce((total, comment) => {
        return total + 1 + (comment.replies ? countReplies(comment.replies) : 0)
      }, 0)
    }
    return countReplies(comments)
  }, [comments])

  if (comments.length === 0) {
    return (
      <div className={cn('py-12 text-center', className)}>
        <svg
          className="w-16 h-16 mx-auto mb-4 text-zinc-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="text-lg font-medium text-zinc-300 mb-1">
          Henüz yorum yapılmamış
        </h3>
        <p className="text-sm text-zinc-500">
          İlk yorumu siz yapın!
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Header with Sort */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-zinc-400">
          {totalCount} yorum
        </span>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className={cn(
              'appearance-none bg-zinc-900 border border-zinc-800 rounded-lg',
              'px-3 py-1.5 pr-8 text-sm text-zinc-300',
              'focus:outline-none focus:border-primary',
              'cursor-pointer'
            )}
          >
            <option value="newest">En yeni</option>
            <option value="oldest">En eski</option>
            <option value="popular">En popüler</option>
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            articleId={articleId}
            onReply={onReply}
            onLike={onLike}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentList
