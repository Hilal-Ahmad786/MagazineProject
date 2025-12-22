import { HeroFeatured } from '@/components/hero/HeroFeatured'
import { LatestIssue } from '@/components/home/LatestIssue'
import { FeaturedArticles } from '@/components/home/FeaturedArticles'
import { AuthorsSection } from '@/components/home/AuthorsSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { getRandomQuote } from '@/lib/data/quotes'
import { getFeaturedArticles, getLatestArticles } from '@/lib/data/articles'
import { getLatestIssue } from '@/lib/data/issues'
import { getAllAuthors } from '@/lib/data/authors'

export default async function Home() {
  // Fetch data
  // Fetch data in parallel to avoid waterfalls and timeouts
  const [quote, latestIssue, featuredArticles, authors, latestArticles] = await Promise.all([
    getRandomQuote(),
    getLatestIssue(),
    getFeaturedArticles(5),
    getAllAuthors(),
    getLatestArticles(5)
  ])

  // Get articles specifically from the latest issue if available
  let heroArticles: import('@/types').Article[] = []
  if (latestIssue) {
    // We need to import this function
    const { getArticlesByIssue } = await import('@/lib/data/articles')
    const issueArticles = await getArticlesByIssue(latestIssue.id)
    heroArticles = issueArticles.slice(0, 5) // Top 5
  }

  // Fallback to latest global articles if no issue articles (or no issue)
  if (heroArticles.length === 0) {
    heroArticles = latestArticles
  }

  const heroArticle = featuredArticles[0] || latestArticles[0]

  return (
    <main className="min-h-screen">
      {latestIssue && quote && (
        <HeroFeatured
          article={heroArticle}
          variant="fullscreen"
        />
      )}

      {latestIssue && <LatestIssue issue={latestIssue} />}

      <FeaturedArticles articles={heroArticles} />

      <AuthorsSection authors={authors} />

      <NewsletterSection />
    </main>
  )
}
