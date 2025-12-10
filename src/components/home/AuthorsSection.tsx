import Link from 'next/link'
import { Author } from '@/types/author'
import { ROUTES } from '@/lib/constants/routes'

interface AuthorsSectionProps {
  authors: Author[]
}

export function AuthorsSection({ authors }: AuthorsSectionProps) {
  return (
    <section className="bg-black py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            YAZARLARIMIZ
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`${ROUTES.AUTHORS}/${author.slug}`}
              className="group text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-yellow-400">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black font-bold text-4xl">
                    {author.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-yellow-400 transition-colors">
                {author.name}
              </h3>
              {author.role && (
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  {author.role}
                </p>
              )}
              {/* title removed */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
