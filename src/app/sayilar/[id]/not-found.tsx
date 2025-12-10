import Link from 'next/link';
import { BookX, ArrowLeft, Home } from 'lucide-react';

export default function IssueNotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800">
              <BookX className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Sayı Bulunamadı
          </h1>
          <p className="text-neutral-400 text-lg mb-8">
            Aradığınız sayı mevcut değil veya kaldırılmış olabilir.
            Lütfen sayı arşivimize göz atın.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sayilar"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Sayı Arşivi
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-neutral-700"
            >
              <Home className="w-5 h-5" />
              Ana Sayfa
            </Link>
          </div>

          {/* Decorative Element */}
          <div className="mt-16 flex items-center justify-center gap-2 text-neutral-600">
            <span className="w-12 h-px bg-neutral-800" />
            <span className="text-sm">Mazhar Dergisi</span>
            <span className="w-12 h-px bg-neutral-800" />
          </div>
        </div>
      </div>
    </main>
  );
}
