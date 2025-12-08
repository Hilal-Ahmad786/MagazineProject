import Link from 'next/link'
import { ArticleWithAuthor } from '@/lib/data/articles'
import { ROUTES } from '@/lib/constants/routes'
import { formatDate } from '@/lib/utils/date'

interface AuthorArticlesProps {
  articles: ArticleWithAuthor[]
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
                {article.featuredImage ? (
                  <img
                    src={article.featuredImage}
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
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {/* Theme tag */}
                  {article.themeIds && article.themeIds[0] && (
                    <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                      {article.themeIds[0]}
                    </span>
                  )}

                  {/* Date */}
                  {article.publishDate && (
                    <span className="text-xs text-gray-500">
                      {formatDate(article.publishDate, 'short')}
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {article.title}
                </h3>

                {article.subtitle && (
                  <p className="text-gray-400 text-sm mb-2">
                    {article.subtitle}
                  </p>
                )}

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 hidden md:block">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
                  <span>{article.readingTime} dk okuma</span>
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
