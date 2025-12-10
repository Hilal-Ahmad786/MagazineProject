import { Metadata } from 'next'
import { NewsletterForm } from '@/components/newsletter'

export const metadata: Metadata = {
    title: 'Bülten | Mazhar Dergisi',
    description: 'Mazhar Dergisi bültenine abone olun, en yeni içerikleri kaçırmayın.',
}

export default function NewsletterPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
                    Mazhar Bülten
                </h1>
                <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                    Edebiyat, kültür ve sanat dünyasından en son haberler, özel içerikler ve
                    seçkiler her hafta e-posta kutunuzda.
                </p>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                    <div className="max-w-md mx-auto">
                        <NewsletterForm size="lg" />
                        <p className="mt-4 text-sm text-zinc-500">
                            Spam yok, sadece kaliteli içerik. İstediğiniz zaman abonelikten çıkabilirsiniz.
                        </p>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Haftalık Seçkiler</h3>
                        <p className="text-zinc-400 text-sm">
                            Haftanın en çok okunan yazıları ve editörün seçtikleri.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Erken Erişim</h3>
                        <p className="text-zinc-400 text-sm">
                            Yeni sayılar ve özel içeriklere herkesten önce erişim şansı.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Özel İndirimler</h3>
                        <p className="text-zinc-400 text-sm">
                            Basılı dergi aboneliği ve etkinliklerde özel indirimler.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
