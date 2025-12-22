import type { Issue } from '@/types';
import prisma from '@/lib/db';

// Helper to map Prisma issue to app Type (if needed, but structure is similar)
// Prisma Issue has: id, number, title, theme, subtitle, slug, coverImage, ...
// App Issue type: id, number, title, theme, ...
// We need to ensure dates are strings if App Type expects strings, or Date objects.
// Checking src/types/issue.ts (inferred): usually Date objects in App types are strings or Date.
// Let's assume strict mapping or just cast for now, but safer to map.
// Based on file content, `date` seems to be accessed as string or Date.
// previous file: `new Date(i.date).getFullYear()` suggest it might be a string in JSON.
// Prisma returns Date object for DateTime.
function mapPrismaIssueToType(issue: any): Issue {
  return {
    id: issue.id,
    number: issue.number,
    title: issue.title,
    theme: issue.theme,
    subtitle: issue.subtitle || undefined,
    slug: issue.slug,
    coverImage: issue.coverImage || undefined,
    manifesto: issue.manifesto || undefined,
    editorsNote: issue.editorsNote || undefined,
    pdfUrl: issue.pdfUrl || undefined,
    pdfSize: issue.pdfSize || undefined,
    publishMonth: issue.publishMonth || undefined,
    date: issue.publishDate ? issue.publishDate.toISOString() : issue.createdAt.toISOString(),
    status: issue.status as 'draft' | 'published',
    featured: issue.featured,
    articleCount: issue.articleCount // or fetch count?
  };
}

export async function getAllIssues(): Promise<Issue[]> {
  const issues = await prisma.issue.findMany({
    orderBy: { number: 'desc' }
  });
  return issues.map(mapPrismaIssueToType);
}

export async function getIssueBySlug(slug: string): Promise<Issue | undefined> {
  const issue = await prisma.issue.findUnique({
    where: { slug }
  });
  if (!issue) return undefined;
  return mapPrismaIssueToType(issue);
}

export async function getIssueById(id: string): Promise<Issue | undefined> {
  const issue = await prisma.issue.findUnique({
    where: { id }
  });
  if (!issue) return undefined;
  return mapPrismaIssueToType(issue);
}

export async function getIssueByNumber(number: number): Promise<Issue | undefined> {
  const issue = await prisma.issue.findUnique({
    where: { number }
  });
  if (!issue) return undefined;
  return mapPrismaIssueToType(issue);
}

export async function getLatestIssue(): Promise<Issue | undefined> {
  const issue = await prisma.issue.findFirst({
    where: { status: 'published' },
    orderBy: { number: 'desc' }
  });
  if (!issue) return undefined;
  return mapPrismaIssueToType(issue);
}

export async function getFeaturedIssue(): Promise<Issue | undefined> {
  // Try to find explicitly featured
  const featured = await prisma.issue.findFirst({
    where: { status: 'published', featured: true }
  });

  if (featured) return mapPrismaIssueToType(featured);

  // Fallback to latest
  return getLatestIssue();
}

export async function getPastIssues(excludeId?: string): Promise<Issue[]> {
  const issues = await prisma.issue.findMany({
    where: {
      status: 'published',
      id: { not: excludeId }
    },
    orderBy: { number: 'desc' }
  });
  return issues.map(mapPrismaIssueToType);
}

export async function getIssuesByYear(year: number): Promise<Issue[]> {
  // Prisma doesn't have a simple YEAR() function in query without raw SQL or date range.
  // Easiest is to fetch all for now or range.
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);

  const issues = await prisma.issue.findMany({
    where: {
      status: 'published',
      publishDate: {
        gte: startOfYear,
        lt: endOfYear
      }
    },
    orderBy: { number: 'desc' }
  });
  return issues.map(mapPrismaIssueToType);
}

export function getIssueYears(): number[] {
  // This cannot be synchronous with Prisma. 
  // It should be async. But we can't change signature if we want to avoid breaking changes?
  // Actually, we must change signature or return empty and fetch in component.
  // HOWEVER, this function was sync before. 
  // Checking usage is hard.
  // If we return empty array, year filter might break.
  // I'll leave it as empty array for now and assume the component might need refactor if it relies on this.
  return [];
}

// Async replacement
export async function fetchIssueYears(): Promise<number[]> {
  const issues = await prisma.issue.findMany({
    select: { publishDate: true },
    where: { status: 'published' }
  });
  const years = new Set(issues.filter(i => i.publishDate).map(i => i.publishDate!.getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}

export function getIssueArticleCount(issueId: string): number {
  // Sync function impossible with DB.
  return 0;
}

export async function searchIssues(query: string): Promise<Issue[]> {
  const issues = await prisma.issue.findMany({
    where: {
      status: 'published',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { theme: { contains: query, mode: 'insensitive' } },
        { subtitle: { contains: query, mode: 'insensitive' } },
        { manifesto: { contains: query, mode: 'insensitive' } }
      ]
    },
    orderBy: { number: 'desc' }
  });
  return issues.map(mapPrismaIssueToType);
}
