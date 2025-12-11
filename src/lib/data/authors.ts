import type { Author } from '@/types';
import fs from 'fs';
import path from 'path';

const authorsDirectory = path.join(process.cwd(), 'src/data/authors');

function getAuthors(): Author[] {
  if (!fs.existsSync(authorsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(authorsDirectory);
  const authors: Author[] = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(authorsDirectory, fileName);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents) as Author;
      } catch (error) {
        console.error(`Error parsing author file ${fileName}:`, error);
        return null;
      }
    })
    .filter((author): author is Author => author !== null);

  return authors;
}

export async function getAllAuthors(): Promise<Author[]> {
  return Promise.resolve(getAuthors());
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const authors = getAuthors();
  const author = authors.find((a) => a.slug === slug);
  return Promise.resolve(author);
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
  const authors = getAuthors();
  const author = authors.find((a) => a.id === id);
  return Promise.resolve(author);
}

export async function getFeaturedAuthors(limit?: number): Promise<Author[]> {
  const authors = getAuthors();
  const featured = authors.filter((a) => a.featured);
  return Promise.resolve(limit ? featured.slice(0, limit) : featured);
}

export async function getAuthorsByRole(role: string): Promise<Author[]> {
  const authors = getAuthors();
  const roleAuthors = authors.filter((a) => a.role === role);
  return Promise.resolve(roleAuthors);
}

export async function getFounders(): Promise<Author[]> {
  const authors = getAuthors();
  const founders = authors.filter((a) => a.role === 'founder');
  return Promise.resolve(founders);
}

export async function getEditors(): Promise<Author[]> {
  const authors = getAuthors();
  const editors = authors.filter((a) => a.role === 'editor' || a.role === 'founder');
  return Promise.resolve(editors);
}

export async function getGuestAuthors(): Promise<Author[]> {
  const authors = getAuthors();
  const guests = authors.filter((a) => a.role === 'guest');
  return Promise.resolve(guests);
}

export async function searchAuthors(query: string): Promise<Author[]> {
  const authors = getAuthors();
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
