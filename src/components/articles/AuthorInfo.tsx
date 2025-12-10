import Link from 'next/link'
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
        <div className="w-14 h-14 rounded-full overflow-hidden bg-yellow-400 flex-shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-black text-black">
              {author.name.charAt(0)}
            </div>
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
          {author.role && <span>{author.role}</span>}
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
