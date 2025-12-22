'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileMenuItem } from './MobileMenuItem'

interface NavigationItem {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: NavigationItem[]
  showNewsletter?: boolean
  showThemeToggle?: boolean
}

export function MobileMenu({
  isOpen,
  onClose,
  navigation,
  showNewsletter = false,
  showThemeToggle = false,
}: MobileMenuProps) {
  // Prevent body scroll when menu is open
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-neutral-950 border-l border-neutral-800 shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <span className="text-lg font-bold text-white">Menü</span>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Menüyü kapat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navigation.map((item, index) => (
              <MobileMenuItem
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={onClose}
                delay={index * 50}
                isVisible={isOpen}
              />
            ))}
          </ul>
        </nav>

        {/* Newsletter CTA & Login */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800 bg-neutral-950 space-y-3">
          <Link
            href="/admin/login"
            onClick={onClose}
            className="block w-full py-3 px-4 bg-neutral-800 text-white hover:bg-neutral-700 font-bold text-center rounded-lg transition-colors border border-neutral-700"
          >
            Giriş Yap
          </Link>
          {showNewsletter && (
            <Link
              href="/bulten"
              onClick={onClose}
              className="block w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-bold text-center rounded-lg transition-colors"
            >
              Bültene Abone Ol
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default MobileMenu
