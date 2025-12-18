// src/components/pwa/PWARegister.tsx
// Component to register service worker

'use client'

import { useEffect, useState } from 'react'

interface PWARegisterProps {
  onUpdate?: () => void
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function PWARegister({ onUpdate, onSuccess, onError }: PWARegisterProps) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Disable Service Worker in development to prevent caching issues
    if (process.env.NODE_ENV !== 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister()
            console.log('[PWA] Service Worker unregistered in development mode')
          }
        })
      }
      return
    }

    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        setRegistration(reg)
        console.log('[PWA] Service Worker registered:', reg.scope)

        // Check for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              setUpdateAvailable(true)
              onUpdate?.()
              console.log('[PWA] New content available')
            } else if (newWorker.state === 'activated') {
              // Content cached for offline
              onSuccess?.()
              console.log('[PWA] Content cached for offline use')
            }
          })
        })

        // Check if already installed
        if (reg.active) {
          onSuccess?.()
        }

        // Periodic update check (every hour)
        setInterval(() => {
          reg.update()
        }, 60 * 60 * 1000)

      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error)
        onError?.(error as Error)
      }
    }

    // Register on load
    if (document.readyState === 'complete') {
      registerSW()
    } else {
      window.addEventListener('load', registerSW)
      return () => window.removeEventListener('load', registerSW)
    }
  }, [onUpdate, onSuccess, onError])

  // Function to apply update
  const applyUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  // Show update prompt if available
  if (updateAvailable) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl animate-in slide-in-from-bottom">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">Güncelleme Mevcut</h4>
            <p className="text-sm text-zinc-400 mt-1">
              Yeni bir sürüm yüklendi.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={applyUpdate}
                className="px-3 py-1.5 text-sm font-medium bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
              >
                Yenile
              </button>
              <button
                onClick={() => setUpdateAvailable(false)}
                className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Sonra
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default PWARegister
