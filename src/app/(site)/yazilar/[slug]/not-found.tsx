import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function ArticleNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-black text-yellow-400 mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-black mb-6">
          YAZI BULUNAMADI
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Aradığınız yazı mevcut değil veya kaldırılmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ROUTES.ARTICLES}
            className="px-8 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
          >
            Tüm Yazılar
          </Link>
          <Link
            href={ROUTES.HOME}
            className="px-8 py-4 bg-gray-800 text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-700 transition-all duration-300"
          >
            Ana Sayfa
          </Link>
        </div>
      </div>
    </main>
  )
}
