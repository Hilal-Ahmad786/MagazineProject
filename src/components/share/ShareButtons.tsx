// src/components/share/ShareButtons.tsx
// Group of share buttons

'use client'

import { cn } from '@/lib/utils'
import { ShareButton, type SharePlatform } from './ShareButton'
import { CopyLinkButton } from './CopyLinkButton'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  platforms?: SharePlatform[]
  showCopy?: boolean
  variant?: 'icon' | 'button' | 'pill'
  size?: 'sm' | 'md' | 'lg'
  layout?: 'horizontal' | 'vertical' | 'grid'
  className?: string
}

const defaultPlatforms: SharePlatform[] = ['twitter', 'facebook', 'whatsapp', 'linkedin']

export function ShareButtons({
  url,
  title,
  description,
  platforms = defaultPlatforms,
  showCopy = true,
  variant = 'icon',
  size = 'md',
  layout = 'horizontal',
  className,
}: ShareButtonsProps) {
  const layoutClasses = {
    horizontal: 'flex flex-wrap items-center gap-2',
    vertical: 'flex flex-col gap-2',
    grid: 'grid grid-cols-2 sm:grid-cols-3 gap-2',
  }

  return (
    <div className={cn(layoutClasses[layout], className)}>
      {platforms.map((platform) => (
        <ShareButton
          key={platform}
          platform={platform}
          url={url}
          title={title}
          description={description}
          variant={variant}
          size={size}
        />
      ))}
      {showCopy && (
        <CopyLinkButton
          url={url}
          variant={variant}
          size={size}
        />
      )}
    </div>
  )
}

export default ShareButtons
