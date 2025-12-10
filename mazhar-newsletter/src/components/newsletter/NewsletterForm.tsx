// src/components/newsletter/NewsletterForm.tsx
// Reusable newsletter subscription form

'use client'

import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { isValidEmail } from '@/lib/utils'

interface NewsletterFormProps {
  onSubmit?: (email: string) => Promise<void> | void
  onSuccess?: () => void
  variant?: 'default' | 'minimal' | 'inline'
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  buttonText?: string
  className?: string
}

export function NewsletterForm({
  onSubmit,
  onSuccess,
  variant = 'default',
  size = 'md',
  placeholder = 'E-posta adresiniz',
  buttonText = 'Abone Ol',
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const sizeClasses = {
    sm: {
      input: 'h-9 px-3 text-sm',
      button: 'h-9 px-4 text-sm',
    },
    md: {
      input: 'h-11 px-4 text-base',
      button: 'h-11 px-5 text-base',
    },
    lg: {
      input: 'h-12 px-5 text-base',
      button: 'h-12 px-6 text-base',
    },
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate
    if (!email.trim()) {
      setError('E-posta adresi gerekli')
      return
    }

    if (!isValidEmail(email)) {
      setError('Geçerli bir e-posta adresi girin')
      return
    }

    setStatus('loading')

    try {
      // Call custom submit handler or default behavior
      if (onSubmit) {
        await onSubmit(email.trim())
      }

      // Save to localStorage
      localStorage.setItem('newsletter_subscribed', 'true')
      localStorage.setItem('newsletter_email', email.trim())

      setStatus('success')
      onSuccess?.()
    } catch (err) {
      setStatus('error')
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div className={cn('text-center', className)}>
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-500/10">
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-medium text-white mb-1">Teşekkürler!</h4>
        <p className="text-sm text-zinc-400">Bültene başarıyla abone oldunuz.</p>
      </div>
    )
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'flex-1 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'transition-colors',
            sizeClasses[size].input,
            error && 'border-red-500'
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'rounded-lg font-medium bg-primary text-black',
            'hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors',
            sizeClasses[size].button
          )}
        >
          {status === 'loading' ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            buttonText
          )}
        </button>
      </form>
    )
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={cn('space-y-3', className)}>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'w-full rounded-lg bg-transparent border-b border-zinc-700 text-white placeholder-zinc-500',
              'focus:outline-none focus:border-primary',
              'transition-colors pb-2',
              error && 'border-red-500'
            )}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'w-full py-2 rounded-lg font-medium text-sm',
            'bg-primary text-black hover:bg-primary/90',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors'
          )}
        >
          {status === 'loading' ? 'Gönderiliyor...' : buttonText}
        </button>
      </form>
    )
  }

  // Default variant
  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'transition-colors',
            sizeClasses[size].input,
            error && 'border-red-500'
          )}
        />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'w-full rounded-xl font-medium',
          'bg-primary text-black hover:bg-primary/90',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all',
          sizeClasses[size].button
        )}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Gönderiliyor...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </form>
  )
}

export default NewsletterForm
