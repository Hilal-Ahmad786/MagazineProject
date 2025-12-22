// src/components/footer/Footer.tsx
// Main footer component

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { FooterLinks } from './FooterLinks'
import { FooterNewsletter } from './FooterNewsletter'
import { FooterSocial } from './FooterSocial'
import { FooterBottom } from './FooterBottom'

interface FooterProps {
  variant?: 'default' | 'minimal' | 'centered'
  showNewsletter?: boolean
  className?: string
}

export function Footer({
  variant = 'default',
  showNewsletter = true,
  className,
}: FooterProps) {
  // Minimal variant
  if (variant === 'minimal') {
    return (
      <footer className={cn('border-t border-zinc-800 bg-black', className)}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="relative h-20 w-32 md:w-40">
              <Image
                src="/images/logo.png"
                alt="Mazhar Dergisi"
                fill
                className="object-contain"
              />
            </Link>
            <FooterSocial variant="inline" />
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Mazhar Dergisi. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  // Centered variant
  if (variant === 'centered') {
    return (
      <footer className={cn('border-t border-zinc-800 bg-black', className)}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo */}
            <Link href="/" className="inline-block relative h-40 w-64 md:w-80 lg:w-96 mb-6">
              <Image
                src="/images/logo.png"
                alt="Mazhar Dergisi"
                fill
                className="object-contain"
              />
            </Link>

            {/* Tagline */}
            <p className="text-zinc-400 mb-8">
              Çağdaş edebiyat, kültür ve sanat dergisi
            </p>

            {/* Newsletter */}
            {showNewsletter && (
              <div className="mb-10">
                <FooterNewsletter variant="inline" />
              </div>
            )}

            {/* Social Links */}
            <div className="mb-10">
              <FooterSocial variant="icons" />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
              <Link href="/yazilar" className="text-zinc-400 hover:text-white transition-colors">
                Yazılar
              </Link>
              <Link href="/yazarlar" className="text-zinc-400 hover:text-white transition-colors">
                Yazarlar
              </Link>
              <Link href="/sayilar" className="text-zinc-400 hover:text-white transition-colors">
                Sayılar
              </Link>
              <Link href="/hakkimizda" className="text-zinc-400 hover:text-white transition-colors">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-zinc-400 hover:text-white transition-colors">
                İletişim
              </Link>
              <Link href="/sitemap.xml" className="text-zinc-400 hover:text-white transition-colors">
                Site Haritası
              </Link>
            </div>

            {/* Copyright */}
            <FooterBottom variant="simple" />
          </div>
        </div>
      </footer>
    )
  }

  // Default variant - full featured
  return (
    <footer className={cn('border-t border-zinc-800 bg-black', className)}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block relative h-28 w-48 md:w-64 lg:w-80 mb-4">
              <Image
                src="/images/logo.png"
                alt="Mazhar Dergisi"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-zinc-400 mb-6 max-w-sm">
              Çağdaş edebiyat, kültür ve sanat dergisi. 2020&apos;den beri özgün içerikler,
              derinlikli analizler ve yaratıcı bakış açıları sunuyoruz.
            </p>
            <FooterSocial variant="icons" />
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5">
            <FooterLinks />
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            {showNewsletter && <FooterNewsletter />}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <FooterBottom />
    </footer>
  )
}

export default Footer
