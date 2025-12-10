// src/components/mobile-menu/MobileMenu.tsx
// Full-featured slide-in mobile menu

'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme'
import { MobileMenuItem } from './MobileMenuItem'

interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation?: NavigationItem[]
  socialLinks?: SocialLink[]
  showThemeToggle?: boolean
  showNewsletter?: boolean
  className?: string
}

// Default navigation
const defaultNavigation: NavigationItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Yazılar', href: '/yazilar' },
  { label: 'Yazarlar', href: '/yazarlar' },
  { label: 'Sayılar', href: '/sayilar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
]

// Default social links
const defaultSocialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/mazhardergisi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/mazhardergisi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@mazhardergisi',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      </svg>
    ),
  },
]

export function MobileMenu({
  isOpen,
  onClose,
  navigation = defaultNavigation,
  socialLinks = defaultSocialLinks,
  showThemeToggle = true,
  showNewsletter = true,
  className,
}: MobileMenuProps) {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose]
  )

  // Add/remove event listeners and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-sm',
          'bg-black border-l border-zinc-800 shadow-2xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <Link
            href="/"
            onClick={onClose}
            className="text-2xl font-bold text-primary"
          >
            MAZHAR
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Menüyü kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-88px)] overflow-y-auto">
          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-1">
              {navigation.map((item, index) => (
                <MobileMenuItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  onClick={onClose}
                  index={index}
                  className={cn(
                    isOpen && 'animate-in slide-in-from-right duration-300'
                  )}
                />
              ))}
            </div>

            {/* Special Links */}
            <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
              <Link
                href="/yazar-basvurusu"
                onClick={onClose}
                className="flex items-center gap-3 py-3 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="font-medium">Yazar Ol</span>
              </Link>
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-6 border-t border-zinc-800 space-y-6">
            {/* Theme Toggle */}
            {showThemeToggle && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Tema</span>
                <ThemeToggle variant="switch" size="sm" />
              </div>
            )}

            {/* Newsletter Mini */}
            {showNewsletter && (
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-sm text-zinc-400 mb-3">
                  Yeni içeriklerden haberdar ol
                </p>
                <Link
                  href="/bulten"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <span>Bültene abone ol</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-primary hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-zinc-600 text-center">
              © {new Date().getFullYear()} Mazhar Dergisi
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
