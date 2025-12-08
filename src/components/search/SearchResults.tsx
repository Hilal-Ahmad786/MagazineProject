import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

interface SearchResult {
  type: 'article' | 'author' | 'issue'
  id: string
  title: string
  subtitle?: string
  slug?: string
  excerpt?: string
  image?: string
}

interface SearchResultsProps {
  results: SearchResult[]
  query: string
  onClose: () => void
}

export function SearchResults({ results, query, onClose }: SearchResultsProps) {
  if (results.length === 0 && query.length > 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg mb-2">Sonuç bulunamadı</p>
        <p className="text-gray-600 text-sm">&quot;{query}&quot; için sonuç yok. Farklı anahtar kelimeler deneyin.</p>
      </div>
    )
  }

  if (results.length === 0) {
    return null
  }

  // Group results by type
  const articles = results.filter(r => r.type === 'article')
  const authors = results.filter(r => r.type === 'author')
  const issues = results.filter(r => r.type === 'issue')

  const getHref = (result: SearchResult) => {
    switch (result.type) {
      case 'article':
        return `${ROUTES.ARTICLES}/${result.slug}`
      case 'author':
        return `${ROUTES.AUTHORS}/${result.slug}`
      case 'issue':
        return `${ROUTES.ISSUES}/${result.id}`
      default:
        return '/'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'Yazı'
      case 'author': return 'Yazar'
      case 'issue': return 'Sayı'
      default: return ''
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-yellow-400 text-black'
      case 'author': return 'bg-blue-500 text-white'
      case 'issue': return 'bg-purple-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const renderSection = (title: string, items: SearchResult[]) => {
    if (items.length === 0) return null

    return (
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-4">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={getHref(result)}
              onClick={onClose}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 transition-colors group"
            >
              {/* Type badge */}
              <span className={`px-2 py-1 text-xs font-bold uppercase ${getTypeColor(result.type)}`}>
                {getTypeLabel(result.type)}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors truncate">
                  {result.title}
                </h4>
                {result.subtitle && (
                  <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                )}
              </div>

              {/* Arrow */}
              <svg className="w-5 h-5 text-gray-600 group-hover:text-yellow-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 max-h-[60vh] overflow-y-auto">
      {renderSection('Yazılar', articles)}
      {renderSection('Yazarlar', authors)}
      {renderSection('Sayılar', issues)}

      {/* Result count */}
      <div className="px-4 pt-4 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          <span className="text-yellow-400 font-bold">{results.length}</span> sonuç bulundu
        </p>
      </div>
    </div>
  )
}
