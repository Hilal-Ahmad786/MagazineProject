'use client'

import { Quote } from '@/types/quote'

interface HeroSectionProps {
  quote: Quote
  latestIssueNumber?: number
}

export function HeroSection({ quote, latestIssueNumber }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 to-black">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, #FFD700 30%, #FFD700 32%, transparent 32%),
            linear-gradient(-45deg, transparent 68%, #FFD700 68%, #FFD700 70%, transparent 70%)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8 animate-fade-in-up">
          DÜŞÜNCE
          <br />
          <span className="text-yellow-400">& EDEBİYAT</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {quote.text}
        </p>

        {quote.source && (
          <p className="text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            — {quote.source}
          </p>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <span className="text-yellow-400 text-xs tracking-widest font-bold">KAYDIRIN</span>
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
