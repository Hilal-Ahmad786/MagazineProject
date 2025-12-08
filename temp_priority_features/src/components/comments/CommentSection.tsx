'use client'

import { useComments } from '@/contexts/CommentsContext'
import { CommentForm } from './CommentForm'
import { Comment } from './Comment'

interface CommentSectionProps {
  articleId: string
  articleTitle?: string
}

export function CommentSection({ articleId, articleTitle }: CommentSectionProps) {
  const { getCommentsByArticle, commentCount } = useComments()
  const comments = getCommentsByArticle(articleId)
  const count = commentCount(articleId)

  return (
    <section className="py-12 border-t border-gray-800">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-black">YORUMLAR</h3>
        {count > 0 && (
          <span className="px-3 py-1 bg-yellow-400 text-black text-sm font-bold">
            {count}
          </span>
        )}
      </div>

      {/* Form */}
      <div className="mb-12">
        <CommentForm articleId={articleId} />
      </div>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-8">
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} articleId={articleId} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-500 text-lg">Henüz yorum yok</p>
          <p className="text-gray-600 text-sm mt-2">İlk yorumu siz yapın!</p>
        </div>
      )}
    </section>
  )
}
