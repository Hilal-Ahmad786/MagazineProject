import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Folder, ArrowRight } from 'lucide-react';


import { getAllCategories } from '@/lib/data/categories';

export const metadata: Metadata = {
  title: 'Kategoriler | Mazhar Dergisi',
  description: 'Mazhar Dergisi yazı kategorileri - Şiir, hikaye, deneme ve daha fazlası.',
};

export default async function KategorilerPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-2xl mb-6">
              <Folder className="w-12 h-12 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kategoriler
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Yazılarımızı kategorilere göre keşfedin
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/yazilar?kategori=${category.slug}`}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${category.color} border border-white/5 hover:border-yellow-500/30 hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-2`}>
                      {category.name}
                    </h2>
                    <p className="text-neutral-400 mb-4">
                      {category.description || "Bu kategori için henüz açıklama girilmemiş."}
                    </p>
                    <span className="text-sm text-neutral-500">
                      {category.articleCount} yazı
                    </span>
                  </div>
                  <ArrowRight className={`w-6 h-6 text-white/50 group-hover:text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                </div>
              </Link>
            ))}
            {categories.length === 0 && (
              <div className="col-span-2 text-center text-neutral-500 py-12">
                Henüz kategori bulunmuyor.
              </div>
            )}
          </div>

          {/* All Articles CTA */}
          <div className="text-center mt-12">
            <Link
              href="/yazilar"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Tüm Yazıları Gör
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
