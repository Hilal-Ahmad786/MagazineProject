import { Metadata } from 'next'
import { ArticleList } from '@/components/articles/ArticleList'
import { getPublishedArticles } from '@/lib/data/articles'
import { getAllCategories } from '@/lib/data/categories'

export const metadata: Metadata = {
  title: 'Yazılar | Mazhar Dergisi',
  description: 'Mazhar Dergisi yazıları - Düşünce ve edebiyat üzerine derinlemesine yazılar',
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles()
  const categories = await getAllCategories()

  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            YAZILAR
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Düşünce ve edebiyat üzerine derinlemesine yazılar. Her tema, farklı bir perspektif.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <ArticleList articles={articles} categories={categories} />
        </div>
      </section>
    </main>
  )
}
