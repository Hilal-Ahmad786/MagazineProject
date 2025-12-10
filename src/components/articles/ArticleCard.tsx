import Link from 'next/link'
import { ArticleWithAuthor } from '@/lib/data/articles'
import { ROUTES } from '@/lib/constants/routes'
import { formatDate } from '@/lib/utils/date'

interface ArticleCardProps {
  article: ArticleWithAuthor
  variant?: 'default' | 'large' | 'horizontal'
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isLarge = variant === 'large'
  const isHorizontal = variant === 'horizontal'

  if (isHorizontal) {
    return (
      <Link
        href={`${ROUTES.ARTICLES}/${article.slug}`}
        className="group block"
      >
        <article className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 flex overflow-hidden">
          {/* Yellow accent bar */}
          <div className="w-1 bg-yellow-400 flex-shrink-0" />

          {/* Image */}
          <div className="w-48 h-40 flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-500 relative overflow-hidden">
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
          <div className="flex-1 p-6">
            {/* Theme tag */}
            {article.themeIds && article.themeIds[0] && (
              <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider mb-3">
                {article.themeIds[0]}
              </span>
            )}

            <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
              {article.title}
            </h3>

            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {article.excerpt}
            </p>

            <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
              <span className="uppercase tracking-wider text-yellow-600 font-bold">
                {article.themeIds?.[0] || 'GENEL'}
              </span>
              <span>•</span>
              <span>{article.readTime} dk</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link
      href={`${ROUTES.ARTICLES}/${article.slug}`}
      className="group block h-full"
    >
      <article className={`bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden h-full flex flex-col ${isLarge ? '' : ''}`}>
        {/* Yellow accent bar */}
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />

        {/* Image */}
        <div className={`w-full bg-gradient-to-br from-yellow-400 to-yellow-500 relative overflow-hidden ${isLarge ? 'h-72' : 'h-48'}`}>
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className={`font-black text-black/20 ${isLarge ? 'text-8xl' : 'text-6xl'}`}>M</span>
            </div>
          )}

          {/* Theme tag overlay */}
          {article.themeIds && article.themeIds[0] && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-black text-yellow-400 text-xs font-bold uppercase tracking-wider">
              {article.themeIds[0]}
            </span>
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 flex flex-col ${isLarge ? 'p-8' : 'p-6'}`}>
          <h3 className={`font-bold mb-3 group-hover:text-yellow-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
            {article.title}
          </h3>

          {article.excerpt && isLarge && (
            <p className="text-yellow-400/80 text-sm mb-3">
              {article.excerpt}
            </p>
          )}

          <p className={`text-gray-400 mb-4 flex-1 ${isLarge ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider mt-auto">
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">
                  {article.author.name.charAt(0)}
                </div>
                <span>{article.author?.name}</span>
                <span>•</span>
                <span>{article.readTime} dk okuma</span>
              </div>
            )}

            <time className="text-gray-500 text-xs mt-2 block">
              {new Date(article.date).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}
