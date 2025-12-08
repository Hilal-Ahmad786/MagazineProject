import { Image, SEO, Status, Locale } from './common'

export interface Article {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string
  contentFormat: 'html' | 'markdown'
  featuredImage: Image
  authorId: string
  issueId: string
  themeIds: string[]
  publishDate: string
  updatedDate?: string
  readingTime: number
  viewCount: number
  featured: boolean
  order: number
  seo: SEO
  status: Status
  locale: Locale
}

export interface ArticleWithRelations extends Article {
  author?: {
    id: string
    fullName: string
    slug: string
    profileImage: string
  }
  issue?: {
    id: string
    number: number
    theme: string
    slug: string
  }
  themes?: {
    id: string
    name: string
    slug: string
  }[]
}

export interface ArticleCardData {
  id: string
  slug: string
  title: string
  excerpt: string
  featuredImage: Image
  authorName: string
  authorSlug: string
  authorImage: string
  publishDate: string
  readingTime: number
  themeNames: string[]
}

export type ArticleSortField = 'publishDate' | 'viewCount' | 'title' | 'readingTime'
