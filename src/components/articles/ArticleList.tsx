'use client'

import { useState, useMemo } from 'react'
import { Article } from '@/types'
import { Theme } from '@/types/theme'
import { ArticleCard } from './ArticleCard'
import { ArticleFilters } from './ArticleFilters'

interface ArticleListProps {
  articles: Article[]
  themes: Theme[]
}

export function ArticleList({ articles, themes }: ArticleListProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(9)

  // Filter articles by theme
  const filteredArticles = useMemo(() => {
    if (!selectedTheme) return articles
    return articles.filter(article =>
      article.themeIds?.includes(selectedTheme)
    )
  }, [articles, selectedTheme])

  // Get visible articles
  const visibleArticles = filteredArticles.slice(0, visibleCount)
  const hasMore = visibleCount < filteredArticles.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  const handleThemeChange = (themeId: string | null) => {
    setSelectedTheme(themeId)
    setVisibleCount(9) // Reset pagination on filter change
  }

  return (
    <div>
      {/* Filters */}
      <ArticleFilters
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
      />

      {/* Results count */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm">
          <span className="text-yellow-400 font-bold">{filteredArticles.length}</span> yazı bulundu
          {selectedTheme && (
            <button
              onClick={() => handleThemeChange(null)}
              className="ml-3 text-yellow-400 hover:underline"
            >
              Filtreyi temizle
            </button>
          )}
        </p>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant={index === 0 && !selectedTheme ? 'large' : 'default'}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="px-10 py-4 bg-gray-800 text-white font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Daha Fazla Göster
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">Bu filtreye uygun yazı bulunamadı.</p>
          <button
            onClick={() => handleThemeChange(null)}
            className="text-yellow-400 hover:underline"
          >
            Tüm yazıları göster
          </button>
        </div>
      )}
    </div>
  )
}
