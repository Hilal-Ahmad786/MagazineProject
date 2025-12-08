import { SocialLinks, Locale } from './common'

export type AuthorRole = 'founder' | 'editor' | 'guest'

export interface Author {
  id: string
  slug: string
  fullName: string
  role: AuthorRole
  title: string
  profileImage: string
  shortBio: string
  longBio: string
  email: string
  phone?: string
  social: SocialLinks
  joinDate: string
  stats: {
    articleCount: number
    issueCount: number
    totalViews: number
  }
  active: boolean
  locale: Locale
}

export interface AuthorWithArticles extends Author {
  articles?: {
    id: string
    title: string
    slug: string
    publishDate: string
    viewCount: number
  }[]
}

export interface AuthorCardData {
  id: string
  slug: string
  fullName: string
  role: AuthorRole
  title: string
  profileImage: string
  shortBio: string
  articleCount: number
}
