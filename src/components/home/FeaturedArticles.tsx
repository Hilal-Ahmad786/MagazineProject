'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Article } from '@/types'
import { ROUTES } from '@/lib/constants/routes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturedArticlesProps {
  articles: Article[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Responsive slides per view (conceptually, simplified here to show one 'main' view or we implement a real multi-item carousel)
  // Given user request for "carousel", a horizontal slider is best.
  // Let's implement a card slider showing 1 card on mobile, 2 on tablet, 3 on desktop.
  // BUT simplified: Just one simple carousel-like view or scrolling container. 
  // Let's do a proper transform-based slider.

  const [slidesToShow, setSlidesToShow] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesToShow(3)
      else if (window.innerWidth >= 768) setSlidesToShow(2)
      else setSlidesToShow(1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, articles.length - slidesToShow)

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }

  return (
    <section className="bg-neutral-950 py-20 px-6 md:px-12 overflow-hidden border-y border-white/5">
      <div className="max-w-[1600px] mx-auto relative">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent uppercase tracking-tight">
            Keşfet
          </h2>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-3 rounded-full border border-white/10 hover:bg-white text-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxIndex}
              className="p-3 rounded-full border border-white/10 hover:bg-white text-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
          >
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Link
                  href={`${ROUTES.ARTICLES}/${article.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-neutral-900 h-full rounded-none border border-white/5 overflow-hidden relative transition-colors duration-300 hover:border-white/20">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-800" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4">
                        {article.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-neutral-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-wider">
                        <span>{article.author?.name || 'Yazar'}</span>
                        <span className="w-1 h-1 bg-neutral-500 rounded-full" />
                        <span>{article.readTime} DK</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={ROUTES.ARTICLES}
            className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-wider hover:text-white transition-colors group"
          >
            <span>Tüm Yazıları Gör</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
