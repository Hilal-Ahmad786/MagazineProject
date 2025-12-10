import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/footer/Footer'
import { Providers } from '@/components/Providers'
import { SearchModal } from '@/components/search/SearchModal'
import { ReadingListDrawer } from '@/components/reading-list/ReadingListDrawer'
import { PWARegister } from '@/components/pwa/PWARegister'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { OfflineIndicator } from '@/components/pwa/OfflineIndicator'
import { NewsletterModal } from '@/components/newsletter/NewsletterModal'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { getAllArticles } from '@/lib/data/articles'
import { getAllAuthors } from '@/lib/data/authors'
import { getAllIssues } from '@/lib/data/issues'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mazhar Dergisi',
  description: 'Çağdaş edebiyat, kültür ve sanat dergisi',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Mazhar',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const articles = await getAllArticles()
  const authors = await getAllAuthors()
  const issues = await getAllIssues()

  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Providers articles={articles} authors={authors} issues={issues}>
          <PWARegister />
          <InstallPrompt variant="banner" delay={30000} />
          <OfflineIndicator variant="toast" />
          <NewsletterModal delay={60000} />
          <Header />
          {children}
          <Footer />
          <SearchModal />
          <ReadingListDrawer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
