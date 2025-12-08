import { Metadata } from 'next'
import { AuthorApplicationForm } from '@/components/forms/AuthorApplicationForm'

export const metadata: Metadata = {
  title: 'Yazar Ol | Mazhar Dergisi',
  description: 'Mazhar Dergisi ailesine katılın. Yazılarınızı binlerce okuyucuyla paylaşın.',
}

export default function AuthorApplicationPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-bold uppercase tracking-wider mb-6">
              Başvuru
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              YAZAR OL
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Mazhar Dergisi ailesine katılmak, düşüncelerinizi ve yazılarınızı 
              binlerce okuyucuyla paylaşmak ister misiniz?
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: 'Geniş Kitle',
                description: 'Yazılarınız binlerce okuyucuya ulaşsın'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ),
                title: 'Editöryal Destek',
                description: 'Deneyimli editörlerimizden geri bildirim alın'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Topluluk',
                description: 'Yazar topluluğumuza katılın'
              },
            ].map((benefit, index) => (
              <div key={index} className="p-6 bg-gray-900 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-gray-900 p-8 md:p-12">
            <h2 className="text-2xl font-black mb-8">BAŞVURU FORMU</h2>
            <AuthorApplicationForm />
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black mb-8 text-center">SIKÇA SORULAN SORULAR</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Başvurular nasıl değerlendiriliyor?',
                  a: 'Editör ekibimiz tüm başvuruları 2 hafta içinde değerlendirir. Örnek yazılarınız ve ilgi alanlarınız göz önünde bulundurulur.'
                },
                {
                  q: 'Yazarlara ödeme yapılıyor mu?',
                  a: 'Şu an için gönüllülük esasına dayalı çalışıyoruz. Ancak yazarlarımıza geniş bir okuyucu kitlesi ve editöryal destek sunuyoruz.'
                },
                {
                  q: 'Hangi konularda yazabilirim?',
                  a: 'Edebiyat, felsefe, sanat, toplum, şehir, estetik ve düşünce alanlarında yazılarınızı bekliyoruz.'
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-gray-900 border-l-4 border-yellow-400">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
