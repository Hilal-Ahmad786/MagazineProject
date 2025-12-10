import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetail } from '@/components/articles/ArticleDetail'
import { RelatedArticles } from '@/components/articles/RelatedArticles'
import { ReadingProgress } from '@/components/articles/ReadingProgress'
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/data/articles'

interface ArticlePageProps {
  params: { slug: string }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Yazı Bulunamadı | Mazhar Dergisi',
    }
  }

  return {
    title: `${article.title} | Mazhar Dergisi`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.image ? [article.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.id, 3)

  return (
    <>
      <ReadingProgress />

      <main className="min-h-screen pt-32 pb-20">
        <div className="px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <ArticleDetail article={article} />

            {relatedArticles.length > 0 && (
              <RelatedArticles articles={relatedArticles} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
