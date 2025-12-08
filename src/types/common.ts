// Common types used across the application

export type Locale = 'tr' | 'en'

export type Status = 'draft' | 'published' | 'archived'

export interface Image {
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface SEO {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: string
}

export interface SocialLinks {
  twitter?: string
  linkedin?: string
  website?: string
  instagram?: string
  facebook?: string
}

export interface DateRange {
  start: string
  end: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface SearchParams {
  query: string
  type?: 'all' | 'articles' | 'authors' | 'issues'
  filters?: Record<string, any>
}

export interface FilterOptions {
  authorId?: string
  issueId?: string
  themeIds?: string[]
  dateRange?: DateRange
  status?: Status
  featured?: boolean
}

export interface SortOptions {
  field: string
  order: 'asc' | 'desc'
}
