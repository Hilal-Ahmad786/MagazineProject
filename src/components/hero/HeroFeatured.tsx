// src/components/hero/HeroFeatured.tsx
// Hero section featuring an article

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn, formatDate, getReadingTime } from '@/lib/utils'
import type { Article } from '@/types'

interface HeroFeaturedProps {
  article: Article
  variant?: 'fullscreen' | 'contained' | 'side-by-side'
  showExcerpt?: boolean
  showAuthor?: boolean
  showReadingTime?: boolean
  showDate?: boolean
  className?: string
}

export function HeroFeatured({
  article,
  variant = 'fullscreen',
  showExcerpt = true,
  showAuthor = true,
  showReadingTime = true,
  showDate = true,
  className,
}: HeroFeaturedProps) {
  const contentText = typeof article.content === 'string'
    ? article.content
    : article.content.map(b => b.content || '').join(' ')

  const readingTime = article.readTime ? `${article.readTime} dk okuma` : getReadingTime(contentText)

  // Side by side variant
  if (variant === 'side-by-side') {
    return (
      <section className={cn('relative', className)}>
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <Link
              href={`/yazilar/${article.slug}`}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 group"
            >
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
              )}
            </Link>

            {/* Content */}
            <div>
              {/* Category */}
              {article.category && (
                <span
                  className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-primary text-black rounded-full"
                >
                  {article.category}
                </span>
              )}

              {/* Title */}
              <Link href={`/yazilar/${article.slug}`}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight hover:text-primary transition-colors">
                  {article.title}
                </h1>
              </Link>

              {/* Excerpt */}
              {showExcerpt && article.excerpt && (
                <p className="text-lg text-zinc-400 mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                {showAuthor && article.author && (
                  <Link
                    href={`/yazarlar/${article.author.slug}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    {article.author.avatar && (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span>{article.author.name}</span>
                  </Link>
                )}
                {showDate && article.date && (
                  <span>{formatDate(article.date)}</span>
                )}
                {showReadingTime && (
                  <span>{readingTime} dk okuma</span>
                )}
              </div>

              {/* CTA */}
              <Link
                href={`/yazilar/${article.slug}`}
                className="inline-flex items-center gap-2 mt-6 text-primary hover:gap-3 transition-all"
              >
                <span className="font-medium">Yazıyı Oku</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Contained variant
  if (variant === 'contained') {
    return (
      <section className={cn('relative', className)}>
        <div className="container mx-auto px-4 py-8">
          <Link
            href={`/yazilar/${article.slug}`}
            className="block relative aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 group"
          >
            {/* Image */}
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
              {/* Category */}
              {article.category && (
                <span className="inline-block w-fit px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-primary text-black rounded-full">
                  {article.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl group-hover:text-primary transition-colors">
                {article.title}
              </h1>

              {/* Excerpt */}
              {showExcerpt && article.excerpt && (
                <p className="text-zinc-300 mb-4 line-clamp-2 max-w-2xl hidden md:block">
                  {article.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                {showAuthor && article.author && (
                  <div className="flex items-center gap-2">
                    {article.author.avatar && (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-white">{article.author.name}</span>
                  </div>
                )}
                {showDate && article.date && (
                  <span>{formatDate(article.date)}</span>
                )}
                {showReadingTime && (
                  <span>{readingTime} dk okuma</span>
                )}
              </div>
            </div>
          </Link>
        </div>
      </section>
    )
  }

  // Fullscreen variant (default)
  return (
    <section className={cn('relative min-h-[70vh] md:min-h-[80vh] flex items-end', className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-12 md:pb-16 lg:pb-20 pt-32">
        <div className="max-w-4xl">
          {/* Category */}
          {article.category && (
            <span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider bg-primary text-black rounded-full"
            >
              {article.category}
            </span>
          )}

          {/* Title */}
          <Link href={`/yazilar/${article.slug}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight hover:text-primary transition-colors">
              {article.title}
            </h1>
          </Link>

          {/* Excerpt */}
          {showExcerpt && article.excerpt && (
            <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            {showAuthor && article.author && (
              <Link
                href={`/yazarlar/${article.author.slug}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                {article.author.avatar && (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <span className="block text-white font-medium">{article.author.name}</span>
                </div>
              </Link>
            )}
            <div className="flex items-center gap-4">
              {showDate && article.date && (
                <span>{formatDate(article.date)}</span>
              )}
              {showReadingTime && (
                <span>{readingTime} dk okuma</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroFeatured
