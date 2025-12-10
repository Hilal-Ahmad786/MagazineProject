// src/components/pwa/InstallPrompt.tsx
// PWA install prompt component

'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { STORAGE_KEYS, PWA_PROMPT_DELAY } from '@/lib/constants'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface InstallPromptProps {
  delay?: number
  variant?: 'banner' | 'modal' | 'toast'
  className?: string
}

export function InstallPrompt({
  delay = PWA_PROMPT_DELAY,
  variant = 'banner',
  className,
}: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  // Check if already installed
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check display mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    // Check if dismissed
    const dismissed = localStorage.getItem(STORAGE_KEYS.pwaPromptDismissed)
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10)
      // Show again after 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return
      }
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after delay
      setTimeout(() => {
        setShowPrompt(true)
      }, delay)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [delay])

  // Handle install
  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('[PWA] App installed')
      }

      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error('[PWA] Install failed:', error)
    }
  }, [deferredPrompt])

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setShowPrompt(false)
    localStorage.setItem(STORAGE_KEYS.pwaPromptDismissed, Date.now().toString())
  }, [])

  // Don't render if installed or not ready
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  // Banner variant (bottom of screen)
  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-900 border-t border-zinc-800',
          'animate-in slide-in-from-bottom duration-300',
          className
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-white">Mazhar Dergisi</h3>
              <p className="text-sm text-zinc-400">Ana ekranına ekle, hızlıca eriş</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Sonra
            </button>
            <button
              onClick={handleInstall}
              className="px-4 py-2 text-sm font-medium bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
            >
              Yükle
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Modal variant (center of screen)
  if (variant === 'modal') {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={handleDismiss}
        />

        {/* Modal */}
        <div
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'w-full max-w-sm p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl',
            'animate-in zoom-in-95 duration-300',
            className
          )}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Uygulamayı Yükle</h3>
            <p className="text-zinc-400 mb-6">
              Mazhar Dergisi'ni ana ekranına ekleyerek daha hızlı erişim sağla ve çevrimdışı oku.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleInstall}
                className="w-full py-3 font-medium bg-primary text-black rounded-xl hover:bg-primary/90 transition-colors"
              >
                Ana Ekrana Ekle
              </button>
              <button
                onClick={handleDismiss}
                className="w-full py-3 text-zinc-400 hover:text-white transition-colors"
              >
                Belki Daha Sonra
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Toast variant (bottom right)
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 w-80 p-4',
        'bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl',
        'animate-in slide-in-from-right duration-300',
        className
      )}
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-white rounded transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-white text-sm">Uygulamayı Yükle</h4>
          <p className="text-xs text-zinc-500 mt-0.5">Ana ekrana ekle</p>
          <button
            onClick={handleInstall}
            className="mt-2 px-3 py-1 text-xs font-medium bg-primary text-black rounded hover:bg-primary/90 transition-colors"
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
