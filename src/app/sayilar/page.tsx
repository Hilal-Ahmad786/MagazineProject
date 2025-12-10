import { IssueList } from '@/components/issues'
import { getAllIssues } from '@/lib/data/issues'

export const metadata = {
    title: 'Sayılar | Mazhar Dergisi',
    description: 'Mazhar Dergisi yayınlanmış tüm sayıları.',
}

export default async function IssuesPage() {
    const issues = await getAllIssues()

    return (
        <main className="min-h-screen bg-neutral-950 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-white mb-8">Sayılar</h1>
                <IssueList
                    issues={issues}
                    showFeatured={true}
                    showYearFilter={true}
                />
            </div>
        </main>
    )
}
