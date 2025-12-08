'use client'

import { Theme } from '@/types/theme'
import { cn } from '@/lib/utils/cn'

interface ArticleFiltersProps {
  themes: Theme[]
  selectedTheme: string | null
  onThemeChange: (themeId: string | null) => void
}

export function ArticleFilters({ themes, selectedTheme, onThemeChange }: ArticleFiltersProps) {
  return (
    <div className="mb-12">
      {/* Theme Tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onThemeChange(null)}
          className={cn(
            'px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300',
            selectedTheme === null
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          )}
        >
          Tümü
        </button>
        
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={cn(
              'px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300',
              selectedTheme === theme.id
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            )}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  )
}
