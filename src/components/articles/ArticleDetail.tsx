import Link from 'next/link'
import { getRoleLabel } from '@/lib/constants/roles'
import { Article } from '@/types'
import { ROUTES } from '@/lib/constants/routes'
import { formatDate } from '@/lib/utils/date'
import { ShareButtons } from '@/components/share/ShareButtons'
import { ShareTrigger } from '@/components/share/ShareTrigger'
import { ReadingListButton } from '@/components/reading-list/ReadingListButton'
import { CommentSection } from '@/components/comments/CommentSection'
import ReadingProgressBar from '@/components/reading-progress/ReadingProgressBar'
import ReadingProgressCircle from '@/components/reading-progress/ReadingProgressCircle'
import ReadingStats from '@/components/reading-progress/ReadingStats'

interface ArticleDetailProps {
  article: Article
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const articleUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${ROUTES.ARTICLES}/${article.slug}`
    : `https://mazhardergisi.com${ROUTES.ARTICLES}/${article.slug}`

  return (
    <>
      <ReadingProgressBar showAfterScroll={100} variant="primary" />
      <ReadingProgressCircle showAfterScroll={300} scrollToTop />

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

          {/* Subtitle (using excerpt as fallback) */}
          {(article.excerpt) && (
            <p className="text-xl md:text-2xl text-yellow-400/80 mb-8">
              {article.excerpt}
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
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-yellow-400 transition-colors">
                      {article.author.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {getRoleLabel(article.author.role)}
                    </p>
                  </div>
                </Link>
              )}

              {/* Date & Reading Time */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {article.date && (
                  <time dateTime={article.date}>
                    {formatDate(article.date, 'long')}
                  </time>
                )}
                <span>•</span>
                <ReadingStats readingTime={article.readTime} variant="inline" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShareTrigger
                url={articleUrl}
                title={article.title}
                variant="icon"
                size="md"
              />
              {/* Add to List Button */}
              <ReadingListButton article={article as unknown as Article} />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="mb-12 -mx-6 md:-mx-12 flex justify-center bg-black/20 rounded-xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-h-[500px] object-cover object-center"
            />
          </div>
        )}

        {/* Content */}
        {Array.isArray(article.content) ? (
          <div className="space-y-6">
            {article.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-gray-300 leading-relaxed text-lg">
                    {block.content}
                  </p>
                )
              }
              if (block.type === 'image') {
                // Determine layout based on aspect ratio clues or explicitly
                // For now, heuristic: vertical images (often sketches) get smaller width
                // We'll trust the user's intent about "vertical ones" being too big
                const isVertical = block.caption?.toLowerCase().includes('şehir hayatının karmaşası') ||
                  block.caption?.toLowerCase().includes('şehir insanı')

                return (
                  <figure
                    key={index}
                    className={`
                        my-6 relative
                        ${isVertical ? 'md:float-right md:ml-6 md:w-1/4' : 'md:float-left md:mr-6 md:w-2/5'}
                        w-full max-w-[80%] mx-auto md:max-w-none
                      `}
                  >
                    <img
                      src={block.src}
                      alt={block.alt || ''}
                      className="w-full h-auto rounded-xl shadow-lg border border-gray-800/50"
                    />
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }
              return null
            })}
          </div>
        ) : (
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
        )}

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
            <ShareButtons title={article.title} url={articleUrl} showCopy={true} />
          </div>
        </footer>

        {/* Comments Section */}
        <CommentSection articleId={article.id} />
      </article >
    </>
  )
}
