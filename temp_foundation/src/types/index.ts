// src/types/index.ts
// Central export for all types

// Core types
export * from './article'
export * from './author'
export * from './issue'
export * from './comment'

// Common types used across the application

export interface SearchResult {
  type: 'article' | 'author' | 'issue'
  id: string
  title: string
  subtitle?: string
  image?: string
  href: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: PaginationInfo
}

export interface SiteMetadata {
  title: string
  description: string
  url: string
  locale: string
  siteName: string
  twitterHandle?: string
}

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  bio?: string
  social?: {
    twitter?: string
    linkedin?: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  articleCount?: number
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterFormData {
  email: string
}

export interface AuthorApplicationData {
  fullName: string
  email: string
  phone?: string
  city: string
  bio: string
  experience: string
  publications?: string
  sampleUrl?: string
  sampleFile?: File
  topics: string[]
  proposedArticle: string
  acceptTerms: boolean
}

// Analytics types
export interface VisitHistoryItem {
  date: string // YYYY-MM-DD
  views: number
}

export interface AnalyticsData {
  totalViews: number
  totalReadTime: number // seconds
  articleStats: Record<string, import('./article').ArticleStats>
  visitHistory: VisitHistoryItem[]
}

// Reading list types
export interface ReadingListItem {
  id: string
  articleId: string
  title: string
  author: string
  image: string
  slug: string
  addedAt: string // ISO date
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

// Locale types
export type Locale = 'tr' | 'en'
