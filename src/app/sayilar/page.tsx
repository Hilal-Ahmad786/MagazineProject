import { Metadata } from 'next'
import Link from 'next/link'
import { getAllIssues } from '@/lib/data/issues'
import { ROUTES } from '@/lib/constants/routes'
import { getMonthYear } from '@/lib/utils/date'

export const metadata: Metadata = {
    title: 'Sayılar | Mazhar Dergisi',
    description: 'Mazhar Dergisi yayınlanmış tüm sayıları.',
}

export default async function IssuesPage() {
    const issues = await getAllIssues()

    // Sort issues by number descending
    const sortedIssues = [...issues].sort((a, b) => b.number - a.number)

    return (
        <main className="min-h-screen pt-32 pb-20">
            <section className="px-6 md:px-12 mb-16">
                <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                        SAYILAR
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Mazhar Dergisi&apos;nin yayınlanmış tüm sayıları. Geçmişten bugüne düşünce ve edebiyat yolculuğumuz.
                    </p>
                </div>
            </section>

            <section className="px-6 md:px-12">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sortedIssues.map((issue) => (
                            <Link
                                key={issue.id}
                                href={`${ROUTES.ISSUES}/${issue.id}`}
                                className="group block"
                            >
                                <article className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 h-full flex flex-col overflow-hidden">
                                    {/* Cover Image */}
                                    <div className="aspect-[3/4] bg-gray-900 relative overflow-hidden">
                                        {issue.coverImage ? (
                                            <img
                                                src={issue.coverImage.url}
                                                alt={issue.coverImage.alt}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                                <span className="text-6xl font-black text-gray-700">
                                                    {issue.number}
                                                </span>
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-yellow-400 font-bold text-sm">
                                                SAYI {issue.number}
                                            </span>
                                            <time className="text-gray-500 text-xs">
                                                {getMonthYear(issue.publishDate)}
                                            </time>
                                        </div>

                                        <h2 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                                            {issue.theme}
                                        </h2>

                                        {issue.subtitle && (
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {issue.subtitle}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
                                            <span>{issue.theme}</span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                İncele →
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
