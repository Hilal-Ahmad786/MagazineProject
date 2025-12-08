import { Issue } from '@/types/issue'
import issuesData from '@/data/issues.json'

export async function getAllIssues(): Promise<Issue[]> {
  return issuesData.issues as unknown as Issue[]
}

export async function getActiveIssues(): Promise<Issue[]> {
  return issuesData.issues.filter(issue => issue.active) as unknown as Issue[]
}

export async function getIssueById(id: string): Promise<Issue | null> {
  return (issuesData.issues.find(issue => issue.id === id) || null) as unknown as Issue | null
}

export async function getIssueByNumber(number: number): Promise<Issue | null> {
  return (issuesData.issues.find(issue => issue.number === number) || null) as unknown as Issue | null
}

export async function getLatestIssue(): Promise<Issue | null> {
  const sorted = issuesData.issues
    .filter(issue => issue.active)
    .sort((a, b) => b.number - a.number)
  return (sorted[0] || null) as unknown as Issue | null
}

export async function getIssuesByYear(year: number): Promise<Issue[]> {
  return issuesData.issues.filter(issue =>
    new Date(issue.publishDate).getFullYear() === year
  ) as unknown as Issue[]
}
