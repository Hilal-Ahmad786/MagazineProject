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
    <section className="bg-gray-800 py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black">
            <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              KEŞFET
            </span>
          </h2>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-4 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxIndex}
              className="p-4 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
            >
              <ChevronRight size={24} />
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
                  <div className="bg-gray-700 h-full rounded-2xl overflow-hidden relative transition-transform duration-300 group-hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4">
                        {article.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
                        <span>{article.author?.name || 'Yazar'}</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
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
        <div className="text-center mt-16">
          <Link
            href={ROUTES.ARTICLES}
            className="inline-block px-10 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
