import { Article } from '@/types/article'
import { Author } from '@/types/author'
import articlesData from '@/data/articles.json'
import authorsData from '@/data/authors.json'

// Extended Article type with populated author
export interface ArticleWithAuthor extends Omit<Article, 'featuredImage'> {
  featuredImage?: string
  author?: {
    id: string
    fullName: string
    slug: string
    profileImage?: string
    title?: string
    shortBio?: string
  }
}

// Helper function to populate author data
function populateAuthor(article: any): ArticleWithAuthor {
  const author = authorsData.authors.find((a: any) => a.id === article.authorId)
  return {
    ...article,
    featuredImage: article.featuredImage?.url || null,
    author: author ? {
      id: author.id,
      fullName: author.fullName,
      slug: author.slug,
      profileImage: author.profileImage,
      title: author.title,
      shortBio: author.shortBio
    } : undefined
  }
}

export async function getAllArticles(): Promise<ArticleWithAuthor[]> {
  return articlesData.articles.map(populateAuthor)
}

export async function getPublishedArticles(): Promise<ArticleWithAuthor[]> {
  return articlesData.articles
    .filter((article: any) => article.status === 'published')
    .map(populateAuthor)
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithAuthor | null> {
  const article = articlesData.articles.find((article: any) => article.slug === slug)
  return article ? populateAuthor(article) : null
}

export async function getFeaturedArticles(limit: number = 3): Promise<ArticleWithAuthor[]> {
  return articlesData.articles
    .filter((article: any) => article.featured && article.status === 'published')
    .sort((a: any, b: any) => a.order - b.order)
    .slice(0, limit)
    .map(populateAuthor)
}

export async function getLatestArticles(limit: number = 6): Promise<ArticleWithAuthor[]> {
  return articlesData.articles
    .filter((article: any) => article.status === 'published')
    .sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
    .map(populateAuthor)
}

export async function getArticlesByAuthor(authorId: string): Promise<ArticleWithAuthor[]> {
  return articlesData.articles
    .filter((article: any) => article.authorId === authorId)
    .map(populateAuthor)
}

export async function getArticlesByIssue(issueId: string): Promise<ArticleWithAuthor[]> {
  return articlesData.articles
    .filter((article: any) => article.issueId === issueId)
    .map(populateAuthor)
}

export async function getArticlesByTheme(themeId: string): Promise<ArticleWithAuthor[]> {
  return articlesData.articles
    .filter((article: any) => article.themeIds?.includes(themeId))
    .map(populateAuthor)
}

export async function getRelatedArticles(articleId: string, limit: number = 3): Promise<ArticleWithAuthor[]> {
  // Find the current article to get its themes
  const currentArticle = articlesData.articles.find((a: any) => a.id === articleId)
  const themeIds = currentArticle?.themeIds || []

  // If article has themes, find related by theme
  if (themeIds.length > 0) {
    const related = articlesData.articles
      .filter((a: any) => a.id !== articleId && a.status === 'published')
      .filter((a: any) => a.themeIds?.some((theme: string) => themeIds.includes(theme)))
      .slice(0, limit)
      .map(populateAuthor)

    // If we found enough related articles, return them
    if (related.length >= limit) return related

    // Otherwise, fill with recent articles
    const additionalCount = limit - related.length
    const relatedIds = related.map(a => a.id)
    const additional = articlesData.articles
      .filter((a: any) => a.id !== articleId && !relatedIds.includes(a.id) && a.status === 'published')
      .sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, additionalCount)
      .map(populateAuthor)

    return [...related, ...additional]
  }

  // No themes, return recent articles
  return articlesData.articles
    .filter((a: any) => a.id !== articleId && a.status === 'published')
    .sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
    .map(populateAuthor)
}

export async function searchArticles(query: string): Promise<ArticleWithAuthor[]> {
  const lowerQuery = query.toLowerCase()
  return articlesData.articles
    .filter((article: any) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
    )
    .map(populateAuthor)
}
