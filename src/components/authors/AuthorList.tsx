'use client'

import { useState, useMemo } from 'react'
import { Author } from '@/types/author'
import { AuthorCard } from './AuthorCard'
import { AuthorFilters } from './AuthorFilters'

interface AuthorWithArticleCount extends Author {
  articleCount?: number
}

interface AuthorListProps {
  authors: AuthorWithArticleCount[]
}

export function AuthorList({ authors }: AuthorListProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  // Calculate counts
  const counts = useMemo(() => ({
    all: authors.length,
    founder: authors.filter(a => a.role === 'founder').length,
    editor: authors.filter(a => a.role === 'editor').length,
    guest: authors.filter(a => a.role === 'guest').length,
  }), [authors])

  // Filter authors
  const filteredAuthors = useMemo(() => {
    if (!selectedRole) return authors
    return authors.filter(author => author.role === selectedRole)
  }, [authors, selectedRole])

  return (
    <div>
      {/* Filters */}
      <AuthorFilters 
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        counts={counts}
      />

      {/* Grid */}
      {filteredAuthors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuthors.map((author) => (
            <AuthorCard 
              key={author.id} 
              author={author}
              articleCount={author.articleCount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Bu kategoride yazar bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
