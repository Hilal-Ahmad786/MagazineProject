import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Mazhar Dergisi',
  description: 'Mazhar Dergisi çerez kullanımı hakkında bilgiler.',
};

export default function CerezlerPage() {
  return (
    <main className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <Cookie className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-white">Çerez Politikası</h1>
          </div>

          <p className="text-neutral-400 mb-8">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-yellow max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çerez Nedir?</h2>
              <p className="text-neutral-300 leading-relaxed">
                Çerezler, web sitelerinin bilgisayarınıza veya mobil cihazınıza kaydettiği küçük metin 
                dosyalarıdır. Çerezler, web sitesinin düzgün çalışmasını sağlamak, kullanıcı deneyimini 
                iyileştirmek ve site trafiğini analiz etmek için kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Kullandığımız Çerez Türleri</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">Zorunlu Çerezler</h3>
                  <p className="text-neutral-300">
                    Web sitesinin temel işlevlerini yerine getirmesi için gerekli olan çerezlerdir. 
                    Bu çerezler olmadan site düzgün çalışmaz.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">Performans Çerezleri</h3>
                  <p className="text-neutral-300">
                    Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir. 
                    Bu bilgiler, siteyi iyileştirmek için kullanılır.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">İşlevsellik Çerezleri</h3>
                  <p className="text-neutral-300">
                    Tercihlerinizi hatırlamamızı sağlayan çerezlerdir. Örneğin, tema tercihi veya 
                    okuma listesi gibi özellikler için kullanılır.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">Analitik Çerezler</h3>
                  <p className="text-neutral-300">
                    Google Analytics gibi hizmetler aracılığıyla site trafiğini analiz etmemizi 
                    sağlayan çerezlerdir.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çerezleri Yönetme</h2>
              <p className="text-neutral-300 leading-relaxed">
                Tarayıcınızın ayarlarından çerezleri kontrol edebilir, engelleyebilir veya silebilirsiniz. 
                Ancak, çerezleri devre dışı bırakmak sitenin bazı özelliklerinin düzgün çalışmamasına 
                neden olabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Üçüncü Taraf Çerezleri</h2>
              <p className="text-neutral-300 leading-relaxed">
                Web sitemizde Google Analytics gibi üçüncü taraf hizmetlerin çerezleri de kullanılmaktadır. 
                Bu hizmetlerin kendi çerez politikaları vardır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">İletişim</h2>
              <p className="text-neutral-300 leading-relaxed">
                Çerez politikamız hakkında sorularınız için{' '}
                <Link href="/iletisim" className="text-yellow-500 hover:text-yellow-400">
                  iletişim sayfamızı
                </Link>{' '}
                ziyaret edebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
