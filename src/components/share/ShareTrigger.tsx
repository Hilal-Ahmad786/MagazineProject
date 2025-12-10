// src/components/share/ShareTrigger.tsx
// Button to open share modal or trigger native share

'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ShareModal } from './ShareModal'
import type { SharePlatform } from './ShareButton'

interface ShareTriggerProps {
  url: string
  title: string
  description?: string
  image?: string
  platforms?: SharePlatform[]
  variant?: 'icon' | 'button' | 'text'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  useNativeFirst?: boolean
  className?: string
}

export function ShareTrigger({
  url,
  title,
  description,
  image,
  platforms,
  variant = 'button',
  size = 'md',
  label = 'Paylaş',
  useNativeFirst = true,
  className,
}: ShareTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator)
  }, [])

  const handleClick = async () => {
    // Try native share first if enabled and supported
    if (useNativeFirst && canNativeShare && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        })
        return
      } catch (error) {
        // User cancelled, fall through to modal
      }
    }

    // Open modal
    setIsModalOpen(true)
  }

  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8',
      button: 'h-8 px-3 text-xs gap-1.5',
      iconSize: 'w-4 h-4',
    },
    md: {
      icon: 'w-10 h-10',
      button: 'h-10 px-4 text-sm gap-2',
      iconSize: 'w-5 h-5',
    },
    lg: {
      icon: 'w-12 h-12',
      button: 'h-12 px-5 text-base gap-2',
      iconSize: 'w-6 h-6',
    },
  }

  const ShareIcon = () => (
    <svg className={sizeClasses[size].iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )

  return (
    <>
      {/* Icon variant */}
      {variant === 'icon' && (
        <button
          onClick={handleClick}
          className={cn(
            'flex items-center justify-center rounded-full transition-colors',
            'text-zinc-400 hover:text-white hover:bg-zinc-800',
            sizeClasses[size].icon,
            className
          )}
          aria-label={label}
          title={label}
        >
          <ShareIcon />
        </button>
      )}

      {/* Button variant */}
      {variant === 'button' && (
        <button
          onClick={handleClick}
          className={cn(
            'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
            'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
            sizeClasses[size].button,
            className
          )}
          aria-label={label}
        >
          <ShareIcon />
          <span>{label}</span>
        </button>
      )}

      {/* Text variant */}
      {variant === 'text' && (
        <button
          onClick={handleClick}
          className={cn(
            'inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base',
            className
          )}
          aria-label={label}
        >
          <ShareIcon />
          <span>{label}</span>
        </button>
      )}

      {/* Modal */}
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={url}
        title={title}
        description={description}
        image={image}
        platforms={platforms}
      />
    </>
  )
}

export default ShareTrigger
