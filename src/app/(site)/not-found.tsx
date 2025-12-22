import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-black text-yellow-400 mb-8">404</h1>
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          SAYFA BULUNAMADI
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href={ROUTES.HOME}
          className="inline-block px-10 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
