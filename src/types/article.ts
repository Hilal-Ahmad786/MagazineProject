// src/types/article.ts
// Article type definition for Mazhar Dergisi v2

export interface ArticleAuthor {
  id: string
  name: string
  slug: string
  avatar: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // HTML or Markdown
  image: string
  category: string
  tags: string[]
  author: ArticleAuthor
  date: string // ISO date string
  readTime: number // minutes
  featured: boolean
  issueId?: string
  page?: number // page number in issue
  viewCount?: number
  themeIds?: string[]
  status?: string
}

export interface ArticleStats {
  articleId: string
  views: number
  readTime: number // seconds
  scrollDepth: number // percentage (0-100)
  lastViewed: string // ISO date
}

export interface ArticleFilter {
  category?: string
  tag?: string
  authorId?: string
  issueId?: string
  featured?: boolean
  search?: string
}

export interface ArticleSortOption {
  field: 'date' | 'readTime' | 'title'
  order: 'asc' | 'desc'
}
