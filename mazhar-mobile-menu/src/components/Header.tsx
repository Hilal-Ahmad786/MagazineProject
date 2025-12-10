// src/components/Header.tsx
// Complete Header with all integrations including MobileMenu
// This replaces the previous Header component

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme'
import { SearchButton, SearchModal } from '@/components/search'
import { ReadingListToggle, ReadingListDrawer } from '@/components/reading-list'
import { MobileMenu, MobileMenuButton } from '@/components/mobile-menu'
import { useScrollPast } from '@/hooks'

const navigation = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Yazılar', href: '/yazilar' },
  { label: 'Yazarlar', href: '/yazarlar' },
  { label: 'Sayılar', href: '/sayilar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrolled = useScrollPast(50)

  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 shadow-lg'
            : 'bg-black/50 backdrop-blur-sm'
        )}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <span>MAZHAR</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search - Input style on desktop, icon on mobile */}
              <div className="hidden md:block">
                <SearchButton variant="input" size="md" />
              </div>
              <div className="md:hidden">
                <SearchButton variant="icon" size="md" />
              </div>

              {/* Reading List */}
              <ReadingListToggle variant="icon" size="md" showCount />

              {/* Theme Toggle - Hidden on mobile (shown in menu) */}
              <div className="hidden lg:block">
                <ThemeToggle variant="icon" size="md" />
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <MobileMenuButton
                  isOpen={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  size="md"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        showThemeToggle
        showNewsletter
      />

      {/* Global Modals/Drawers */}
      <SearchModal />
      <ReadingListDrawer />
    </>
  )
}

export default Header
