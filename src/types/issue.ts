import { Image, Locale } from './common'

export interface Issue {
  id: string
  number: number
  theme: string
  subtitle?: string
  slug: string
  coverImage: Image
  publishDate: string
  publishMonth: string
  manifesto: string
  editorNote?: string
  articleIds: string[]
  pdfUrl?: string
  pdfSize?: string
  stats: {
    articleCount: number
    totalWords: number
    contributorCount: number
  }
  active: boolean
  locale: Locale
}

export interface IssueWithArticles extends Issue {
  articles?: {
    id: string
    title: string
    slug: string
    authorName: string
    excerpt: string
  }[]
}

export interface IssueCardData {
  id: string
  number: number
  theme: string
  slug: string
  coverImage: Image
  publishMonth: string
  articleCount: number
  pdfUrl?: string
}
