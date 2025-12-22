// src/types/issue.ts
// Issue type definition for Mazhar Dergisi v2

import { Article } from './article'

export interface Issue {
  id: string
  number: number
  title: string
  slug: string
  subtitle?: string
  theme?: string
  date: string // ISO date
  coverImage: string
  pdfUrl: string
  pdfSize?: string
  editorsNote?: string
  manifesto?: string
  featured: boolean
  pageCount?: number
  description?: string
  publishMonth?: string
  status?: string
  articles?: Article[]
  articleCount?: number
}

export interface IssueWithArticles extends Issue {
  articles: Article[]
}

export interface IssueFilter {
  year?: number
  featured?: boolean
  search?: string
}

export interface IssueSortOption {
  field: 'number' | 'date'
  order: 'asc' | 'desc'
}

// Helper to get issue year
export function getIssueYear(issue: Issue): number {
  return new Date(issue.date).getFullYear()
}

// Helper to format issue display
export function formatIssueTitle(issue: Issue): string {
  return `Sayı ${issue.number} - ${issue.title}`
}
