// src/components/footer/FooterLinks.tsx
// Footer navigation links

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LinkGroup {
  title: string
  links: {
    label: string
    href: string
    external?: boolean
  }[]
}

interface FooterLinksProps {
  groups?: LinkGroup[]
  className?: string
}

const defaultGroups: LinkGroup[] = [
  {
    title: 'Keşfet',
    links: [
      { label: 'Yazılar', href: '/yazilar' },
      { label: 'Yazarlar', href: '/yazarlar' },
      { label: 'Sayılar', href: '/sayilar' },
      { label: 'Kategoriler', href: '/kategoriler' },
      { label: 'Arşiv', href: '/arsiv' },
    ],
  },
  {
    title: 'Dergi',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Ekibimiz', href: '/ekip' },
      { label: 'İletişim', href: '/iletisim' },
      { label: 'Yazar Ol', href: '/yazar-basvurusu' },
      { label: 'Reklam', href: '/reklam' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { label: 'Gizlilik Politikası', href: '/gizlilik' },
      { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
      { label: 'Çerez Politikası', href: '/cerezler' },
      { label: 'KVKK', href: '/kvkk' },
    ],
  },
]

export function FooterLinks({
  groups = defaultGroups,
  className,
}: FooterLinksProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-8', className)}>
      {groups.map((group) => (
        <div key={group.title}>
          <h4 className="font-semibold text-white mb-4">{group.title}</h4>
          <ul className="space-y-3">
            {group.links.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default FooterLinks
