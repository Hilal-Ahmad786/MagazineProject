import Link from 'next/link'
import { ArticleWithAuthor } from '@/lib/data/articles'
import { ROUTES } from '@/lib/constants/routes'
import { formatDate } from '@/lib/utils/date'
import { ShareButtons } from './ShareButtons'
import { AddToListButton } from '@/components/reading-list'
import { CommentSection } from '@/components/comments'

interface ArticleDetailProps {
  article: ArticleWithAuthor
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const articleUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${ROUTES.ARTICLES}/${article.slug}`
    : `https://mazhardergisi.com${ROUTES.ARTICLES}/${article.slug}`

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        {/* Theme & Issue */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {article.themeIds && article.themeIds[0] && (
            <span className="px-4 py-2 bg-yellow-400 text-black text-sm font-bold uppercase tracking-wider">
              {article.themeIds[0]}
            </span>
          )}
          {article.issueId && (
            <Link
              href={`${ROUTES.ISSUES}/${article.issueId}`}
              className="px-4 py-2 bg-gray-800 text-gray-400 text-sm font-bold uppercase tracking-wider hover:bg-gray-700 transition-colors"
            >
              Sayı {article.issueId}
            </Link>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
          {article.title}
        </h1>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="text-xl md:text-2xl text-yellow-400/80 mb-8">
            {article.subtitle}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-800">
          <div className="flex flex-wrap items-center gap-6">
            {/* Author */}
            {article.author && (
              <Link
                href={`${ROUTES.AUTHORS}/${article.author.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                  {article.author.fullName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold group-hover:text-yellow-400 transition-colors">
                    {article.author.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {article.author.title}
                  </p>
                </div>
              </Link>
            )}

            {/* Date & Reading Time */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {article.publishDate && (
                <time dateTime={article.publishDate}>
                  {formatDate(article.publishDate, 'long')}
                </time>
              )}
              <span>•</span>
              <span>{article.readingTime} dk okuma</span>
            </div>
          </div>

          {/* Add to List Button */}
          <AddToListButton
            item={{
              id: article.id,
              type: 'article',
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt,
              image: article.featuredImage,
              author: article.author?.fullName
            }}
          />
        </div>
      </header>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="mb-12 -mx-6 md:-mx-12">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:text-white
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-blockquote:border-l-yellow-400 prose-blockquote:text-gray-400 prose-blockquote:italic
          prose-code:text-yellow-400 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
          prose-hr:border-gray-800
          mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-800 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Tags */}
          {article.themeIds && article.themeIds.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.themeIds.map((themeId) => (
                <span
                  key={themeId}
                  className="px-3 py-1 bg-gray-800 text-gray-400 text-sm"
                >
                  #{themeId}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <ShareButtons title={article.title} url={articleUrl} />
        </div>
      </footer>

      {/* Comments Section */}
      <CommentSection articleId={article.id} />
    </article>
  )
}
