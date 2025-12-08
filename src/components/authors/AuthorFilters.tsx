'use client'

import { cn } from '@/lib/utils/cn'

interface AuthorFiltersProps {
  selectedRole: string | null
  onRoleChange: (role: string | null) => void
  counts: {
    all: number
    founder: number
    editor: number
    guest: number
  }
}

export function AuthorFilters({ selectedRole, onRoleChange, counts }: AuthorFiltersProps) {
  const filters = [
    { id: null, label: 'Tümü', count: counts.all },
    { id: 'founder', label: 'Kurucular', count: counts.founder },
    { id: 'editor', label: 'Editörler', count: counts.editor },
    { id: 'guest', label: 'Konuk Yazarlar', count: counts.guest },
  ]

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id || 'all'}
            onClick={() => onRoleChange(filter.id)}
            className={cn(
              'px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2',
              selectedRole === filter.id
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            )}
          >
            {filter.label}
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              selectedRole === filter.id
                ? 'bg-black/20 text-black'
                : 'bg-gray-700 text-gray-500'
            )}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
