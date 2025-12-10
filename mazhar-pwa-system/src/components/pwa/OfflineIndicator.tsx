// src/components/pwa/OfflineIndicator.tsx
// Offline status indicator

'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OfflineIndicatorProps {
  variant?: 'banner' | 'toast' | 'dot'
  position?: 'top' | 'bottom'
  showOnlineMessage?: boolean
  className?: string
}

export function OfflineIndicator({
  variant = 'banner',
  position = 'top',
  showOnlineMessage = true,
  className,
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [showOnline, setShowOnline] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      if (showOnlineMessage) {
        setShowOnline(true)
        setTimeout(() => setShowOnline(false), 3000)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [showOnlineMessage])

  // Dot variant - small indicator
  if (variant === 'dot') {
    return (
      <div
        className={cn(
          'w-2 h-2 rounded-full transition-colors',
          isOnline ? 'bg-green-500' : 'bg-red-500',
          className
        )}
        title={isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
      />
    )
  }

  // Toast variant
  if (variant === 'toast') {
    if (isOnline && !showOnline) return null

    return (
      <div
        className={cn(
          'fixed z-50 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-lg',
          'animate-in slide-in-from-top duration-300',
          position === 'top' ? 'top-4' : 'bottom-4',
          isOnline
            ? 'bg-green-500/10 border border-green-500/20 text-green-500'
            : 'bg-red-500/10 border border-red-500/20 text-red-500',
          className
        )}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          {isOnline ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Çevrimiçi</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
              </svg>
              <span>Çevrimdışı</span>
            </>
          )}
        </div>
      </div>
    )
  }

  // Banner variant - only show when offline
  if (isOnline && !showOnline) return null

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-50 px-4 py-2',
        'animate-in slide-in-from-top duration-300',
        position === 'top' ? 'top-0' : 'bottom-0',
        isOnline
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white',
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        {isOnline ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>İnternet bağlantısı yeniden kuruldu</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>İnternet bağlantısı yok - Önbelleğe alınmış içerikler gösteriliyor</span>
          </>
        )}
      </div>
    </div>
  )
}

export default OfflineIndicator
