// src/types/author.ts
// Author type definition for Mazhar Dergisi v2

import { Article } from './article'

export type AuthorRole = 'founder' | 'editor' | 'writer' | 'guest'

export interface AuthorSocial {
  twitter?: string
  instagram?: string
  linkedin?: string
  website?: string
  facebook?: string
}

export interface Author {
  id: string
  slug: string
  name: string
  avatar?: string
  role: AuthorRole | string
  title?: string
  bio: string
  shortBio?: string
  email?: string
  social?: AuthorSocial
  gender?: 'male' | 'female'
  joinedAt: string // ISO date
  featured?: boolean
  active?: boolean
}

export interface AuthorWithArticles extends Author {
  articles: Article[]
  totalReads?: number
  articleCount?: number
}

export interface AuthorFilter {
  role?: AuthorRole
  search?: string
  featured?: boolean
}

// Role display names (Turkish)
export const AUTHOR_ROLE_LABELS: Record<AuthorRole, string> = {
  founder: 'Kurucu',
  editor: 'Editör',
  writer: 'Yazar',
  guest: 'Konuk Yazar',
}
