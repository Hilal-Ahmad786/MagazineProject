// src/components/hero/HeroSection.tsx
// Main hero section component with multiple variants

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  variant?: 'default' | 'centered' | 'split' | 'minimal' | 'video'
  title: string
  subtitle?: string
  description?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  backgroundImage?: string
  videoSrc?: string
  overlay?: boolean
  overlayOpacity?: number
  badge?: string
  className?: string
}

export function HeroSection({
  variant = 'default',
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  videoSrc,
  overlay = true,
  overlayOpacity = 60,
  badge,
  className,
}: HeroSectionProps) {
  // Centered variant
  if (variant === 'centered') {
    return (
      <section className={cn('relative min-h-[70vh] flex items-center justify-center', className)}>
        {/* Background */}
        {backgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            {overlay && (
              <div 
                className="absolute inset-0 bg-black" 
                style={{ opacity: overlayOpacity / 100 }}
              />
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl py-20">
          {badge && (
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
              {badge}
            </span>
          )}

          {subtitle && (
            <p className="text-primary font-medium mb-4 tracking-wide uppercase">
              {subtitle}
            </p>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    )
  }

  // Split variant (image left/right)
  if (variant === 'split') {
    return (
      <section className={cn('relative', className)}>
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              {badge && (
                <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                  {badge}
                </span>
              )}

              {subtitle && (
                <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">
                  {subtitle}
                </p>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {title}
              </h1>

              {description && (
                <p className="text-lg text-zinc-400 mb-8">
                  {description}
                </p>
              )}

              {(primaryAction || secondaryAction) && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {primaryAction && (
                    <Link
                      href={primaryAction.href}
                      className="px-6 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors text-center"
                    >
                      {primaryAction.label}
                    </Link>
                  )}
                  {secondaryAction && (
                    <Link
                      href={secondaryAction.href}
                      className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors text-center"
                    >
                      {secondaryAction.label}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              {backgroundImage && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={backgroundImage}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <section className={cn('relative py-16 md:py-24', className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {badge && (
              <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                {badge}
              </span>
            )}

            {subtitle && (
              <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">
                {subtitle}
              </p>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {description && (
              <p className="text-lg text-zinc-400">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Video variant
  if (variant === 'video' && videoSrc) {
    return (
      <section className={cn('relative min-h-[80vh] flex items-center', className)}>
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {overlay && (
            <div 
              className="absolute inset-0 bg-black" 
              style={{ opacity: overlayOpacity / 100 }}
            />
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            {badge && (
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/10">
                {badge}
              </span>
            )}

            {subtitle && (
              <p className="text-primary font-medium mb-4 tracking-wide uppercase">
                {subtitle}
              </p>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {description && (
              <p className="text-lg md:text-xl text-zinc-300 mb-10">
                {description}
              </p>
            )}

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryAction && (
                  <Link
                    href={primaryAction.href}
                    className="px-8 py-4 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors text-center"
                  >
                    {primaryAction.label}
                  </Link>
                )}
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="px-8 py-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10 text-center"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className={cn('relative min-h-[60vh] flex items-center', className)}>
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" 
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {badge && (
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-primary text-black rounded-full">
              {badge}
            </span>
          )}

          {subtitle && (
            <p className="text-primary font-medium mb-3 tracking-wide uppercase">
              {subtitle}
            </p>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-lg text-zinc-300 mb-8">
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="px-6 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors text-center"
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10 text-center"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
