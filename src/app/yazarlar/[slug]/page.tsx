import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AuthorProfile } from '@/components/authors/AuthorProfile'
import { AuthorArticles } from '@/components/authors/AuthorArticles'
import { getAuthorBySlug, getAllAuthors } from '@/lib/data/authors'
import { getArticlesByAuthor } from '@/lib/data/articles'

interface AuthorPageProps {
  params: { slug: string }
}

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug)

  if (!author) {
    return {
      title: 'Yazar Bulunamadı | Mazhar Dergisi',
    }
  }

  return {
    title: `${author.name} | Mazhar Dergisi`,
    description: author.shortBio || `${author.name} - Mazhar Dergisi yazarı`,
    openGraph: {
      title: author.name,
      description: author.shortBio || `${author.name} - Mazhar Dergisi yazarı`,
      type: 'profile',
      images: author.avatar ? [author.avatar] : undefined,
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorBySlug(params.slug)

  if (!author) {
    notFound()
  }

  const articles = await getArticlesByAuthor(author.id)

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Profile Header */}
          <AuthorProfile author={author} articleCount={articles.length} />

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-16" />

          {/* Author's Articles */}
          <AuthorArticles articles={articles} authorName={author.name.split(' ')[0]} />
        </div>
      </div>
    </main>
  )
}
