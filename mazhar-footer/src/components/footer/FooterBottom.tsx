// src/components/footer/FooterBottom.tsx
// Footer bottom bar with copyright and links

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterBottomProps {
  variant?: 'default' | 'simple'
  className?: string
}

export function FooterBottom({
  variant = 'default',
  className,
}: FooterBottomProps) {
  const currentYear = new Date().getFullYear()

  // Simple variant
  if (variant === 'simple') {
    return (
      <div className={cn('text-center', className)}>
        <p className="text-sm text-zinc-500">
          © {currentYear} Mazhar Dergisi. Tüm hakları saklıdır.
        </p>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn('border-t border-zinc-800', className)}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-zinc-500">
            <span>© {currentYear} Mazhar Dergisi.</span>
            <span className="hidden sm:inline">•</span>
            <span>Tüm hakları saklıdır.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/gizlilik"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Gizlilik
            </Link>
            <Link
              href="/kullanim-sartlari"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Şartlar
            </Link>
            <Link
              href="/cerezler"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Çerezler
            </Link>
          </div>

          {/* Made with */}
          <div className="flex items-center gap-1.5 text-sm text-zinc-600">
            <span>Made with</span>
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>in İstanbul</span>
          </div>
        </div>

        {/* Scroll to top */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Başa Dön</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
