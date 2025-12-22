// src/components/footer/FooterNewsletter.tsx
// Footer newsletter subscription section

'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { isValidEmail } from '@/lib/utils'

interface FooterNewsletterProps {
  variant?: 'default' | 'inline'
  title?: string
  description?: string
  className?: string
}

export function FooterNewsletter({
  variant = 'default',
  title = 'Bültene Abone Ol',
  description = 'Haftalık içerik özetleri ve özel haberler için abone ol.',
  className,
}: FooterNewsletterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsSubscribed(localStorage.getItem('newsletter_subscribed') === 'true')
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('E-posta gerekli')
      return
    }

    if (!isValidEmail(email)) {
      setError('Geçerli bir e-posta girin')
      return
    }

    setStatus('loading')

    try {
      // Call API
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        throw new Error('Subscription failed');
      }

      localStorage.setItem('newsletter_subscribed', 'true')
      localStorage.setItem('newsletter_email', email.trim())

      setStatus('success')
      setIsSubscribed(true)
    } catch (err) {
      console.error(err);
      setStatus('error')
      setError('Bir hata oluştu')
    }
  }

  // Already subscribed
  if (isSubscribed) {
    return (
      <div className={cn('', className)}>
        {variant === 'default' && (
          <>
            <h4 className="font-semibold text-white mb-4">{title}</h4>
            <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-zinc-400">Bültene abonesiniz ✨</span>
            </div>
          </>
        )}
        {variant === 'inline' && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Bültene abonesiniz</span>
          </div>
        )}
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
          placeholder="E-posta adresiniz"
          className={cn(
            'flex-1 h-10 px-4 rounded-lg bg-zinc-900 border text-white placeholder-zinc-500 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            error ? 'border-red-500' : 'border-zinc-800'
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="h-10 px-5 rounded-lg font-medium text-sm bg-primary text-black hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? '...' : 'Abone Ol'}
        </button>
      </form>
    )
  }

  // Default variant
  return (
    <div className={className}>
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-zinc-400 mb-4">{description}</p>

      {status === 'success' ? (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-green-500">Başarıyla abone oldunuz!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className={cn(
                'w-full h-11 px-4 rounded-xl bg-zinc-900 border text-white placeholder-zinc-500',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                'transition-colors',
                error ? 'border-red-500' : 'border-zinc-800'
              )}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn(
              'w-full h-11 rounded-xl font-medium',
              'bg-primary text-black hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-colors'
            )}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Gönderiliyor...
              </span>
            ) : (
              'Abone Ol'
            )}
          </button>
        </form>
      )}

      <p className="mt-3 text-xs text-zinc-600">
        Spam göndermiyoruz. İstediğiniz zaman çıkabilirsiniz.
      </p>
    </div>
  )
}

export default FooterNewsletter
