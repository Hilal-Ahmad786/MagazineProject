import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/data/articles'
import { getAllAuthors } from '@/lib/data/authors'
import { getAllIssues } from '@/lib/data/issues'

export async function GET(request: NextRequest) {
  try {
    const [articles, authors, issues] = await Promise.all([
      getAllArticles(),
      getAllAuthors(),
      getAllIssues(),
    ])

    // Calculate stats
    const totalArticles = articles.length
    const totalAuthors = authors.length
    const totalIssues = issues.length

    // Calculate total views (from articles with view counts)
    const totalViews = articles.reduce((sum, a) => sum + (a.viewCount || 0), 0)

    // Get themes distribution
    const themeCounts: Record<string, number> = {}
    articles.forEach(article => {
      article.themeIds?.forEach(theme => {
        themeCounts[theme] = (themeCounts[theme] || 0) + 1
      })
    })

    // Get monthly article counts (last 6 months)
    const monthlyData: Record<string, number> = {}
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = date.toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' })
      monthlyData[key] = 0
    }

    articles.forEach(article => {
      const date = new Date(article.date)
      const key = date.toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' })
      if (monthlyData[key] !== undefined) {
        monthlyData[key]++
      }
    })

    // Top authors by article count
    const authorArticleCounts: Record<string, { name: string; count: number }> = {}
    articles.forEach(article => {
      if (article.author) {
        if (!authorArticleCounts[article.author.id]) {
          authorArticleCounts[article.author.id] = { name: article.author.name, count: 0 }
        }
        authorArticleCounts[article.author.id].count++
      }
    })

    const topAuthors = Object.values(authorArticleCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return NextResponse.json({
      overview: {
        totalArticles,
        totalAuthors,
        totalIssues,
        totalViews,
      },
      themes: themeCounts,
      monthlyArticles: monthlyData,
      topAuthors,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
