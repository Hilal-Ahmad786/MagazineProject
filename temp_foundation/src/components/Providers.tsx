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

// Import data for search (these would come from your data files)
// import articles from '@/data/articles.json'
// import authors from '@/data/authors.json'
// import issues from '@/data/issues.json'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Providers wrapper component
 * 
 * Wraps the application with all necessary context providers.
 * Order matters - outer providers are available to inner providers.
 * 
 * Provider hierarchy:
 * 1. LanguageProvider - i18n translations
 * 2. ThemeProvider - dark/light mode
 * 3. AnalyticsProvider - reading analytics
 * 4. SearchProvider - global search
 * 5. ReadingListProvider - saved articles
 * 6. CommentsProvider - article comments
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider defaultLocale="tr">
      <ThemeProvider defaultTheme="dark">
        <AnalyticsProvider>
          <SearchProvider
            // Pass your data here for search functionality
            // articles={articles}
            // authors={authors}
            // issues={issues}
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
