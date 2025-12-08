import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-400 mt-20">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-yellow-400 mb-4">
              MAZHAR.
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Aylık Düşünce ve Edebiyat Dergisi. Her sayı bir tema etrafında örülü düşündürücü yazılar, derinlemesine analizler ve çağdaş tartışmalar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
              Keşfet
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.ARTICLES} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Yazılar
                </Link>
              </li>
              <li>
                <Link href={ROUTES.AUTHORS} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Yazarlar
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ISSUES} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Sayılar
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
              Bağlantılar
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  E-posta
                </a>
              </li>
              <li>
                <Link href={ROUTES.GUEST_AUTHOR} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  Konuk Yazar Ol
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            © 2024 MAZHAR DERGİSİ • TÜM HAKLARI SAKLIDIR
          </p>
        </div>
      </div>
    </footer>
  )
}
