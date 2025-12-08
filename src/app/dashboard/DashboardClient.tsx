'use client'

import { useAnalytics } from '@/contexts/AnalyticsContext'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ViewsChart } from '@/components/dashboard/ViewsChart'
import { TopArticles } from '@/components/dashboard/TopArticles'

export function DashboardClient() {
  const { data, getMostViewedArticles } = useAnalytics()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours} sa ${mins} dk`
    return `${mins} dk`
  }

  const articlesRead = Object.keys(data.articleStats).length
  const avgReadTime = articlesRead > 0 
    ? Math.round(data.totalReadTime / articlesRead)
    : 0

  // Get articles with stats for TopArticles
  const topArticleIds = getMostViewedArticles(5)
  const topArticles = topArticleIds.map(id => {
    const stats = data.articleStats[id]
    return {
      id,
      title: `Yazı ${id.slice(0, 8)}...`, // You'd fetch real titles from your data
      slug: id,
      views: stats?.views || 0,
      readTime: stats?.readTime || 0,
    }
  })

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam Görüntülenme"
          value={data.totalViews}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <StatsCard
          title="Okunan Yazı"
          value={articlesRead}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatsCard
          title="Toplam Okuma Süresi"
          value={formatTime(data.totalReadTime)}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Ort. Okuma Süresi"
          value={formatTime(avgReadTime)}
          subtitle="yazı başına"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViewsChart data={data.visitHistory} />
        <TopArticles articles={topArticles} />
      </div>

      {/* Empty State */}
      {data.totalViews === 0 && (
        <div className="text-center py-16 bg-gray-900">
          <svg className="w-20 h-20 mx-auto mb-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-2xl font-bold mb-4">Henüz veri yok</h3>
          <p className="text-gray-500 mb-6">
            Yazıları okumaya başladığınızda istatistikleriniz burada görünecek.
          </p>
          <a
            href="/yazilar"
            className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors"
          >
            Yazıları Keşfet
          </a>
        </div>
      )}
    </div>
  )
}
