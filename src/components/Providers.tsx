// src/components/Providers.tsx
// Main providers wrapper that combines all contexts

'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SearchProvider } from '@/contexts/SearchContext'
import { ReadingListProvider } from '@/contexts/ReadingListContext'
import { CommentsProvider } from '@/contexts/CommentsContext'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

interface ProvidersProps {
  children: ReactNode
  articles: any[]
  authors: any[]
  issues: any[]
}

export function Providers({ children, articles, authors, issues }: ProvidersProps) {
  return (
    <LanguageProvider defaultLocale="tr">
      <ThemeProvider defaultTheme="dark">
        <AnalyticsProvider>
          <SearchProvider
            articles={articles}
            authors={authors}
            issues={issues}
          >
            <ReadingListProvider>
              <CommentsProvider>
                {children}
              </CommentsProvider>
            </ReadingListProvider>
          </SearchProvider>
        </AnalyticsProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default Providers
