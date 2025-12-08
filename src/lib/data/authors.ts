import { Author } from '@/types/author'
import authorsData from '@/data/authors.json'

export async function getAllAuthors(): Promise<Author[]> {
  return authorsData.authors as unknown as Author[]
}

export async function getActiveAuthors(): Promise<Author[]> {
  return authorsData.authors.filter(author => author.active) as unknown as Author[]
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return (authorsData.authors.find(author => author.slug === slug) || null) as unknown as Author | null
}

export async function getAuthorsByRole(role: string): Promise<Author[]> {
  return authorsData.authors.filter(author => author.role === role) as unknown as Author[]
}

export async function getFeaturedAuthors(limit: number = 8): Promise<Author[]> {
  return authorsData.authors
    .filter(author => author.active)
    .slice(0, limit) as unknown as Author[]
}
