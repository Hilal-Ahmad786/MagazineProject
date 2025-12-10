import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Mazhar Dergisi',
  description: 'Mazhar Dergisi gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.',
};

export default function GizlilikPage() {
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
              <Shield className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-white">Gizlilik Politikası</h1>
          </div>

          <p className="text-neutral-400 mb-8">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-yellow max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Genel Bakış</h2>
              <p className="text-neutral-300 leading-relaxed">
                Mazhar Dergisi olarak, ziyaretçilerimizin ve kullanıcılarımızın gizliliğine büyük önem veriyoruz. 
                Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde hangi bilgilerin toplandığını ve bu bilgilerin 
                nasıl kullanıldığını açıklamaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Toplanan Bilgiler</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Web sitemizi ziyaret ettiğinizde aşağıdaki bilgiler toplanabilir:
              </p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>IP adresi ve tarayıcı bilgileri</li>
                <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                <li>Bülten aboneliği için sağlanan e-posta adresi</li>
                <li>İletişim formu aracılığıyla gönderilen bilgiler</li>
                <li>Yazar başvurusu için sağlanan kişisel bilgiler</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Bilgilerin Kullanımı</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:
              </p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>Web sitesi deneyimini iyileştirmek</li>
                <li>Bülten ve güncellemeler göndermek</li>
                <li>İletişim taleplerine yanıt vermek</li>
                <li>İstatistiksel analizler yapmak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Çerezler</h2>
              <p className="text-neutral-300 leading-relaxed">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
                Çerezler hakkında daha fazla bilgi için{' '}
                <Link href="/cerezler" className="text-yellow-500 hover:text-yellow-400">
                  Çerez Politikası
                </Link>{' '}
                sayfamızı ziyaret edebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Üçüncü Taraf Hizmetler</h2>
              <p className="text-neutral-300 leading-relaxed">
                Web sitemizde Google Analytics gibi üçüncü taraf analiz hizmetleri kullanılmaktadır. 
                Bu hizmetler kendi gizlilik politikalarına tabidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Veri Güvenliği</h2>
              <p className="text-neutral-300 leading-relaxed">
                Kişisel verilerinizin güvenliği için endüstri standardı güvenlik önlemleri uygulanmaktadır. 
                Ancak, internet üzerinden veri iletiminin %100 güvenli olmadığını hatırlatmak isteriz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. İletişim</h2>
              <p className="text-neutral-300 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için{' '}
                <Link href="/iletisim" className="text-yellow-500 hover:text-yellow-400">
                  iletişim sayfamızdan
                </Link>{' '}
                bize ulaşabilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
