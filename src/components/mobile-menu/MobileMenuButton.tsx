// src/components/mobile-menu/MobileMenuButton.tsx
// Animated hamburger menu button

'use client'

import { cn } from '@/lib/utils'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MobileMenuButton({
  isOpen,
  onClick,
  size = 'md',
  className,
}: MobileMenuButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const barSizes = {
    sm: 'w-4',
    md: 'w-5',
    lg: 'w-6',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center rounded-lg transition-colors',
        'text-zinc-400 hover:text-white hover:bg-zinc-800',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        sizeClasses[size],
        className
      )}
      aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
      aria-expanded={isOpen}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Top bar */}
        <span
          className={cn(
            'block h-0.5 bg-current rounded-full transition-all duration-300',
            barSizes[size],
            isOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'
          )}
        />
        {/* Middle bar */}
        <span
          className={cn(
            'block h-0.5 bg-current rounded-full transition-all duration-300',
            barSizes[size],
            isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          )}
        />
        {/* Bottom bar */}
        <span
          className={cn(
            'block h-0.5 bg-current rounded-full transition-all duration-300',
            barSizes[size],
            isOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-1'
          )}
        />
      </div>
    </button>
  )
}

export default MobileMenuButton
