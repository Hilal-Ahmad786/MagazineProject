import { NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/data/articles'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazhardergisi.com'

// JSON Feed (https://jsonfeed.org/)
export async function GET() {
  const articles = await getPublishedArticles()

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Mazhar Dergisi',
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: 'Aylık düşünce ve edebiyat dergisi',
    language: 'tr',
    authors: [
      {
        name: 'Mazhar Dergisi',
        url: SITE_URL,
      },
    ],
    items: articles.slice(0, 20).map(article => ({
      id: `${SITE_URL}/yazilar/${article.slug}`,
      url: `${SITE_URL}/yazilar/${article.slug}`,
      title: article.title,
      content_text: article.excerpt || '',
      summary: article.excerpt || '',
      date_published: article.date,
      authors: article.author ? [{ name: article.author.name }] : [],
      tags: article.themeIds || [],
    })),
  }

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
