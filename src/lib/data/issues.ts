import type { Issue } from '@/types';
import fs from 'fs';
import path from 'path';

const issuesDirectory = path.join(process.cwd(), 'src/data/issues');

function getIssues(): Issue[] {
  if (!fs.existsSync(issuesDirectory)) {
    return [];
  }

  const issueFolders = fs.readdirSync(issuesDirectory);
  const issues: Issue[] = issueFolders
    .map((folder) => {
      const issuePath = path.join(issuesDirectory, folder, 'issue.json');
      if (fs.existsSync(issuePath)) {
        try {
          const fileContents = fs.readFileSync(issuePath, 'utf8');
          return JSON.parse(fileContents) as Issue;
        } catch (error) {
          console.error(`Error parsing issue.json in ${folder}:`, error);
          return null;
        }
      }
      return null;
    })
    .filter((issue): issue is Issue => issue !== null);

  return issues;
}

export async function getAllIssues(): Promise<Issue[]> {
  const issues = getIssues();
  // Sort by number descending (newest first)
  const sorted = issues.sort((a, b) => b.number - a.number);
  return Promise.resolve(sorted);
}

export async function getIssueBySlug(slug: string): Promise<Issue | undefined> {
  const issues = getIssues();
  const issue = issues.find((i) => i.slug === slug);
  return Promise.resolve(issue);
}

export async function getIssueById(id: string): Promise<Issue | undefined> {
  const issues = getIssues();
  const issue = issues.find((i) => i.id === id);
  return Promise.resolve(issue);
}

export async function getIssueByNumber(number: number): Promise<Issue | undefined> {
  const issues = getIssues();
  const issue = issues.find((i) => i.number === number);
  return Promise.resolve(issue);
}

export async function getLatestIssue(): Promise<Issue | undefined> {
  const issues = getIssues();
  const sorted = issues.sort((a, b) => b.number - a.number);
  return Promise.resolve(sorted[0]);
}

export async function getFeaturedIssue(): Promise<Issue | undefined> {
  const issues = getIssues();
  const featured = issues.find((i) => i.featured);
  // If no featured issue, return the latest
  if (!featured) {
    const sorted = issues.sort((a, b) => b.number - a.number);
    return Promise.resolve(sorted[0]);
  }
  return Promise.resolve(featured);
}

export async function getPastIssues(excludeId?: string): Promise<Issue[]> {
  const issues = getIssues();
  let filtered = [...issues];
  if (excludeId) {
    filtered = filtered.filter((i) => i.id !== excludeId);
  }
  const sorted = filtered.sort((a, b) => b.number - a.number);
  return Promise.resolve(sorted);
}

export async function getIssuesByYear(year: number): Promise<Issue[]> {
  const issues = getIssues();
  const yearIssues = issues.filter((i) =>
    new Date(i.date).getFullYear() === year
  );
  return Promise.resolve(yearIssues);
}

export function getIssueYears(): number[] {
  const issues = getIssues();
  const years = new Set(issues.map((i) => new Date(i.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}

export function getIssueArticleCount(issueId: string): number {
  const issues = getIssues();
  const issue = issues.find((i) => i.id === issueId);
  return issue?.articles?.length || 0;
}

export async function searchIssues(query: string): Promise<Issue[]> {
  const issues = getIssues();
  const lowercaseQuery = query.toLowerCase();
  const results = issues.filter((i) =>
    i.title.toLowerCase().includes(lowercaseQuery) ||
    i.theme?.toLowerCase().includes(lowercaseQuery) ||
    i.subtitle?.toLowerCase().includes(lowercaseQuery) ||
    i.manifesto?.toLowerCase().includes(lowercaseQuery)
  );
  return Promise.resolve(results);
}
