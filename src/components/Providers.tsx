'use client'

import { ReactNode } from 'react'
import { SearchProvider } from '@/contexts/SearchContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReadingListProvider } from '@/contexts/ReadingListContext'
import { CommentsProvider } from '@/contexts/CommentsContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { StatsProvider } from '@/contexts/StatsContext'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <StatsProvider>
          <AnalyticsProvider>
            <SearchProvider>
              <ReadingListProvider>
                <CommentsProvider>
                  {children}
                </CommentsProvider>
              </ReadingListProvider>
            </SearchProvider>
          </AnalyticsProvider>
        </StatsProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
