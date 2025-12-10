// src/components/comments/CommentForm.tsx
// Comment submission form

'use client'

import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { isValidEmail } from '@/lib/utils'

interface CommentFormProps {
  onSubmit: (data: { name: string; email: string; content: string }) => void
  isReply?: boolean
  replyingTo?: string
  onCancel?: () => void
  className?: string
}

export function CommentForm({
  onSubmit,
  isReply = false,
  replyingTo,
  onCancel,
  className,
}: CommentFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'İsim gerekli'
    } else if (name.trim().length < 2) {
      newErrors.name = 'İsim en az 2 karakter olmalı'
    }

    if (!email.trim()) {
      newErrors.email = 'E-posta gerekli'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Geçerli bir e-posta girin'
    }

    if (!content.trim()) {
      newErrors.content = 'Yorum gerekli'
    } else if (content.trim().length < 3) {
      newErrors.content = 'Yorum en az 3 karakter olmalı'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        content: content.trim(),
      })

      // Clear form on success
      setContent('')
    } catch (error) {
      console.error('Comment submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-4', className)}
    >
      {/* Reply indicator */}
      {isReply && replyingTo && (
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span><strong className="text-white">{replyingTo}</strong> adlı kullanıcıya yanıt</span>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="comment-name" className="block text-sm font-medium text-zinc-300 mb-1.5">
            İsim
          </label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız"
            className={cn(
              'w-full h-10 px-3 rounded-lg bg-zinc-900 border text-white placeholder-zinc-500',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'transition-colors',
              errors.name ? 'border-red-500' : 'border-zinc-800'
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="comment-email" className="block text-sm font-medium text-zinc-300 mb-1.5">
            E-posta <span className="text-zinc-600">(görünmez)</span>
          </label>
          <input
            id="comment-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            className={cn(
              'w-full h-10 px-3 rounded-lg bg-zinc-900 border text-white placeholder-zinc-500',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'transition-colors',
              errors.email ? 'border-red-500' : 'border-zinc-800'
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="comment-content" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {isReply ? 'Yanıtınız' : 'Yorumunuz'}
        </label>
        <textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isReply ? 'Yanıtınızı yazın...' : 'Düşüncelerinizi paylaşın...'}
          rows={isReply ? 3 : 4}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg bg-zinc-900 border text-white placeholder-zinc-500',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'transition-colors resize-none',
            errors.content ? 'border-red-500' : 'border-zinc-800'
          )}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-red-500">{errors.content}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {isReply && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'px-5 py-2 rounded-lg font-medium text-sm',
            'bg-primary text-black hover:bg-primary/90',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all'
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Gönderiliyor...
            </span>
          ) : (
            isReply ? 'Yanıtla' : 'Yorum Yap'
          )}
        </button>
      </div>
    </form>
  )
}

export default CommentForm
