import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | Mazhar Dergisi',
  description: 'Mazhar Dergisi web sitesi kullanım şartları ve koşulları.',
};

export default function KullanimSartlariPage() {
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
              <FileText className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-white">Kullanım Şartları</h1>
          </div>

          <p className="text-neutral-400 mb-8">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-yellow max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Kabul</h2>
              <p className="text-neutral-300 leading-relaxed">
                Mazhar Dergisi web sitesini kullanarak, bu kullanım şartlarını kabul etmiş sayılırsınız.
                Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Fikri Mülkiyet</h2>
              <p className="text-neutral-300 leading-relaxed">
                Web sitemizdeki tüm içerikler (yazılar, görseller, tasarım, logo vb.) Mazhar Dergisi&apos;nin
                veya ilgili yazarların fikri mülkiyetindedir. İzinsiz kopyalama, çoğaltma veya dağıtım yasaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Kullanıcı Davranışı</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Web sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
              </p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>Yasalara ve düzenlemelere uymak</li>
                <li>Diğer kullanıcılara saygılı davranmak</li>
                <li>Yanıltıcı veya zararlı içerik paylaşmamak</li>
                <li>Spam veya reklam amaçlı içerik paylaşmamak</li>
                <li>Siteye zarar verebilecek eylemlerden kaçınmak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. İçerik Paylaşımı</h2>
              <p className="text-neutral-300 leading-relaxed">
                Yorum veya başvuru yoluyla paylaştığınız içerikler, Mazhar Dergisi tarafından
                yayınlanabilir, düzenlenebilir veya kaldırılabilir. Paylaştığınız içeriklerin
                sorumluluğu size aittir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Sorumluluk Reddi</h2>
              <p className="text-neutral-300 leading-relaxed">
                Web sitemizdeki içerikler bilgilendirme amaçlıdır. İçeriklerin doğruluğu, güncelliği
                veya eksiksizliği konusunda garanti verilmemektedir. Sitemizin kullanımından
                doğabilecek zararlardan Mazhar Dergisi sorumlu tutulamaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Bağlantılar</h2>
              <p className="text-neutral-300 leading-relaxed">
                Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin
                içeriklerinden veya gizlilik uygulamalarından sorumlu değiliz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Değişiklikler</h2>
              <p className="text-neutral-300 leading-relaxed">
                Bu kullanım şartları önceden haber vermeksizin değiştirilebilir. Değişiklikler
                yayınlandığı anda yürürlüğe girer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. İletişim</h2>
              <p className="text-neutral-300 leading-relaxed">
                Sorularınız için{' '}
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
