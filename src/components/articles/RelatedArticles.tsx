import Link from 'next/link'
import { ArticleWithAuthor } from '@/lib/data/articles'
import { ROUTES } from '@/lib/constants/routes'

interface RelatedArticlesProps {
  articles: ArticleWithAuthor[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="mt-20 pt-20 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-black mb-10">
        İLGİLİ YAZILAR
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.id}
            href={`${ROUTES.ARTICLES}/${article.slug}`}
            className="group block"
          >
            <article className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 overflow-hidden">
              {/* Yellow accent bar */}
              <div className="h-1 bg-yellow-400" />

              {article.image && (
                <div className="relative h-48 mb-4 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Theme */}
                {article.themeIds && article.themeIds[0] && (
                  <span className="inline-block px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
                    {article.themeIds[0]}
                  </span>
                )}

                <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{article.author?.name || 'Yazar'}</span>
                  <span>•</span>
                  <span>{article.readTime} dk</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
