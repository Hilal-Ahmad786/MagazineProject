import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Mazhar Dergisi',
  description: 'Mazhar Dergisi KVKK kapsamında kişisel verilerin işlenmesi hakkında aydınlatma metni.',
};

export default function KVKKPage() {
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
              <Scale className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-white">KVKK Aydınlatma Metni</h1>
          </div>

          <p className="text-neutral-400 mb-8">
            6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-yellow max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Veri Sorumlusu</h2>
              <p className="text-neutral-300 leading-relaxed">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz
                veri sorumlusu sıfatıyla Mazhar Dergisi tarafından aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. İşlenen Kişisel Veriler</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Web sitemiz aracılığıyla aşağıdaki kişisel veriler işlenmektedir:
              </p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>Kimlik bilgileri (ad, soyad)</li>
                <li>İletişim bilgileri (e-posta adresi, telefon numarası)</li>
                <li>İşlem güvenliği bilgileri (IP adresi, log kayıtları)</li>
                <li>Pazarlama bilgileri (bülten tercihleri)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>Web sitesi hizmetlerinin sunulması</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
                <li>Bülten ve güncellemelerin gönderilmesi</li>
                <li>Yazar başvurularının değerlendirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>İstatistiksel analizlerin yapılması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Kişisel Verilerin Aktarılması</h2>
              <p className="text-neutral-300 leading-relaxed">
                Kişisel verileriniz, yasal zorunluluklar ve hizmet gereksinimleri çerçevesinde,
                yetkili kamu kurum ve kuruluşlarına, hizmet sağlayıcılarına aktarılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
              <p className="text-neutral-300 leading-relaxed">
                Kişisel verileriniz, web sitesi formları, e-posta ve çerezler aracılığıyla
                elektronik ortamda toplanmaktadır. Verileriniz, açık rızanız veya KVKK&apos;nın 5. ve 6.
                maddelerinde belirtilen hukuki sebeplere dayanılarak işlenmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. İlgili Kişinin Hakları</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. İletişim</h2>
              <p className="text-neutral-300 leading-relaxed">
                KVKK kapsamındaki haklarınızı kullanmak için{' '}
                <Link href="/iletisim" className="text-yellow-500 hover:text-yellow-400">
                  iletişim sayfamız
                </Link>{' '}
                üzerinden veya info@mazhardergisi.com adresinden bize ulaşabilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
