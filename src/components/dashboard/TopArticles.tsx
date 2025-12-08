'use client'

import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

interface Article {
  id: string
  title: string
  slug: string
  views: number
  readTime: number
}

interface TopArticlesProps {
  articles: Article[]
}

export function TopArticles({ articles }: TopArticlesProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    if (mins < 60) return `${mins} dk`
    const hours = Math.floor(mins / 60)
    return `${hours} sa ${mins % 60} dk`
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gray-900 p-6">
        <h3 className="text-lg font-bold mb-4">En Çok Okunan Yazılar</h3>
        <div className="h-48 flex items-center justify-center text-gray-600">
          Henüz veri yok
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-6">
      <h3 className="text-lg font-bold mb-4">En Çok Okunan Yazılar</h3>
      
      <div className="space-y-3">
        {articles.slice(0, 5).map((article, index) => (
          <Link
            key={article.id}
            href={`${ROUTES.ARTICLES}/${article.slug}`}
            className="flex items-center gap-4 p-3 bg-gray-800 hover:bg-gray-700 transition-colors group"
          >
            <span className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-black font-black text-sm">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate group-hover:text-yellow-400 transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                <span>{article.views} görüntülenme</span>
                <span>{formatTime(article.readTime)} okuma</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
