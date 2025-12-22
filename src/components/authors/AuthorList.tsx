import { Author } from '@/types/author'
import { AuthorCard } from './AuthorCard'

interface AuthorWithArticleCount extends Author {
  articleCount?: number
}


interface AuthorListProps {
  authors: AuthorWithArticleCount[]
}

export function AuthorList({ authors }: AuthorListProps) {
  return (
    <div>
      {/* Grid */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              articleCount={author.articleCount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Yazar bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
