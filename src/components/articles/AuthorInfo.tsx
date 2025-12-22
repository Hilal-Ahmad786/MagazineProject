import Link from 'next/link'
import { getRoleLabel } from '@/lib/constants/roles'
import { Author } from '@/types/author'
import { ROUTES } from '@/lib/constants/routes'

interface AuthorInfoProps {
  author: Author
  publishDate?: string
  readingTime?: number
}

export function AuthorInfo({ author, publishDate, readingTime }: AuthorInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href={`${ROUTES.AUTHORS}/${author.slug}`}>
        <div className="w-14 h-14 rounded-full overflow-hidden bg-yellow-400 flex-shrink-0 flex items-center justify-center">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          ) : author.gender === 'male' ? (
            <svg className="w-10 h-10 text-black/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          ) : author.gender === 'female' ? (
            <svg className="w-10 h-10 text-black/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          ) : (
            <span className="text-black font-black text-xl">
              {author.name.charAt(0)}
            </span>
          )}
        </div>
      </Link>

      <div>
        <Link
          href={`${ROUTES.AUTHORS}/${author.slug}`}
          className="font-bold text-white hover:text-yellow-400 transition-colors"
        >
          {author.name}
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {author.role && <span>{getRoleLabel(author.role)}</span>}
          {publishDate && (
            <>
              <span>•</span>
              <span>{publishDate}</span>
            </>
          )}
          {readingTime && (
            <>
              <span>•</span>
              <span>{readingTime} dk okuma</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
