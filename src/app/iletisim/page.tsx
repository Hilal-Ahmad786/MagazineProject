import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'İletişim | Mazhar Dergisi',
  description: 'Bizimle iletişime geçin. Sorularınız, önerileriniz veya iş birliği teklifleriniz için buradayız.',
}

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'E-posta',
    value: 'iletisim@mazhardergisi.com',
    href: 'mailto:iletisim@mazhardergisi.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Adres',
    value: 'İstanbul, Türkiye',
  },
]

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/mazhardergisi',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/mazhardergisi',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/mazhardergisi',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-bold uppercase tracking-wider mb-6">
              İletişim
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              BİZE ULAŞIN
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için 
              bize her zaman ulaşabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-black mb-8">İLETİŞİM BİLGİLERİ</h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className="text-lg font-bold hover:text-yellow-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-bold">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <h3 className="text-lg font-bold mb-4">Sosyal Medya</h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-gray-800 text-white hover:bg-yellow-400 hover:text-black transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-12">
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600">İstanbul, Türkiye</p>
                    {/* Replace with actual Google Maps embed */}
                    {/* <iframe src="https://maps.google.com/..." /> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900 p-8 md:p-12">
              <h2 className="text-2xl font-black mb-8">MESAJ GÖNDERIN</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
