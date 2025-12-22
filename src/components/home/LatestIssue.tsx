import Link from 'next/link'
import NextImage from 'next/image'
import { Issue } from '@/types/issue'
import { ROUTES } from '@/lib/constants/routes'

interface LatestIssueProps {
  issue: Issue
}

export function LatestIssue({ issue }: LatestIssueProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-black border-y border-white/5">
      {/* Content Side */}
      <div className="flex flex-col justify-center px-6 md:px-12 py-12 lg:py-16 bg-black order-2 lg:order-1">
        <div className="max-w-xl mx-auto lg:mx-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-yellow-400" />
            <span className="text-xs text-yellow-400 font-bold tracking-[0.3em] uppercase">
              Son Sayımız
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            {issue.title?.toUpperCase()}
          </h2>

          <div className="flex items-center gap-3 text-lg text-gray-400 mb-6">
            <span>Sayı {issue.number}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span>{issue.publishMonth || 'Yeni'}</span>
          </div>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 line-clamp-3">
            {issue.description || issue.editorsNote || 'Mevcut en son sayımızı keşfedin. Güncel edebiyat, kültür ve sanat dünyasından seçkiler.'}
          </p>

          <Link
            href={`${ROUTES.ISSUES}/${issue.id}`}
            className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-wider hover:text-white transition-colors group"
          >
            <span>Sayıyı İncele</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Image Side */}
      <div className="relative h-[400px] lg:h-[500px] w-full order-1 lg:order-2">
        {issue.coverImage ? (
          <div className="relative w-full h-full">
            <NextImage
              src={issue.coverImage}
              alt={`Sayı ${issue.number}`}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/20" />
          </div>
        ) : (
          <div className="relative bg-neutral-900 w-full h-full flex items-center justify-center">
            <div className="text-8xl font-black text-white/5">
              {issue.number}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
