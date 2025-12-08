import { HeroSection } from '@/components/home/HeroSection'
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
  const quote = await getRandomQuote()
  const latestIssue = await getLatestIssue()
  const featuredArticles = await getFeaturedArticles(5)
  const authors = await getAllAuthors()

  return (
    <main className="min-h-screen">
      {latestIssue && quote && (
        <HeroSection
          quote={quote}
          latestIssueNumber={latestIssue.number}
        />
      )}

      {latestIssue && <LatestIssue issue={latestIssue} />}

      <FeaturedArticles articles={featuredArticles} />

      <AuthorsSection authors={authors} />

      <NewsletterSection />
    </main>
  )
}
