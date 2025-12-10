import Link from 'next/link'
import { ArticleWithAuthor } from '@/lib/data/articles'
import { ROUTES } from '@/lib/constants/routes'

interface FeaturedArticlesProps {
  articles: ArticleWithAuthor[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <section className="bg-gray-800 py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-center">
          <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
            KEŞFET
          </span>
        </h2>

        <div className="grid grid-cols-12 gap-5">
          {articles.map((article, index) => {
            // First article spans 6 columns (large)
            const colSpan = index === 0 ? 'col-span-12 lg:col-span-6' : 'col-span-12 md:col-span-6 lg:col-span-4'

            return (
              <Link
                key={article.id}
                href={`${ROUTES.ARTICLES}/${article.slug}`}
                className={`${colSpan} group`}
              >
                <div className="bg-gray-700 hover:bg-gray-600 transition-all duration-300 hover:scale-105 hover:z-10 relative overflow-hidden h-full">
                  {/* Yellow accent bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />

                  <div className="p-8 md:p-10">
                    <h3 className={`font-bold mb-4 group-hover:text-yellow-400 transition-colors ${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                      }`}>
                      {article.title}
                    </h3>
                    {article.image && (
                      <div className="relative h-full min-h-[200px] md:min-h-full mb-4">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        {article.excerpt && (
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}</div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider">
                      <span>{article.author?.name || 'Yazar'}</span>
                      <span>•</span>
                      <span>{article.readTime} dk</span>
                      {article.themeIds && article.themeIds[0] && (
                        <>
                          <span>•</span>
                          <span className="text-yellow-600 font-bold">{article.themeIds[0]}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={ROUTES.ARTICLES}
            className="inline-block px-10 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
