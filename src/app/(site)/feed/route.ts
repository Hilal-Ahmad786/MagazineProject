import { NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/data/articles'
import { getAllIssues } from '@/lib/data/issues'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazhardergisi.com'

export async function GET() {
  const articles = await getPublishedArticles()
  const issues = await getAllIssues()

  const feedItems = articles.slice(0, 20).map(article => ({
    title: article.title,
    link: `${SITE_URL}/yazilar/${article.slug}`,
    description: article.excerpt || '',
    pubDate: new Date(article.date).toUTCString(),
    author: article.author?.name || 'Mazhar Dergisi',
    category: article.themeIds?.[0] || 'Genel',
  }))

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mazhar Dergisi</title>
    <link>${SITE_URL}</link>
    <description>Aylık düşünce ve edebiyat dergisi</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>Mazhar Dergisi</title>
      <link>${SITE_URL}</link>
    </image>
    ${feedItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <author>${item.author}</author>
      <category>${item.category}</category>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
