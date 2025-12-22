'use client'

export function OfflineClient() {
    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                    </svg>
                </div>

                <h1 className="text-4xl font-black mb-4">Çevrimdışısınız</h1>

                <p className="text-gray-400 text-lg mb-8">
                    İnternet bağlantınız yok gibi görünüyor. Lütfen bağlantınızı kontrol edin ve tekrar deneyin.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors"
                >
                    Tekrar Dene
                </button>

                <div className="mt-12 p-6 bg-gray-900 text-left">
                    <h2 className="font-bold mb-4">Çevrimdışı Okuma</h2>
                    <p className="text-gray-500 text-sm">
                        Daha önce ziyaret ettiğiniz yazılar önbellekte saklanıyor.
                        İnternet bağlantınız olmasa bile bu içeriklere erişebilirsiniz.
                    </p>
                </div>
            </div>
        </main>
    )
}
