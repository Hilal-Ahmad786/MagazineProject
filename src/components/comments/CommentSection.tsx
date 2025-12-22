'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'
import type { Comment } from '@/types'

interface CommentSectionProps {
  articleId: string
  title?: string
  className?: string
}

export function CommentSection({
  articleId,
  title = 'Yorumlar',
  className,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?articleId=${articleId}`)
      if (res.ok) {
        const data = await res.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [articleId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  // Count comments helper
  const countComments = (list: Comment[]): number => {
    return list.reduce((acc, curr) => acc + 1 + countComments(curr.replies || []), 0)
  }

  const commentCount = countComments(comments)

  // Handle new comment
  const handleAddComment = async (data: { name: string; email: string; content: string }) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          ...data
        }),
      })

      if (res.ok) {
        await fetchComments() // Refresh list
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

  // Handle reply
  const handleReply = async (parentId: string, data: { name: string; email: string; content: string }) => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          parentId,
          ...data
        }),
      })

      if (res.ok) {
        await fetchComments() // Refresh list
      }
    } catch (error) {
      console.error('Failed to post reply:', error)
    }
  }

  // Handle like
  const handleLike = async (commentId: string) => {
    try {
      // Optimistic update could be done here, but for now just fire and forget or refresh
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' })
      // We can refresh or let it be (likes often don't need instant strict sync)
      // Let's refresh to show the new count
      // Or update local state for better perf? 
      // Simple:
      fetchComments()
    } catch (error) {
      console.error('Failed to like comment:', error)
    }
  }

  // Handle delete (Admin only realistically, but keeping prop signature)
  // Since this is public facing, we probably don't expose delete here unless user is admin?
  // Current design implies admin manages from admin panel. Public users shouldn't delete.
  // We can pass undefined for onDelete or implement if we have auth.
  // For now, let's leave handleLike and ignore delete in public view.

  return (
    <section className={cn('', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <svg
          className="w-6 h-6 text-primary"
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
        <h2 className="text-2xl font-bold text-white">
          {title}
          {commentCount > 0 && (
            <span className="ml-2 text-lg font-normal text-zinc-500">
              ({commentCount})
            </span>
          )}
        </h2>
      </div>

      {/* Comment Form */}
      <div className="mb-8 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
        <h3 className="text-lg font-medium text-white mb-4">Yorum Yap</h3>
        <CommentForm onSubmit={handleAddComment} />
      </div>

      {/* Comment List */}
      {isLoading ? (
        <div className="text-center py-8 text-zinc-500">Yükleniyor...</div>
      ) : (
        <CommentList
          comments={comments}
          articleId={articleId}
          onReply={handleReply}
          onLike={handleLike}
        />
      )}
    </section>
  )
}

export default CommentSection
