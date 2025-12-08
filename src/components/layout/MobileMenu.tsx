'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'
import { useSearch } from '@/contexts/SearchContext'

const navItems = [
  { label: 'Ana Sayfa', href: ROUTES.HOME },
  { label: 'Yazılar', href: ROUTES.ARTICLES },
  { label: 'Yazarlar', href: ROUTES.AUTHORS },
  { label: 'Sayılar', href: ROUTES.ISSUES },
  { label: 'Hakkımızda', href: ROUTES.ABOUT },
]

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/mazhardergisi', icon: 'twitter' },
  { label: 'Instagram', href: 'https://instagram.com/mazhardergisi', icon: 'instagram' },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { openSearch } = useSearch()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSearchClick = () => {
    setIsOpen(false)
    setTimeout(() => openSearch(), 100)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={isOpen}
      >
        <span 
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`} 
        />
        <span 
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0 scale-0' : ''
          }`} 
        />
        <span 
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`} 
        />
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900 z-[55] lg:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <span className="text-2xl font-black text-yellow-400">MAZHAR.</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-8">
            <ul className="space-y-2 px-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-4 text-2xl font-bold transition-colors ${
                        isActive 
                          ? 'text-yellow-400' 
                          : 'text-white hover:text-yellow-400'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="ml-3 inline-block w-2 h-2 bg-yellow-400" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Search Button */}
            <div className="px-6 mt-8">
              <button
                onClick={handleSearchClick}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gray-800 text-white font-bold hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ara
              </button>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800">
            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white hover:bg-yellow-400 hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  {social.icon === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={ROUTES.GUEST_AUTHOR}
              className="block w-full py-3 bg-yellow-400 text-black text-center font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors"
            >
              Yazar Ol
            </Link>

            {/* Copyright */}
            <p className="text-gray-600 text-xs text-center mt-4">
              © 2024 Mazhar Dergisi
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
