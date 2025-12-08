'use client'

import { useState, useEffect } from 'react'
import { StatsCard } from './StatsCard'

interface StatsData {
  overview: {
    totalArticles: number
    totalAuthors: number
    totalIssues: number
    totalViews: number
  }
  themes: Record<string, number>
  monthlyArticles: Record<string, number>
  topAuthors: Array<{ name: string; count: number }>
}

export function StatsDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-900 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!stats) return null

  const { overview, themes, topAuthors } = stats

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam Yazı"
          value={overview.totalArticles}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatsCard
          title="Toplam Yazar"
          value={overview.totalAuthors}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Toplam Sayı"
          value={overview.totalIssues}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatsCard
          title="Toplam Görüntüleme"
          value={overview.totalViews.toLocaleString('tr-TR')}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Themes Distribution */}
        <div className="bg-gray-900 p-6">
          <h3 className="text-lg font-bold mb-4">Tema Dağılımı</h3>
          <div className="space-y-3">
            {Object.entries(themes)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 6)
              .map(([theme, count]) => {
                const percentage = Math.round((count / overview.totalArticles) * 100)
                return (
                  <div key={theme}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{theme}</span>
                      <span className="text-gray-500">{count} yazı</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Top Authors */}
        <div className="bg-gray-900 p-6">
          <h3 className="text-lg font-bold mb-4">En Aktif Yazarlar</h3>
          <div className="space-y-4">
            {topAuthors.map((author, index) => (
              <div key={author.name} className="flex items-center gap-4">
                <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-bold">{author.name}</p>
                  <p className="text-sm text-gray-500">{author.count} yazı</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
