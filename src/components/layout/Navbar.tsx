'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { ROUTES } from '@/lib/constants/routes'

const navItems = [
  { href: ROUTES.ARTICLES, label: 'YAZILAR' },
  { href: ROUTES.AUTHORS, label: 'YAZARLAR' },
  { href: ROUTES.ISSUES, label: 'SAYILAR' },
  { href: ROUTES.ABOUT, label: 'HAKKIMIZDA' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-bold uppercase tracking-wider transition-colors',
            pathname === item.href
              ? 'text-yellow-400'
              : 'text-white hover:text-yellow-400'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
