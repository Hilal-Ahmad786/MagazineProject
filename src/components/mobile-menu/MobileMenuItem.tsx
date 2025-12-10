// src/components/mobile-menu/MobileMenuItem.tsx
// Individual menu item with animation support

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface MobileMenuItemProps {
  href: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  delay?: number
  isVisible?: boolean
  className?: string
}

export function MobileMenuItem({
  href,
  label,
  icon,
  onClick,
  delay = 0,
  isVisible = true,
  className,
}: MobileMenuItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 py-4 px-2 border-b border-zinc-800/50',
        'text-2xl font-medium transition-all duration-300',
        'hover:text-primary hover:pl-4',
        isActive ? 'text-primary' : 'text-zinc-300',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
      }}
    >
      {icon && (
        <span className="w-6 h-6 flex items-center justify-center text-zinc-500">
          {icon}
        </span>
      )}
      <span>{label}</span>
      {isActive && (
        <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
      )}
    </Link>
  )
}

export default MobileMenuItem
