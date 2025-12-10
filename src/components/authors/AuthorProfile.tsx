import { Author } from '@/types/author'
import { formatDate } from '@/lib/utils/date'

interface AuthorProfileProps {
  author: Author
  articleCount: number
}

export function AuthorProfile({ author, articleCount }: AuthorProfileProps) {
  const roleLabels: Record<string, string> = {
    'founder': 'Kurucu',
    'editor': 'Editör',
    'guest': 'Konuk Yazar',
  }

  // Helper to construct social URLs from usernames
  const getSocialUrl = (platform: string, value: string): string => {
    if (value.startsWith('http')) return value

    switch (platform) {
      case 'twitter':
        return `https://twitter.com/${value}`
      case 'instagram':
        return `https://instagram.com/${value}`
      case 'linkedin':
        return `https://linkedin.com/in/${value}`
      case 'website':
        return value.startsWith('http') ? value : `https://${value}`
      default:
        return value
    }
  }

  const socialLinks = [
    {
      key: 'twitter', icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      key: 'instagram', icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      key: 'linkedin', icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      key: 'website', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
  ]

  return (
    <header className="mb-16">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 relative">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black font-bold text-5xl">
                {author.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Role badge */}
          {author.role && (
            <p className="text-yellow-400 text-lg md:text-xl font-bold uppercase tracking-wider mb-6">
              {author.role}
            </p>
          )}

          {/* Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {author.name}
          </h1>

          {/* Bio */}
          <div className="prose prose-invert prose-lg max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed">
              {author.bio || author.shortBio}
            </p>
          </div>

          {/* Stats & Social */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-800">
            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <span className="text-3xl font-black text-yellow-400">{articleCount}</span>
                <span className="text-gray-500 text-sm ml-2">Yazı</span>
              </div>
              {author.joinedAt && (
                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                    Katılma Tarihi
                  </p>
                  <p className="font-bold text-lg">
                    {formatDate(author.joinedAt, 'long')}
                  </p>
                </div>
              )}
            </div>

            {/* Social Links */}
            {author.social && Object.keys(author.social).length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const value = author.social?.[social.key as keyof typeof author.social]
                  if (!value) return null

                  const url = getSocialUrl(social.key, value)

                  return (
                    <a
                      key={social.key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                      aria-label={social.key}
                    >
                      {social.icon}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
