import { Issue } from '@/types/issue'
import issuesData from '@/data/issues.json'

export async function getAllIssues(): Promise<Issue[]> {
  return issuesData.issues.map((issue: any) => ({
    ...issue,
    coverImage: issue.coverImage?.url || '',
    title: issue.theme, // Map theme to title
    date: issue.publishDate,
    editorsNote: issue.editorNote,
    description: issue.manifesto,
  })) as unknown as Issue[]
}

export async function getActiveIssues(): Promise<Issue[]> {
  const issues = await getAllIssues()
  return issues.filter((issue: any) => issue.active)
}

export async function getIssueById(id: string): Promise<Issue | null> {
  const issues = await getAllIssues()
  return issues.find((issue) => issue.id === id) || null
}

export async function getIssueByNumber(number: number): Promise<Issue | null> {
  const issues = await getAllIssues()
  return issues.find((issue) => issue.number === number) || null
}

export async function getLatestIssue(): Promise<Issue | null> {
  const issues = await getAllIssues()
  const sorted = issues
    .filter((issue: any) => issue.active)
    .sort((a, b) => b.number - a.number)
  return sorted[0] || null
}

export async function getIssuesByYear(year: number): Promise<Issue[]> {
  const issues = await getAllIssues()
  return issues.filter((issue) =>
    new Date(issue.date).getFullYear() === year
  )
}
