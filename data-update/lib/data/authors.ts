import type { Author } from '@/types';
import authorsData from '@/data/authors.json';

export const authors: Author[] = authorsData as Author[];

export function getAllAuthors(): Promise<Author[]> {
  return Promise.resolve(authors);
}

export function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const author = authors.find((a) => a.slug === slug);
  return Promise.resolve(author);
}

export function getAuthorById(id: string): Promise<Author | undefined> {
  const author = authors.find((a) => a.id === id);
  return Promise.resolve(author);
}

export function getFeaturedAuthors(limit?: number): Promise<Author[]> {
  const featured = authors.filter((a) => a.featured);
  return Promise.resolve(limit ? featured.slice(0, limit) : featured);
}

export function getAuthorsByRole(role: string): Promise<Author[]> {
  const roleAuthors = authors.filter((a) => a.role === role);
  return Promise.resolve(roleAuthors);
}

export function getFounders(): Promise<Author[]> {
  const founders = authors.filter((a) => a.role === 'founder');
  return Promise.resolve(founders);
}

export function getEditors(): Promise<Author[]> {
  const editors = authors.filter((a) => a.role === 'editor' || a.role === 'founder');
  return Promise.resolve(editors);
}

export function getGuestAuthors(): Promise<Author[]> {
  const guests = authors.filter((a) => a.role === 'guest');
  return Promise.resolve(guests);
}

export function searchAuthors(query: string): Promise<Author[]> {
  const lowercaseQuery = query.toLowerCase();
  const results = authors.filter((a) =>
    a.name.toLowerCase().includes(lowercaseQuery) ||
    a.bio.toLowerCase().includes(lowercaseQuery) ||
    a.title.toLowerCase().includes(lowercaseQuery)
  );
  return Promise.resolve(results);
}

export function getAuthorRoles(): string[] {
  return ['founder', 'editor', 'guest'];
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    founder: 'Kurucu Yazar',
    editor: 'Editör',
    guest: 'Konuk Yazar',
  };
  return labels[role] || role;
}
