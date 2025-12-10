// src/components/comments/CommentSection.tsx
// Main comment section container

'use client'

import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useComments } from '@/contexts/CommentsContext'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

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
  const {
    getComments,
    getCommentCount,
    addComment,
    addReply,
    likeComment,
    deleteComment,
  } = useComments()

  const comments = getComments(articleId)
  const commentCount = getCommentCount(articleId)

  // Handle new comment
  const handleAddComment = useCallback(
    (data: { name: string; email: string; content: string }) => {
      addComment(articleId, data)
    },
    [articleId, addComment]
  )

  // Handle reply
  const handleReply = useCallback(
    (parentId: string, data: { name: string; email: string; content: string }) => {
      addReply(articleId, parentId, data)
    },
    [articleId, addReply]
  )

  // Handle like
  const handleLike = useCallback(
    (commentId: string) => {
      likeComment(articleId, commentId)
    },
    [articleId, likeComment]
  )

  // Handle delete
  const handleDelete = useCallback(
    (commentId: string) => {
      if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
        deleteComment(articleId, commentId)
      }
    },
    [articleId, deleteComment]
  )

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
      <CommentList
        comments={comments}
        articleId={articleId}
        onReply={handleReply}
        onLike={handleLike}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default CommentSection
