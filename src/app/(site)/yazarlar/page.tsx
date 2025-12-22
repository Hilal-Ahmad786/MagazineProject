import { Metadata } from 'next'
import { AuthorList } from '@/components/authors/AuthorList'
import { getAllAuthors, getGuestAuthors } from '@/lib/data/authors'
import { getArticlesByAuthor } from '@/lib/data/articles'

export const metadata: Metadata = {
  title: 'Yazarlar | Mazhar Dergisi',
  description: 'Mazhar Dergisi yazarları - Düşünce ve edebiyat yazarlarımız',
}

export default async function AuthorsPage() {
  const allAuthors = await getAllAuthors()

  // Filter out guest authors from the main list to avoid duplication if they appear there
  // Assuming 'guest' role identifies them
  const mainAuthors = allAuthors.filter(a => a.role !== 'guest')

  const guestAuthors = await getGuestAuthors()

  // Helper to add article counts
  const addArticleCounts = async (authors: any[]) => {
    return Promise.all(
      authors.map(async (author) => {
        const articles = await getArticlesByAuthor(author.id)
        return {
          ...author,
          articleCount: articles.length
        }
      })
    )
  }

  const mainAuthorsWithCounts = await addArticleCounts(mainAuthors)
  const guestAuthorsWithCounts = await addArticleCounts(guestAuthors)

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
      <section className="px-6 md:px-12 mb-20">
        <div className="max-w-[1600px] mx-auto">
          <AuthorList authors={mainAuthorsWithCounts} />
        </div>
      </section>

      {/* Guest Authors Section */}
      {guestAuthorsWithCounts.length > 0 && (
        <section className="px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 border-b border-white/10 pb-6">
              KONUK YAZARLAR
            </h2>
            <AuthorList authors={guestAuthorsWithCounts} />
          </div>
        </section>
      )}
    </main>
  )
}
