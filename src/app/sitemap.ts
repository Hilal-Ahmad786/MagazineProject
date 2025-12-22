import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/data/articles'
import { getAllAuthors } from '@/lib/data/authors'
import { getAllIssues } from '@/lib/data/issues'
import { SITE_CONFIG } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getAllArticles()
    const authors = await getAllAuthors()
    const issues = await getAllIssues()

    const routes = [
        '',
        '/yazilar',
        '/yazarlar',
        '/sayilar',
        '/hakkimizda',
        '/iletisim',
        '/yazar-basvurusu',
    ].map((route) => ({
        url: `${SITE_CONFIG.url}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const articleUrls = articles.map((article) => ({
        url: `${SITE_CONFIG.url}/yazilar/${article.slug}`,
        lastModified: article.date ? new Date(article.date).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const authorUrls = authors.map((author) => ({
        url: `${SITE_CONFIG.url}/yazarlar/${author.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const issueUrls = issues.map((issue) => ({
        url: `${SITE_CONFIG.url}/sayilar/${issue.id}`,
        lastModified: issue.publishDate ? new Date(issue.publishDate).toISOString() : new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...routes, ...articleUrls, ...authorUrls, ...issueUrls]
}
