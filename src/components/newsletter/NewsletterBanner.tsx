// src/components/newsletter/NewsletterBanner.tsx
// Inline newsletter banner for footer or sections

'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { NewsletterForm } from './NewsletterForm'

interface NewsletterBannerProps {
  variant?: 'default' | 'compact' | 'card' | 'fullwidth'
  title?: string
  description?: string
  onSubscribe?: (email: string) => Promise<void> | void
  className?: string
}

export function NewsletterBanner({
  variant = 'default',
  title = 'Bültene Abone Ol',
  description = 'Yeni içeriklerden haberdar olmak için abone ol.',
  onSubscribe,
  className,
}: NewsletterBannerProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsSubscribed(localStorage.getItem('newsletter_subscribed') === 'true')
  }, [])

  // Already subscribed message
  if (isSubscribed) {
    return (
      <div className={cn('p-6 bg-zinc-900/50 rounded-xl border border-zinc-800', className)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-white">Zaten Abonesiniz</h4>
            <p className="text-sm text-zinc-500">Bültene abone olduğunuz için teşekkürler!</p>
          </div>
        </div>
      </div>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-col sm:flex-row items-center gap-4', className)}>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-zinc-400">{description}</span>
        </div>
        <NewsletterForm
          onSubmit={onSubscribe}
          onSuccess={() => setIsSubscribed(true)}
          variant="inline"
          size="sm"
          buttonText="Abone Ol"
          className="w-full sm:w-auto"
        />
      </div>
    )
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={cn(
        'p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl',
        'relative overflow-hidden',
        className
      )}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          
          <p className="text-zinc-400 mb-6">{description}</p>
          
          <NewsletterForm
            onSubmit={onSubscribe}
            onSuccess={() => setIsSubscribed(true)}
            variant="default"
            size="md"
          />
        </div>
      </div>
    )
  }

  // Fullwidth variant (for sections)
  if (variant === 'fullwidth') {
    return (
      <section className={cn('py-16 md:py-24 bg-zinc-900/50', className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-primary/10">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>

            {/* Description */}
            <p className="text-lg text-zinc-400 mb-8">
              {description}
            </p>

            {/* Form */}
            <div className="max-w-md mx-auto">
              <NewsletterForm
                onSubmit={onSubscribe}
                onSuccess={() => setIsSubscribed(true)}
                variant="inline"
                size="lg"
              />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Güvenli
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Spam yok
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                İstediğinde çık
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <div className={cn(
      'p-6 bg-zinc-900/50 rounded-xl border border-zinc-800',
      className
    )}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="font-bold text-white">{title}</h3>
          </div>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>

        {/* Form */}
        <div className="md:w-80">
          <NewsletterForm
            onSubmit={onSubscribe}
            onSuccess={() => setIsSubscribed(true)}
            variant="inline"
            size="sm"
          />
        </div>
      </div>
    </div>
  )
}

export default NewsletterBanner
