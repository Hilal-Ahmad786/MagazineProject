// src/components/comments/CommentItem.tsx
// Individual comment with replies and likes

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getTimeAgo, getCommentAvatarUrl } from '@/types/comment'
import { CommentForm } from './CommentForm'
import type { Comment } from '@/types'

interface CommentItemProps {
  comment: Comment
  articleId: string
  onReply: (parentId: string, data: { name: string; email: string; content: string }) => void
  onLike: (commentId: string) => void
  onDelete?: (commentId: string) => void
  depth?: number
  maxDepth?: number
  className?: string
}

export function CommentItem({
  comment,
  articleId,
  onReply,
  onLike,
  onDelete,
  depth = 0,
  maxDepth = 2,
  className,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(true)

  const handleReply = (data: { name: string; email: string; content: string }) => {
    onReply(comment.id, data)
    setIsReplying(false)
  }

  const handleLike = () => {
    if (!isLiked) {
      onLike(comment.id)
      setIsLiked(true)
    }
  }

  const avatarUrl = comment.author.avatar || getCommentAvatarUrl(comment.author.name)
  const hasReplies = comment.replies && comment.replies.length > 0
  const canReply = depth < maxDepth

  return (
    <div className={cn('group', className)}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
            <Image
              src={avatarUrl}
              alt={comment.author.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-white">
              {comment.author.name}
            </span>
            <span className="text-xs text-zinc-500">
              {getTimeAgo(comment.createdAt)}
            </span>
            {comment.isEdited && (
              <span className="text-xs text-zinc-600">(düzenlendi)</span>
            )}
          </div>

          {/* Comment Text */}
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-1.5 text-xs transition-colors',
                isLiked
                  ? 'text-primary'
                  : 'text-zinc-500 hover:text-zinc-300'
              )}
            >
              <svg
                className="w-4 h-4"
                fill={isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{comment.likes > 0 ? comment.likes : 'Beğen'}</span>
            </button>

            {/* Reply Button */}
            {canReply && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>Yanıtla</span>
              </button>
            )}

            {/* Delete Button (optional) */}
            {onDelete && (
              <button
                onClick={() => onDelete(comment.id)}
                className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4 pl-2 border-l-2 border-zinc-800">
              <CommentForm
                onSubmit={handleReply}
                isReply
                replyingTo={comment.author.name}
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}

          {/* Nested Replies */}
          {hasReplies && (
            <div className="mt-4">
              {/* Toggle Replies */}
              {comment.replies!.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-3"
                >
                  <svg
                    className={cn(
                      'w-3 h-3 transition-transform',
                      showReplies ? 'rotate-90' : ''
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>
                    {showReplies ? 'Yanıtları gizle' : `${comment.replies!.length} yanıt`}
                  </span>
                </button>
              )}

              {/* Replies List */}
              {showReplies && (
                <div className="space-y-4 pl-2 border-l-2 border-zinc-800/50">
                  {comment.replies!.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      articleId={articleId}
                      onReply={onReply}
                      onLike={onLike}
                      onDelete={onDelete}
                      depth={depth + 1}
                      maxDepth={maxDepth}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
