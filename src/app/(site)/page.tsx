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

  const heroArticle = featuredArticles[0] || latestArticles[0]

  return (
    <main className="min-h-screen">
      {latestIssue && quote && (
        <HeroFeatured
          article={heroArticle as unknown as import('@/types').Article}
          variant="fullscreen"
        />
      )}

      {latestIssue && <LatestIssue issue={latestIssue} />}

      <FeaturedArticles articles={featuredArticles} />

      <AuthorsSection authors={authors} />

      <NewsletterSection />
    </main>
  )
}
