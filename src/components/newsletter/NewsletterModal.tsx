// src/components/newsletter/NewsletterModal.tsx
// Newsletter popup modal with delay

'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { NewsletterForm } from './NewsletterForm'

interface NewsletterModalProps {
  delay?: number
  cooldownDays?: number
  onSubscribe?: (email: string) => Promise<void> | void
  className?: string
}

const STORAGE_KEY = 'newsletter_modal_dismissed'
const SUBSCRIBED_KEY = 'newsletter_subscribed'

export function NewsletterModal({
  delay = 30000, // 30 seconds default
  cooldownDays = 7,
  onSubscribe,
  className,
}: NewsletterModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if already subscribed
    const isSubscribed = localStorage.getItem(SUBSCRIBED_KEY) === 'true'
    if (isSubscribed) return

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(STORAGE_KEY)
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10)
      const cooldownMs = cooldownDays * 24 * 60 * 60 * 1000
      if (Date.now() - dismissedTime < cooldownMs) {
        return
      }
    }

    // Show modal after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, cooldownDays])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
    }, 200)
  }, [])

  const handleSuccess = useCallback(() => {
    // Close after a short delay to show success message
    setTimeout(() => {
      handleClose()
    }, 2000)
  }, [handleClose])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, handleClose])

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-200',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-lg mx-4',
          'transition-all duration-300',
          isClosing
            ? 'opacity-0 scale-95'
            : 'opacity-100 scale-100 animate-in zoom-in-95',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Bülten aboneliği"
      >
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Decorative Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-zinc-400 mb-6">
                Mazhar&apos;ın seçkin içerikleri, haftalık bültenle e-posta kutunuzda.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Bültene Abone Ol
              </h2>
              <p className="text-zinc-400 max-w-sm mx-auto">
                Yeni yazılar, özel içerikler ve duyurulardan haberdar olmak için e-posta listemize katıl.
              </p>
            </div>

            {/* Form */}
            <NewsletterForm
              onSubmit={onSubscribe}
              onSuccess={handleSuccess}
              variant="default"
              size="lg"
              placeholder="ornek@email.com"
              buttonText="Abone Ol"
            />

            {/* Privacy Note */}
            <p className="mt-6 text-center text-xs text-zinc-600">
              Abone olarak{' '}
              <a href="/gizlilik" className="text-zinc-500 hover:text-primary underline">
                Gizlilik Politikası
              </a>
              &apos;nı kabul etmiş olursunuz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </div>

          {/* Features */}
          <div className="px-8 pb-8 md:px-10 md:pb-10">
            <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-800/50 rounded-xl">
              <div className="text-center">
                <div className="text-2xl mb-1">📚</div>
                <p className="text-xs text-zinc-400">Haftalık Özet</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🎁</div>
                <p className="text-xs text-zinc-400">Özel İçerik</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🚀</div>
                <p className="text-xs text-zinc-400">Erken Erişim</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsletterModal
