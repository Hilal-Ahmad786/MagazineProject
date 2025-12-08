import { Metadata } from 'next'
import { DashboardClient } from './DashboardClient'

export const metadata: Metadata = {
  title: 'Okuma İstatistiklerim | Mazhar Dergisi',
  description: 'Kişisel okuma istatistiklerinizi görüntüleyin.',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-bold uppercase tracking-wider mb-6">
              Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              OKUMA İSTATİSTİKLERİM
            </h1>
            <p className="text-xl text-gray-400">
              Kişisel okuma alışkanlıklarınızı takip edin.
            </p>
          </div>

          <DashboardClient />
        </div>
      </div>
    </main>
  )
}
