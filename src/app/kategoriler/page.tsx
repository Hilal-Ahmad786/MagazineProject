import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Folder, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kategoriler | Mazhar Dergisi',
  description: 'Mazhar Dergisi yazı kategorileri - Şiir, hikaye, deneme ve daha fazlası.',
};

const categories = [
  {
    name: 'Şiir',
    slug: 'siir',
    description: 'Çağdaş ve klasik şiirler, şiir eleştirileri ve şiir üzerine yazılar',
    count: 45,
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
  },
  {
    name: 'Hikaye',
    slug: 'hikaye',
    description: 'Kısa öyküler, novellalar ve hikaye analizleri',
    count: 38,
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
  },
  {
    name: 'Deneme',
    slug: 'deneme',
    description: 'Edebiyat, kültür ve sanat üzerine denemeler',
    count: 52,
    color: 'from-green-500/20 to-green-500/5',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
  },
  {
    name: 'Eleştiri',
    slug: 'elestiri',
    description: 'Kitap, film ve sanat eleştirileri',
    count: 28,
    color: 'from-red-500/20 to-red-500/5',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
  },
  {
    name: 'Söyleşi',
    slug: 'soylesi',
    description: 'Yazar, şair ve sanatçılarla yapılan söyleşiler',
    count: 15,
    color: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
  },
  {
    name: 'Çeviri',
    slug: 'ceviri',
    description: 'Dünya edebiyatından çeviri eserler',
    count: 22,
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
  },
  {
    name: 'İnceleme',
    slug: 'inceleme',
    description: 'Kitap ve eser incelemeleri',
    count: 35,
    color: 'from-pink-500/20 to-pink-500/5',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
  },
  {
    name: 'Günlük',
    slug: 'gunluk',
    description: 'Günlük yazılar ve notlar',
    count: 18,
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
  },
];

export default function KategorilerPage() {
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
                className={`group p-6 rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor} hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold ${category.textColor} mb-2`}>
                      {category.name}
                    </h2>
                    <p className="text-neutral-400 mb-4">
                      {category.description}
                    </p>
                    <span className="text-sm text-neutral-500">
                      {category.count} yazı
                    </span>
                  </div>
                  <ArrowRight className={`w-6 h-6 ${category.textColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                </div>
              </Link>
            ))}
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
