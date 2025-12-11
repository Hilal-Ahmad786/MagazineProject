import Link from 'next/link'
import NextImage from 'next/image'
import { Issue } from '@/types/issue'
import { ROUTES } from '@/lib/constants/routes'

interface LatestIssueProps {
  issue: Issue
}

export function LatestIssue({ issue }: LatestIssueProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Content Side */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-black">
        <div className="max-w-xl">
          <div className="text-xs text-yellow-400 font-bold tracking-[0.3em] mb-6 uppercase">
            Son Sayımız
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8">
            {issue.theme?.toUpperCase() || 'GENEL'}
            <br />
            <span className="text-gray-400">SAYISI</span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed mb-10">
            {issue.description}
          </p>

          <Link
            href={`${ROUTES.ISSUES}/${issue.id}`}
            className="inline-block px-10 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 hover:translate-x-1"
          >
            Sayıyı İncele
          </Link>
        </div>
      </div>

      {/* Image Side */}
      <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-screen bg-gray-100">
        {issue.coverImage ? (
          <div className="relative w-full h-full min-h-[500px] lg:min-h-screen">
            <NextImage
              src={issue.coverImage}
              alt={`Sayı ${issue.number} - ${issue.title || 'Kapak'}`}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for text readability if needed, or purely aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[180px] md:text-[220px] font-black text-black/10 leading-none text-center">
                {issue.number}
                <br />
                <span className="text-[40px] md:text-[60px]">{issue.theme?.toUpperCase() || 'GENEL'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
