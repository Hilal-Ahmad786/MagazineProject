import { Metadata } from 'next'

interface SEOParams {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mazhardergisi.com'
const SITE_NAME = 'Mazhar Dergisi'

export function generateMetadata({ title, description, path = '', image, type = 'website' }: SEOParams): Metadata {
  const url = `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/images/og-default.jpg`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
      locale: 'tr_TR',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}
