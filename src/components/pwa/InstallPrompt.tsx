'use client'

import { useState, useEffect } from 'react'
import { usePWA } from '@/hooks/usePWA'

export function InstallPrompt() {
  const { isInstallable, isInstalled, install } = usePWA()
  const [isDismissed, setIsDismissed] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if user dismissed before
    const dismissed = localStorage.getItem('pwa_prompt_dismissed')
    if (dismissed) {
      setIsDismissed(true)
    }

    // Show prompt after 30 seconds if installable
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled && !dismissed) {
        setShowPrompt(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [isInstallable, isInstalled])

  const handleInstall = async () => {
    const installed = await install()
    if (installed) {
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setIsDismissed(true)
    localStorage.setItem('pwa_prompt_dismissed', 'true')
  }

  if (!showPrompt || isDismissed || isInstalled) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800 shadow-lg animate-slide-up">
      <div className="max-w-[600px] mx-auto flex items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0 bg-yellow-400 flex items-center justify-center">
          <span className="text-black font-black text-xl">M</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold">Uygulamayı Yükle</h3>
          <p className="text-sm text-gray-400 truncate">
            Mazhar Dergisi&apos;ni ana ekranınıza ekleyin
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Sonra
          </button>
          <button
            onClick={handleInstall}
            className="px-4 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors"
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  )
}
