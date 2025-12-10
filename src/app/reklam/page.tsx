import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Megaphone, Users, Eye, BookOpen, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reklam | Mazhar Dergisi',
  description: 'Mazhar Dergisi reklam ve sponsorluk fırsatları.',
};

export default function ReklamPage() {
  const stats = [
    { icon: Users, label: 'Aylık Ziyaretçi', value: '50.000+' },
    { icon: Eye, label: 'Sayfa Görüntüleme', value: '150.000+' },
    { icon: BookOpen, label: 'Yayınlanan Yazı', value: '500+' },
  ];

  const adFormats = [
    {
      title: 'Banner Reklam',
      description: 'Ana sayfa ve yazı sayfalarında banner reklam alanları',
      price: 'Aylık ₺2.500\'den başlayan fiyatlar',
    },
    {
      title: 'Sponsorlu İçerik',
      description: 'Markanız için özel hazırlanmış editoryal içerik',
      price: 'İçerik başına ₺5.000\'den başlayan fiyatlar',
    },
    {
      title: 'Bülten Sponsorluğu',
      description: 'E-posta bültenimizde sponsorlu alan',
      price: 'Bülten başına ₺1.500\'den başlayan fiyatlar',
    },
    {
      title: 'Sayı Sponsorluğu',
      description: 'Dergi sayısının ana sponsoru olun',
      price: 'Sayı başına ₺10.000\'den başlayan fiyatlar',
    },
  ];

  return (
    <main className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-2xl mb-6">
              <Megaphone className="w-12 h-12 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Reklam & Sponsorluk
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Türkiye'nin önde gelen edebiyat ve kültür platformunda markanızı tanıtın
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-neutral-900 rounded-2xl border border-neutral-800"
              >
                <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Target Audience */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Hedef Kitlemiz</h2>
            <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800">
              <p className="text-neutral-300 leading-relaxed mb-4">
                Mazhar Dergisi okuyucuları, edebiyat, sanat ve kültüre ilgi duyan, eğitimli ve 
                bilinçli tüketicilerden oluşmaktadır. Okuyucularımızın büyük çoğunluğu:
              </p>
              <ul className="grid md:grid-cols-2 gap-3 text-neutral-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  25-45 yaş aralığında
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Üniversite mezunu
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Orta-üst gelir grubunda
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Büyük şehirlerde yaşayan
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Kitap ve dergi okuma alışkanlığına sahip
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Kültür-sanat etkinliklerine katılan
                </li>
              </ul>
            </div>
          </section>

          {/* Ad Formats */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Reklam Formatları</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {adFormats.map((format) => (
                <div
                  key={format.title}
                  className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-yellow-500/50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{format.title}</h3>
                  <p className="text-neutral-400 mb-4">{format.description}</p>
                  <p className="text-yellow-500 font-semibold">{format.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-8 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-2xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Reklam Vermek İster misiniz?
            </h2>
            <p className="text-neutral-300 mb-6 max-w-xl mx-auto">
              Detaylı bilgi ve fiyat teklifi almak için bizimle iletişime geçin. 
              Size özel çözümler sunalım.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              İletişime Geç
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
