import Link from 'next/link'
import { Article } from '@/types'
import { ROUTES } from '@/lib/constants/routes'
import { formatDate } from '@/lib/utils/date'

interface AuthorArticlesProps {
  articles: Article[]
  authorName: string
}

export function AuthorArticles({ articles, authorName }: AuthorArticlesProps) {
  if (!articles || articles.length === 0) {
    return (
      <section>
        <h2 className="text-3xl md:text-4xl font-black mb-8">
          YAZILAR
        </h2>
        <p className="text-gray-400">Henüz yazı bulunmuyor.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-black mb-8">
        {authorName.toUpperCase()}&apos;İN YAZILARI
      </h2>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`${ROUTES.ARTICLES}/${article.slug}`}
            className="group block"
          >
            <article className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 flex overflow-hidden">
              {/* Yellow accent bar */}
              <div className="w-1 bg-yellow-400 flex-shrink-0" />

              {/* Image */}
              <div className="w-40 md:w-56 flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-500 relative overflow-hidden hidden sm:block">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-black text-black/20">M</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                {/* Theme tag */}
                {article.themeIds && article.themeIds[0] && (
                  <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                    {article.themeIds[0]}
                  </span>
                )}

                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {article.title}
                </h3>

                {article.excerpt && (
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                  {article.date && (
                    <time dateTime={article.date}>
                      {formatDate(article.date, 'short')}
                    </time>
                  )}
                  <span>•</span>
                  <span>{article.readTime} dk okuma</span>
                  {article.viewCount && article.viewCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{article.viewCount} görüntülenme</span>
                    </>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center px-8 text-gray-600 group-hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
