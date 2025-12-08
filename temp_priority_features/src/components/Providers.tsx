'use client'

import { ReactNode } from 'react'
import { SearchProvider } from '@/contexts/SearchContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ReadingListProvider } from '@/contexts/ReadingListContext'
import { CommentsProvider } from '@/contexts/CommentsContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <SearchProvider>
        <ReadingListProvider>
          <CommentsProvider>
            {children}
          </CommentsProvider>
        </ReadingListProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}
