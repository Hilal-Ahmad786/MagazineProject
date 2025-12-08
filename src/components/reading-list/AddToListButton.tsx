'use client'

import { useReadingList, ReadingListItem } from '@/contexts/ReadingListContext'

interface AddToListButtonProps {
  item: Omit<ReadingListItem, 'addedAt'>
  variant?: 'default' | 'icon' | 'card'
}

export function AddToListButton({ item, variant = 'default' }: AddToListButtonProps) {
  const { addToList, removeFromList, isInList } = useReadingList()
  const inList = isInList(item.id)

  const handleClick = () => {
    if (inList) {
      removeFromList(item.id)
    } else {
      addToList(item)
    }
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 transition-colors ${
          inList 
            ? 'text-yellow-400 hover:text-yellow-300' 
            : 'text-gray-400 hover:text-yellow-400'
        }`}
        aria-label={inList ? 'Listeden çıkar' : 'Listeye ekle'}
        title={inList ? 'Okuma listesinden çıkar' : 'Okuma listesine ekle'}
      >
        <svg 
          className="w-5 h-5" 
          fill={inList ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
          />
        </svg>
      </button>
    )
  }

  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        className={`absolute top-3 right-3 p-2 backdrop-blur-sm transition-all ${
          inList 
            ? 'bg-yellow-400 text-black' 
            : 'bg-black/50 text-white hover:bg-yellow-400 hover:text-black'
        }`}
        aria-label={inList ? 'Listeden çıkar' : 'Listeye ekle'}
      >
        <svg 
          className="w-5 h-5" 
          fill={inList ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
          />
        </svg>
      </button>
    )
  }

  // Default variant
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors ${
        inList 
          ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
          : 'bg-gray-800 text-white hover:bg-yellow-400 hover:text-black'
      }`}
    >
      <svg 
        className="w-5 h-5" 
        fill={inList ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
      {inList ? 'Listede' : 'Listeye Ekle'}
    </button>
  )
}
