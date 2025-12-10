// src/components/hero/HeroStats.tsx
// Hero section with statistics

'use client'

import { cn } from '@/lib/utils'

interface Stat {
  value: string | number
  label: string
  suffix?: string
  prefix?: string
}

interface HeroStatsProps {
  title: string
  subtitle?: string
  description?: string
  stats: Stat[]
  variant?: 'default' | 'cards' | 'inline'
  backgroundImage?: string
  className?: string
}

export function HeroStats({
  title,
  subtitle,
  description,
  stats,
  variant = 'default',
  backgroundImage,
  className,
}: HeroStatsProps) {
  // Cards variant
  if (variant === 'cards') {
    return (
      <section className={cn('relative py-16 md:py-24', className)}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-zinc-400 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <section className={cn('relative py-12 border-y border-zinc-800', className)}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className={cn('relative py-16 md:py-24 overflow-hidden', className)}>
      {/* Background */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {subtitle && (
              <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-zinc-400">
                {description}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 rounded-2xl',
                  index % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-800/30'
                )}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroStats
