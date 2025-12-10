// src/hooks/usePWA.ts
// Custom hook for Progressive Web App functionality

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PWAState {
  /** Whether the app can be installed */
  isInstallable: boolean
  /** Whether the app is already installed (standalone mode) */
  isInstalled: boolean
  /** Whether the device is online */
  isOnline: boolean
  /** Whether the app is running in standalone mode */
  isStandalone: boolean
  /** Trigger the install prompt */
  install: () => Promise<boolean>
  /** Current service worker registration */
  registration: ServiceWorkerRegistration | null
  /** Check for service worker updates */
  checkForUpdates: () => Promise<void>
}

/**
 * Custom hook for PWA functionality
 * 
 * Provides:
 * - Install prompt handling
 * - Online/offline detection
 * - Service worker registration
 * - Update checking
 */
export function usePWA(): PWAState {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isStandalone, setIsStandalone] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)

  // Check if app is running in standalone mode
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true

      setIsStandalone(isStandaloneMode)
      setIsInstalled(isStandaloneMode)
    }

    checkStandalone()

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addEventListener('change', checkStandalone)

    return () => {
      mediaQuery.removeEventListener('change', checkStandalone)
    }
  }, [])

  // Handle beforeinstallprompt event
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Save the event for later use
      deferredPromptRef.current = e as BeforeInstallPromptEvent
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      deferredPromptRef.current = null
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // Online/offline detection
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Set initial state
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Register service worker
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js')
        setRegistration(reg)

        // Check for updates periodically
        setInterval(() => {
          reg.update()
        }, 60 * 60 * 1000) // Check every hour
      } catch (error) {
        console.error('Service worker registration failed:', error)
      }
    }

    registerSW()
  }, [])

  // Install function
  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPromptRef.current) {
      return false
    }

    try {
      // Show the install prompt
      await deferredPromptRef.current.prompt()
      
      // Wait for the user to respond
      const { outcome } = await deferredPromptRef.current.userChoice
      
      // Clear the deferred prompt
      deferredPromptRef.current = null
      
      if (outcome === 'accepted') {
        setIsInstallable(false)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Install prompt failed:', error)
      return false
    }
  }, [])

  // Check for updates
  const checkForUpdates = useCallback(async () => {
    if (!registration) return

    try {
      await registration.update()
    } catch (error) {
      console.error('Update check failed:', error)
    }
  }, [registration])

  return {
    isInstallable,
    isInstalled,
    isOnline,
    isStandalone,
    install,
    registration,
    checkForUpdates,
  }
}

/**
 * Hook to show offline indicator
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

export default usePWA
