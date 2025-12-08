import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'
import { SearchWrapper } from '@/components/search/SearchWrapper'
import { PWARegister, OfflineIndicator } from '@/components/pwa'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mazhar Dergisi - Düşünce ve Edebiyat',
  description: 'Aylık düşünce ve edebiyat dergisi',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mazhar Dergisi',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Providers>
          <PWARegister />
          <OfflineIndicator />
          <Header />
          {children}
          <Footer />
          <SearchWrapper />
        </Providers>
      </body>
    </html>
  )
}
