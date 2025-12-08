const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazhardergisi.com'

interface OGImageParams {
  title: string
  subtitle?: string
  author?: string
  theme?: string
  type?: 'default' | 'article' | 'author' | 'issue'
}

export function getOGImageUrl(params: OGImageParams): string {
  const searchParams = new URLSearchParams()
  
  searchParams.set('title', params.title)
  if (params.subtitle) searchParams.set('subtitle', params.subtitle)
  if (params.author) searchParams.set('author', params.author)
  if (params.theme) searchParams.set('theme', params.theme)
  if (params.type) searchParams.set('type', params.type)

  return `${SITE_URL}/api/og?${searchParams.toString()}`
}

// Usage in page metadata:
// 
// export async function generateMetadata({ params }): Promise<Metadata> {
//   const article = await getArticleBySlug(params.slug)
//   
//   return {
//     title: article.title,
//     openGraph: {
//       images: [
//         {
//           url: getOGImageUrl({
//             title: article.title,
//             subtitle: article.subtitle,
//             author: article.author?.fullName,
//             theme: article.themes?.[0],
//             type: 'article',
//           }),
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//   }
// }
