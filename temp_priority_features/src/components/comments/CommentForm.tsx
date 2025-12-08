'use client'

import { useState } from 'react'
import { useComments } from '@/contexts/CommentsContext'

interface CommentFormProps {
  articleId: string
  parentId?: string
  onCancel?: () => void
  placeholder?: string
}

export function CommentForm({ articleId, parentId, onCancel, placeholder }: CommentFormProps) {
  const { addComment } = useComments()
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!author.trim() || !email.trim() || !content.trim()) return

    setIsSubmitting(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addComment(articleId, author.trim(), email.trim(), content.trim(), parentId)
    
    setContent('')
    if (!parentId) {
      setAuthor('')
      setEmail('')
    }
    setIsSubmitting(false)
    
    if (onCancel) onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!parentId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Adınız *"
            className="px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz *"
            className="px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
            required
          />
        </div>
      )}
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || "Yorumunuzu yazın..."}
        rows={parentId ? 3 : 5}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 resize-none"
        required
      />
      
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Gönderiliyor...' : parentId ? 'Yanıtla' : 'Yorum Yap'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-800 text-gray-400 font-bold hover:bg-gray-700 transition-colors"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  )
}
