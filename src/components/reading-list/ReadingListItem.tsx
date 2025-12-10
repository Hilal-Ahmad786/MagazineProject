// src/components/reading-list/ReadingListItem.tsx
// Individual reading list item in drawer

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getRelativeTime } from '@/lib/utils'
import type { ReadingListItem as ReadingListItemType } from '@/types'

interface ReadingListItemProps {
  item: ReadingListItemType
  onRemove: (articleId: string) => void
  onClick?: () => void
  className?: string
}

export function ReadingListItem({
  item,
  onRemove,
  onClick,
  className,
}: ReadingListItemProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(item.articleId)
  }

  return (
    <div className={cn('group relative', className)}>
      <Link
        href={`/yazilar/${item.slug}`}
        onClick={onClick}
        className={cn(
          'flex gap-4 p-4 rounded-xl transition-all',
          'hover:bg-zinc-800/50'
        )}
      >
        {/* Image */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-1">
          <h4 className="font-medium text-white line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {item.title}
          </h4>
          <p className="text-sm text-zinc-500">{item.author}</p>
          <p className="text-xs text-zinc-600 mt-1">
            {getRelativeTime(item.addedAt)} eklendi
          </p>
        </div>
      </Link>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className={cn(
          'absolute top-4 right-4 p-2 rounded-lg',
          'text-zinc-600 hover:text-red-500 hover:bg-zinc-800',
          'opacity-0 group-hover:opacity-100 transition-all'
        )}
        aria-label="Listeden çıkar"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default ReadingListItem
