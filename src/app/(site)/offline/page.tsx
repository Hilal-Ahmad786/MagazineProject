// src/app/offline/page.tsx
// Offline fallback page

'use client'

import Link from 'next/link'



export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Offline Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Çevrimdışısınız
        </h1>

        {/* Description */}
        <p className="text-zinc-400 mb-8">
          İnternet bağlantınız yok gibi görünüyor. Lütfen bağlantınızı kontrol edin ve tekrar deneyin.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-6 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            Tekrar Dene
          </button>

          <Link
            href="/"
            className="block w-full py-3 px-6 border border-zinc-800 text-zinc-300 font-medium rounded-xl hover:bg-zinc-900 hover:text-white transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>

        {/* Cached Content Info */}
        <div className="mt-12 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-3 text-left">
            <svg
              className="w-6 h-6 text-primary flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-medium text-white text-sm">
                Önbelleğe Alınmış İçerikler
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Daha önce ziyaret ettiğiniz sayfalar çevrimdışı kullanılabilir.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  )
}
