import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getIssueById, getAllIssues } from '@/lib/data/issues'
import dynamic from 'next/dynamic'

const PDFReaderClient = dynamic(
  () => import('./PDFReaderClient').then(mod => mod.PDFReaderClient),
  { ssr: false }
)

interface PageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  const issues = await getAllIssues()
  return issues.map(issue => ({ id: issue.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const issue = await getIssueById(params.id)

  if (!issue) {
    return { title: 'Bulunamadı | Mazhar Dergisi' }
  }

  return {
    title: `Sayı ${issue.number}: ${issue.theme} | Oku | Mazhar Dergisi`,
    description: `${issue.theme} - Mazhar Dergisi Sayı ${issue.number}'i çevrimiçi okuyun.`,
  }
}

export default async function PDFReaderPage({ params }: PageProps) {
  const issue = await getIssueById(params.id)

  if (!issue || !issue.pdfUrl) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <PDFReaderClient
        pdfUrl={issue.pdfUrl}
        title={`Sayı ${issue.number}: ${issue.theme}`}
        issueId={issue.id}
      />
    </main>
  )
}
