'use client'

// ÖRNEK: Header'a ThemeToggle eklemek için bu dosyayı referans alın
// Mevcut Header.tsx dosyanızı bu şekilde güncelleyin

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearch } from '@/contexts/SearchContext'
import { ThemeToggle } from '@/components/theme'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { openSearch } = useSearch()

  // ... mevcut kodlar ...

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-4xl font-black text-yellow-400">
            MAZHAR.
          </Link>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* ✨ YENİ: Theme Toggle Ekleyin */}
            <ThemeToggle variant="icon" />
            
            {/* Search button */}
            <button onClick={openSearch}>
              {/* ... */}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* ✨ YENİ: Mobilde de Theme Toggle */}
            <ThemeToggle variant="icon" />
            {/* ... */}
          </div>
        </div>
      </div>
    </header>
  )
}
