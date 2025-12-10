// src/components/share/ShareModal.tsx
// Share modal with all share options

'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ShareButton, type SharePlatform } from './ShareButton'
import { CopyLinkButton } from './CopyLinkButton'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
  description?: string
  image?: string
  platforms?: SharePlatform[]
  className?: string
}

const defaultPlatforms: SharePlatform[] = ['twitter', 'facebook', 'whatsapp', 'linkedin', 'telegram', 'email']

export function ShareModal({
  isOpen,
  onClose,
  url,
  title,
  description,
  image,
  platforms = defaultPlatforms,
  className,
}: ShareModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  // Check for native share support
  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator)
  }, [])

  // Handle native share
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        })
        onClose()
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled')
      }
    }
  }

  // Handle close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }, [onClose])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

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
          'fixed z-50 bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
          'w-full sm:max-w-md',
          'bg-zinc-900 border-t sm:border border-zinc-800 sm:rounded-2xl shadow-2xl',
          'transition-all duration-300',
          isClosing
            ? 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            : 'opacity-100 translate-y-0 sm:scale-100 animate-in slide-in-from-bottom sm:zoom-in-95',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Paylaş"
      >
        {/* Handle bar (mobile) */}
        <div className="sm:hidden flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800">
          <h3 className="text-lg font-bold text-white">Paylaş</h3>
          <button
            onClick={handleClose}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-4 sm:p-6 border-b border-zinc-800">
          <div className="flex gap-4">
            {image && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white line-clamp-2 mb-1">{title}</h4>
              {description && (
                <p className="text-sm text-zinc-500 line-clamp-2">{description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Native Share Button (if supported) */}
        {canNativeShare && (
          <div className="p-4 sm:p-6 border-b border-zinc-800">
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Paylaş</span>
            </button>
          </div>
        )}

        {/* Share Platforms */}
        <div className="p-4 sm:p-6">
          <p className="text-sm text-zinc-500 mb-4">Sosyal Medyada Paylaş</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {platforms.map((platform) => (
              <div key={platform} className="flex flex-col items-center gap-2">
                <ShareButton
                  platform={platform}
                  url={url}
                  title={title}
                  description={description}
                  variant="icon"
                  size="lg"
                />
                <span className="text-xs text-zinc-500 capitalize">
                  {platform === 'email' ? 'E-posta' : platform}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Copy Link */}
        <div className="p-4 sm:p-6 border-t border-zinc-800">
          <p className="text-sm text-zinc-500 mb-3">veya linki kopyala</p>
          <CopyLinkButton url={url} variant="input" size="md" />
        </div>
      </div>
    </>
  )
}

export default ShareModal
