import type { Issue } from '@/types';
import issuesData from '@/data/issues.json';

export const issues: Issue[] = issuesData as Issue[];

export function getAllIssues(): Promise<Issue[]> {
  // Sort by number descending (newest first)
  const sorted = [...issues].sort((a, b) => b.number - a.number);
  return Promise.resolve(sorted);
}

export function getIssueBySlug(slug: string): Promise<Issue | undefined> {
  const issue = issues.find((i) => i.slug === slug);
  return Promise.resolve(issue);
}

export function getIssueById(id: string): Promise<Issue | undefined> {
  const issue = issues.find((i) => i.id === id);
  return Promise.resolve(issue);
}

export function getIssueByNumber(number: number): Promise<Issue | undefined> {
  const issue = issues.find((i) => i.number === number);
  return Promise.resolve(issue);
}

export function getLatestIssue(): Promise<Issue | undefined> {
  const sorted = [...issues].sort((a, b) => b.number - a.number);
  return Promise.resolve(sorted[0]);
}

export function getFeaturedIssue(): Promise<Issue | undefined> {
  const featured = issues.find((i) => i.featured);
  // If no featured issue, return the latest
  if (!featured) {
    const sorted = [...issues].sort((a, b) => b.number - a.number);
    return Promise.resolve(sorted[0]);
  }
  return Promise.resolve(featured);
}

export function getPastIssues(excludeId?: string): Promise<Issue[]> {
  let filtered = [...issues];
  if (excludeId) {
    filtered = filtered.filter((i) => i.id !== excludeId);
  }
  const sorted = filtered.sort((a, b) => b.number - a.number);
  return Promise.resolve(sorted);
}

export function getIssuesByYear(year: number): Promise<Issue[]> {
  const yearIssues = issues.filter((i) => 
    new Date(i.date).getFullYear() === year
  );
  return Promise.resolve(yearIssues);
}

export function getIssueYears(): number[] {
  const years = new Set(issues.map((i) => new Date(i.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}

export function getIssueArticleCount(issueId: string): number {
  const issue = issues.find((i) => i.id === issueId);
  return issue?.articles?.length || 0;
}

export function searchIssues(query: string): Promise<Issue[]> {
  const lowercaseQuery = query.toLowerCase();
  const results = issues.filter((i) =>
    i.title.toLowerCase().includes(lowercaseQuery) ||
    i.theme.toLowerCase().includes(lowercaseQuery) ||
    i.subtitle?.toLowerCase().includes(lowercaseQuery) ||
    i.manifesto?.toLowerCase().includes(lowercaseQuery)
  );
  return Promise.resolve(results);
}
