'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SearchButton } from '@/components/search/SearchButton'
import { SearchModal } from '@/components/search/SearchModal'
import { ReadingListToggle } from '@/components/reading-list/ReadingListToggle'
import { ReadingListDrawer } from '@/components/reading-list/ReadingListDrawer'
import { MobileMenu } from '@/components/mobile-menu/MobileMenu'
import { MobileMenuButton } from '@/components/mobile-menu/MobileMenuButton'
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
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <div className="relative h-24 w-40 md:w-56 lg:w-72">
                <Image
                  src="/images/logo.png"
                  alt="Mazhar Dergisi"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

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

            <div className="flex items-center gap-1 md:gap-2">
              <Link
                href="/admin/login"
                className="hidden lg:flex items-center justify-center px-4 py-2 text-sm font-bold text-neutral-900 bg-yellow-500 hover:bg-yellow-400 rounded-full transition-colors mr-2"
              >
                Giriş Yap
              </Link>
              <div className="hidden md:block">
                <SearchButton variant="input" size="md" />
              </div>
              <div className="md:hidden">
                <SearchButton variant="icon" size="md" />
              </div>

              <ReadingListToggle variant="icon" size="md" showCount />

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

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        showNewsletter
      />

      <SearchModal />
      <ReadingListDrawer />
    </>
  )
}

export default Header
