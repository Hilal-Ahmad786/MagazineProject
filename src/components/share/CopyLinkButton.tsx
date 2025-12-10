// src/components/share/CopyLinkButton.tsx
// Copy link to clipboard button

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CopyLinkButtonProps {
  url: string
  variant?: 'icon' | 'button' | 'pill' | 'input'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CopyLinkButton({
  url,
  variant = 'button',
  size = 'md',
  className,
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8',
      button: 'h-8 px-3 text-xs gap-1.5',
      iconSize: 'w-4 h-4',
      input: 'h-8 text-xs',
    },
    md: {
      icon: 'w-10 h-10',
      button: 'h-10 px-4 text-sm gap-2',
      iconSize: 'w-5 h-5',
      input: 'h-10 text-sm',
    },
    lg: {
      icon: 'w-12 h-12',
      button: 'h-12 px-5 text-base gap-2',
      iconSize: 'w-6 h-6',
      input: 'h-12 text-base',
    },
  }

  const CopyIcon = () => (
    <svg className={sizeClasses[size].iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )

  const CheckIcon = () => (
    <svg className={sizeClasses[size].iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )

  // Input variant (shows URL + copy button)
  if (variant === 'input') {
    return (
      <div className={cn('flex rounded-lg overflow-hidden border border-zinc-800', className)}>
        <input
          type="text"
          value={url}
          readOnly
          className={cn(
            'flex-1 bg-zinc-900 text-zinc-400 px-3 truncate focus:outline-none',
            sizeClasses[size].input
          )}
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center justify-center px-4 transition-colors',
            copied
              ? 'bg-green-500 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
          )}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    )
  }

  // Icon variant
  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        className={cn(
          'flex items-center justify-center rounded-full transition-all',
          copied
            ? 'bg-green-500 text-white'
            : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700',
          sizeClasses[size].icon,
          className
        )}
        aria-label={copied ? 'Kopyalandı' : 'Linki kopyala'}
        title={copied ? 'Kopyalandı!' : 'Linki kopyala'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    )
  }

  // Pill variant
  if (variant === 'pill') {
    return (
      <button
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-all',
          copied
            ? 'bg-green-500 text-white'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
          sizeClasses[size].button,
          className
        )}
        aria-label={copied ? 'Kopyalandı' : 'Linki kopyala'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
      </button>
    )
  }

  // Button variant (default)
  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all',
        copied
          ? 'bg-green-500 text-white'
          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
        sizeClasses[size].button,
        className
      )}
      aria-label={copied ? 'Kopyalandı' : 'Linki kopyala'}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? 'Kopyalandı!' : 'Linki Kopyala'}</span>
    </button>
  )
}

export default CopyLinkButton
