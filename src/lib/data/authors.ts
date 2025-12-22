import { Author } from '@/types';
import prisma from '@/lib/db';

export async function getAllAuthors(): Promise<Author[]> {
  const authors = await prisma.author.findMany({
    where: { active: true },
    orderBy: { name: 'asc' }
  });

  return authors.map(mapPrismaAuthorToType);
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const author = await prisma.author.findUnique({
    where: { slug }
  });

  if (!author) return undefined;
  return mapPrismaAuthorToType(author);
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
  const author = await prisma.author.findUnique({
    where: { id }
  });

  if (!author) return undefined;
  return mapPrismaAuthorToType(author);
}

export async function getFeaturedAuthors(limit?: number): Promise<Author[]> {
  const authors = await prisma.author.findMany({
    where: { active: true, featured: true },
    take: limit,
    orderBy: { name: 'asc' }
  });
  return authors.map(mapPrismaAuthorToType);
}

export async function getAuthorsByRole(role: string): Promise<Author[]> {
  const authors = await prisma.author.findMany({
    where: { active: true, role },
    orderBy: { name: 'asc' }
  });
  return authors.map(mapPrismaAuthorToType);
}

export async function getFounders(): Promise<Author[]> {
  return getAuthorsByRole('founder');
}

export async function getEditors(): Promise<Author[]> {
  const authors = await prisma.author.findMany({
    where: {
      active: true,
      OR: [{ role: 'editor' }, { role: 'founder' }]
    },
    orderBy: { name: 'asc' }
  });
  return authors.map(mapPrismaAuthorToType);
}

export async function getGuestAuthors(): Promise<Author[]> {
  return getAuthorsByRole('guest');
}

export async function searchAuthors(query: string): Promise<Author[]> {
  const authors = await prisma.author.findMany({
    where: {
      active: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } }
      ]
    }
  });
  return authors.map(mapPrismaAuthorToType);
}

export function getAuthorRoles(): string[] {
  return ['founder', 'editor', 'guest'];
}



// Helper to map Prisma result to Author type
function mapPrismaAuthorToType(author: any): Author {
  return {
    id: author.id,
    slug: author.slug,
    name: author.name,
    email: author.email || undefined,
    role: author.role,
    title: author.title || undefined,
    avatar: author.avatar || undefined,
    bio: author.bio || "",
    shortBio: author.bio ? author.bio.substring(0, 150) + "..." : "", // Fallback
    social: author.social ? (typeof author.social === 'string' ? JSON.parse(author.social) : author.social) : {},
    joinedAt: author.joinedAt ? author.joinedAt.toISOString() : undefined,
    active: author.active,
    featured: author.featured
  };
}
