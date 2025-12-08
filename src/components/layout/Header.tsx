'use client'

import Link from 'next/link'
import { Navbar } from './Navbar'
import { MobileMenu } from './MobileMenu'
import { useState, useEffect } from 'react'
import { useSearch } from '@/contexts/SearchContext'
import { ThemeToggle } from '@/components/theme'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { openSearch } = useSearch()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openSearch])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className="px-6 md:px-12 py-4 md:py-6"
        style={{
          background: isScrolled
            ? 'rgba(0, 0, 0, 0.95)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)'
        }}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-4xl font-black text-yellow-400 tracking-tight hover:text-yellow-300 transition-colors"
          >
            MAZHAR.
          </Link>

          {/* Desktop Navigation */}
          <Navbar />

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle variant="icon" />

            {/* Search button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors group"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Keyboard shortcut hint */}
              <span className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-yellow-400/70">
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px]">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px]">K</kbd>
              </span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle variant="icon" />

            {/* Mobile Search button */}
            <button
              onClick={openSearch}
              className="p-2 text-white hover:text-yellow-400 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
