// src/components/hero/HeroSlider.tsx
// Hero slider/carousel component

'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn, formatDate } from '@/lib/utils'
import type { Article } from '@/types'

interface HeroSliderProps {
  articles: Article[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  showProgress?: boolean
  className?: string
}

export function HeroSlider({
  articles,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  showProgress = true,
  className,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const slideCount = articles.length

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount)
    setProgress(0)
  }, [slideCount])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount)
    setProgress(0)
  }, [slideCount])

  // Auto play
  useEffect(() => {
    if (!autoPlay || isPaused || slideCount <= 1) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext()
          return 0
        }
        return prev + (100 / (autoPlayInterval / 100))
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [autoPlay, isPaused, autoPlayInterval, goToNext, slideCount])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  if (!articles.length) return null

  const currentArticle = articles[currentIndex]

  return (
    <section
      className={cn('relative min-h-[70vh] md:min-h-[80vh]', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-end">
        <div className="container mx-auto px-4 pb-16 md:pb-20 pt-32">
          <div className="max-w-3xl">
            {/* Category */}
            {currentArticle.category && (
              <span
                className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-primary text-black rounded-full"
              >
                {currentArticle.category}
              </span>
            )}

            {/* Title */}
            <Link href={`/yazilar/${currentArticle.slug}`}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight hover:text-primary transition-colors">
                {currentArticle.title}
              </h2>
            </Link>

            {/* Excerpt */}
            {currentArticle.excerpt && (
              <p className="text-zinc-300 mb-6 line-clamp-2 text-lg">
                {currentArticle.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              {currentArticle.author && (
                <div className="flex items-center gap-2">
                  {currentArticle.author.avatar && (
                    <Image
                      src={currentArticle.author.avatar}
                      alt={currentArticle.author.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-white">{currentArticle.author.name}</span>
                </div>
              )}
              {currentArticle.date && (
                <span>{formatDate(currentArticle.date)}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && slideCount > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
            aria-label="Önceki"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
            aria-label="Sonraki"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots & Progress */}
      {(showDots || showProgress) && slideCount > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-3">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'relative h-1.5 rounded-full transition-all overflow-hidden',
                  index === currentIndex ? 'w-12 bg-white/30' : 'w-6 bg-white/20 hover:bg-white/30'
                )}
                aria-label={`Slide ${index + 1}`}
              >
                {showProgress && index === currentIndex && (
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-30">
        <span className="text-sm text-white/60 font-medium">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}

export default HeroSlider
