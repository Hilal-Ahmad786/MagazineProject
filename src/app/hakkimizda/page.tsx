import { Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { getFeaturedAuthors } from '@/lib/data/authors'
import { AUTHOR_ROLE_LABELS } from '@/types/author'

export const metadata: Metadata = {
  title: 'Hakkımızda | Mazhar Dergisi',
  description: 'Mazhar Dergisi - Aylık düşünce ve edebiyat dergisi. Misyonumuz, vizyonumuz ve ekibimiz hakkında.',
}

export default async function AboutPage() {
  const founders = await getFeaturedAuthors(4)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-32 pb-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              currentColor 2px,
              currentColor 4px
            )`
          }} />
        </div>

        <div className="px-6 md:px-12 relative z-10">
          <div className="max-w-[1200px] mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-bold uppercase tracking-wider mb-8">
              Hakkımızda
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              VAROLUŞUN İZİNDE<br />
              <span className="text-yellow-400">TAZELENİŞ</span> VE<br />
              ANLAM ARAYIŞI
            </h1>

            <div className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed space-y-6 text-left md:text-center">
              <p>
                Mazhar, insanın kendini keşfetme yolculuğunda bir yol arkadaşıdır. Zamanın akışında yitirilen anlamları yeniden bulmak, hayata dair derin bir bakış kazanmak için açılmış bir kapıdır. Her yeni yıl, her yeni başlangıç, yalnızca bir değişim değil; daha anlamlı bir hayat arayışında içsel bir yenilenme fırsatıdır.
              </p>
              <p>
                Mazhar, bu yenilenmenin ve anlam arayışının sembolüdür. Mazhar, insan olmanın getirdiği sorumluluğu, yaşamın hikmetini ve kendi içsel bütünlüğümüzü bulma çabasını hatırlatır. Bu yolculuk, sadece dışsal bir arayış değil, zihinsel ve ruhsal bir derinleşmeyi hedefler.
              </p>
              <p>
                Hayata dair farklı bakış açıları, sorgulamalar, felsefi düşünceler ve manevi yönelimler, Mazhar’da kendine yer bulur. Her sayfasında hayatın farklı yönlerini ele alan Mazhar, okurlarıyla birlikte anlamlı bir yolculuğa çıkar. Kendini yenilemek, yeni bakış açıları kazanmak, dünya ve insanlık için daha derin bir anlayış geliştirmek isteyenler için bir rehberdir.
              </p>
              <p>
                Her anı bilinçle yaşamaya ve her fırsatı yeni bir başlangıç olarak değerlendirmeye davet eder. Mazhar, sadece bir dergi değil; çağımızın değişen yüzünde kalıcı bir anlam arayışının simgesidir. Her sayfasında okuyucusuna taze bir bakış açısı, ilham ve içsel keşiflerin kapılarını açar.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="p-8 md:p-12 bg-black border-l-4 border-yellow-400">
              <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4 block">
                Misyonumuz
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                DÜŞÜNDÜRMEK,<br />SORGULATMAK
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Okuyucularımıza sadece içerik sunmak değil, onları düşünmeye,
                sorgulamaya ve kendi perspektiflerini geliştirmeye teşvik etmek.
                Her yazımız, her sayımız bu amaca hizmet eder. Kalıpların dışına
                çıkmak, alışılmışın ötesine bakmak için buradayız.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 md:p-12 bg-black border-l-4 border-white">
              <span className="text-white text-sm font-bold uppercase tracking-widest mb-4 block">
                Vizyonumuz
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                KÖPRÜ KURMAK,<br />BİRLEŞTİRMEK
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Farklı düşüncelerin, disiplinlerin ve nesillerin buluştuğu bir
                platform olmak. Geleneksel ile moderni, yerel ile evrenseli,
                akademik ile popüleri harmanlayarak yeni bir söylem alanı
                yaratmak istiyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4 block">
              Değerlerimiz
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              BİZİ BİZ YAPAN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Özgün Düşünce',
                description: 'Klişelerden uzak, özgün ve derinlikli içerikler üretiyoruz.'
              },
              {
                number: '02',
                title: 'Eleştirel Bakış',
                description: 'Her konuya eleştirel ve sorgulayıcı bir perspektifle yaklaşıyoruz.'
              },
              {
                number: '03',
                title: 'Estetik Hassasiyet',
                description: 'İçerik kadar sunum da önemli. Her detayda estetiği gözetiyoruz.'
              },
              {
                number: '04',
                title: 'Toplumsal Sorumluluk',
                description: 'Yazılarımızla topluma değer katmayı hedefliyoruz.'
              },
            ].map((value) => (
              <div
                key={value.number}
                className="group p-8 bg-gray-800 hover:bg-yellow-400 transition-all duration-500"
              >
                <span className="text-6xl font-black text-yellow-400 group-hover:text-black transition-colors">
                  {value.number}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-3 group-hover:text-black transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 group-hover:text-black/70 transition-colors">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4 block">
              Hikayemiz
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              YOLCULUĞUMUZ
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  year: '2024',
                  title: 'Kuruluş',
                  description: 'Mazhar Dergisi, bir grup edebiyat ve düşünce tutkunu tarafından kuruldu. İlk sayımız "Gurbet" temasıyla yayınlandı.'
                },
                {
                  year: '2024',
                  title: 'Dijital Dönüşüm',
                  description: 'Web sitemizi yeniledik ve dijital varlığımızı güçlendirdik. Okuyucularımıza daha iyi bir deneyim sunmaya başladık.'
                },
                {
                  year: '2025',
                  title: 'Büyüme',
                  description: 'Yazar kadromuzu genişlettik, yeni temalar keşfettik. Okuyucu kitlemiz her geçen gün büyüyor.'
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <span className="text-yellow-400 font-bold text-lg">{item.year}</span>
                    <h3 className="text-2xl font-black mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-yellow-400 rounded-full md:-translate-x-1/2 mt-2" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founders */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4 block">
              Ekibimiz
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              ARKASINDAKI İSİMLER
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Mazhar Dergisi&apos;ni hayata geçiren ve her sayıda emeği geçen değerli ekibimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {founders.map((author) => (
              <Link
                key={author.id}
                href={`${ROUTES.AUTHORS}/${author.slug}`}
                className="group block text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-800 text-yellow-400 text-4xl font-bold">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-yellow-400 text-4xl font-bold">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                  {author.name}
                </h3>
                <p className="text-gray-500 text-sm">{AUTHOR_ROLE_LABELS[author.role]}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={ROUTES.AUTHORS}
              className="inline-block px-8 py-4 bg-gray-800 text-white font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              Tüm Yazarları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-6 md:px-12 bg-yellow-400">
        <div className="max-w-[1000px] mx-auto text-center">
          <svg className="w-16 h-16 mx-auto mb-8 text-black/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight mb-8">
            &quot;Edebiyat, insanın kendini ve dünyayı anlamasının en güzel yoludur.&quot;
          </blockquote>
          <cite className="text-black/60 text-lg font-bold not-italic">
            — Mazhar Dergisi Manifestosu
          </cite>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4 block">
                İletişim
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                BİZE ULAŞIN
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Sorularınız, önerileriniz veya iş birliği teklifleriniz için
                bize her zaman ulaşabilirsiniz.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:iletisim@mazhardergisi.com"
                  className="flex items-center gap-4 text-lg hover:text-yellow-400 transition-colors"
                >
                  <span className="w-12 h-12 flex items-center justify-center bg-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  iletisim@mazhardergisi.com
                </a>

                <div className="flex items-center gap-4 text-lg text-gray-400">
                  <span className="w-12 h-12 flex items-center justify-center bg-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  İstanbul, Türkiye
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 md:p-12">
              <h3 className="text-2xl font-black mb-6">Yazar Olmak İster misiniz?</h3>
              <p className="text-gray-400 mb-8">
                Mazhar Dergisi ailesine katılmak, düşüncelerinizi ve yazılarınızı
                paylaşmak isterseniz bizimle iletişime geçin.
              </p>
              <Link
                href={ROUTES.GUEST_AUTHOR}
                className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
              >
                Başvuru Yap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
