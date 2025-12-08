import { Metadata } from 'next'
import { AuthorList } from '@/components/authors/AuthorList'
import { getAllAuthors } from '@/lib/data/authors'
import { getArticlesByAuthor } from '@/lib/data/articles'

export const metadata: Metadata = {
  title: 'Yazarlar | Mazhar Dergisi',
  description: 'Mazhar Dergisi yazarları - Düşünce ve edebiyat yazarlarımız',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  // Get article counts for each author
  const authorsWithCounts = await Promise.all(
    authors.map(async (author) => {
      const articles = await getArticlesByAuthor(author.id)
      return {
        ...author,
        articleCount: articles.length
      }
    })
  )

  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            YAZARLAR
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Mazhar Dergisi&apos;nin değerli yazarları. Her biri farklı bir perspektif, farklı bir ses.
          </p>
        </div>
      </section>

      {/* Authors Section */}
      <section className="px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <AuthorList authors={authorsWithCounts} />
        </div>
      </section>
    </main>
  )
}
