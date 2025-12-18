import Link from 'next/link'
import { Author } from '@/types/author'
import { ROUTES } from '@/lib/constants/routes'

interface AuthorCardProps {
  author: Author
  articleCount?: number
}

export function AuthorCard({ author, articleCount = 0 }: AuthorCardProps) {
  const roleColors: Record<string, string> = {
    'founder': 'bg-yellow-400 text-black',
    'editor': 'bg-gray-700 text-white',
    'guest': 'bg-gray-800 text-gray-300',
  }

  const roleLabels: Record<string, string> = {
    'founder': 'Kurucu',
    'editor': 'Editör',
    'guest': 'Konuk Yazar',
  }

  return (
    <Link
      href={`${ROUTES.AUTHORS}/${author.slug}`}
      className="group block"
    >
      <article className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-8 text-center relative overflow-hidden">
        {/* Yellow accent on hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

        {/* Avatar */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : author.gender === 'male' ? (
              <svg className="w-20 h-20 text-black/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            ) : author.gender === 'female' ? (
              <svg className="w-20 h-20 text-black/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            ) : (
              <span className="text-black font-bold text-4xl">
                {author.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
          {author.name}
        </h3>

        {author.role && (
          <p className="text-yellow-400/80 text-sm mb-4 font-medium uppercase tracking-wider">
            {author.role}
          </p>
        )}

        {author.shortBio && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {author.shortBio}
          </p>
        )}

        {/* Stats */}
        {articleCount > 0 && (
          <div className="pt-4 border-t border-gray-700">
            <span className="text-yellow-400 font-bold">{articleCount}</span>
            <span className="text-gray-500 text-sm ml-1">yazı</span>
          </div>
        )}
      </article>
    </Link>
  )
}
