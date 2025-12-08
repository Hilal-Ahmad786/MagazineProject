import { SearchModal } from './SearchModal'
import { getAllArticles } from '@/lib/data/articles'
import { getAllAuthors } from '@/lib/data/authors'
import { getAllIssues } from '@/lib/data/issues'

export async function SearchWrapper() {
  const [articles, authors, issues] = await Promise.all([
    getAllArticles(),
    getAllAuthors(),
    getAllIssues(),
  ])

  // Transform data for search
  const searchableArticles = articles.map(article => ({
    type: 'article' as const,
    id: article.id,
    title: article.title,
    subtitle: article.subtitle,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content?.substring(0, 500), // Limit content length
  }))

  const searchableAuthors = authors.map(author => ({
    type: 'author' as const,
    id: author.id,
    title: author.fullName,
    subtitle: author.title,
    slug: author.slug,
    excerpt: author.shortBio,
  }))

  const searchableIssues = issues.map(issue => ({
    type: 'issue' as const,
    id: issue.id,
    title: `Sayı ${issue.number}: ${issue.theme}`,
    subtitle: issue.subtitle,
    theme: issue.theme,
    excerpt: issue.manifesto,
  }))

  return (
    <SearchModal 
      articles={searchableArticles}
      authors={searchableAuthors}
      issues={searchableIssues}
    />
  )
}
