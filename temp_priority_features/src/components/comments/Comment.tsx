'use client'

import { useState } from 'react'
import { Comment as CommentType, useComments } from '@/contexts/CommentsContext'
import { CommentForm } from './CommentForm'

interface CommentProps {
  comment: CommentType
  articleId: string
}

export function Comment({ comment, articleId }: CommentProps) {
  const { likeComment, comments } = useComments()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (!liked) {
      likeComment(comment.id)
      setLiked(true)
    }
  }

  // Get replies for this comment
  const replies = comments.filter(c => c.parentId === comment.id)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="group">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold">
          {getInitials(comment.author)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-white">{comment.author}</span>
            <span className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</span>
          </div>
          
          <p className="text-gray-300 leading-relaxed mb-3">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                liked ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
              }`}
            >
              <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Yanıtla
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4 pl-4 border-l-2 border-gray-800">
              <CommentForm 
                articleId={articleId} 
                parentId={comment.id}
                onCancel={() => setShowReplyForm(false)}
                placeholder={`${comment.author} kullanıcısına yanıt yaz...`}
              />
            </div>
          )}

          {/* Replies */}
          {replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-800 space-y-4">
              {replies.map(reply => (
                <Comment key={reply.id} comment={reply} articleId={articleId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
