import { Author } from '@/types/author'
import authorsData from '@/data/authors.json'

export async function getAllAuthors(): Promise<Author[]> {
  return authorsData.authors.map((author) => ({
    ...author,
    name: author.fullName,
    avatar: author.profileImage,
    role: author.title,
    bio: author.longBio || '',
    joinedAt: author.joinDate,
  })) as unknown as Author[]
}

export async function getActiveAuthors(): Promise<Author[]> {
  const authors = await getAllAuthors()
  return authors.filter((author) => author.active)
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAllAuthors()
  return authors.find((a) => a.slug === slug) || null
}

export async function getAuthorsByRole(role: string): Promise<Author[]> {
  const authors = await getAllAuthors()
  return authors.filter((author) => author.role?.toLowerCase().includes(role.toLowerCase()))
}

export async function getFeaturedAuthors(limit: number = 3): Promise<Author[]> {
  const authors = await getAllAuthors()
  return authors.slice(0, limit)
}
