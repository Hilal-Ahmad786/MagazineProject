'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useReadingList } from '@/contexts/ReadingListContext'
import { ROUTES } from '@/lib/constants/routes'

export function ReadingListPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeFromList, clearList, itemCount } = useReadingList()

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const getHref = (item: typeof items[0]) => {
    if (item.type === 'article') {
      return `${ROUTES.ARTICLES}/${item.slug}`
    }
    return `${ROUTES.ISSUES}/${item.id}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-yellow-400 text-black flex items-center justify-center shadow-lg hover:bg-yellow-300 transition-colors"
        aria-label="Okuma listesi"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-yellow-400 text-xs font-bold flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black">OKUMA LİSTESİ</h2>
              {itemCount > 0 && (
                <span className="px-2 py-0.5 bg-yellow-400 text-black text-sm font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-800 transition-colors"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {items.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-800/50 transition-colors group">
                    <div className="flex gap-4">
                      {/* Image */}
                      {item.image && (
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-800 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={getHref(item)}
                          onClick={() => setIsOpen(false)}
                          className="font-bold text-white hover:text-yellow-400 transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        {item.author && (
                          <p className="text-sm text-gray-500 mt-1">{item.author}</p>
                        )}
                        <p className="text-xs text-gray-600 mt-2">
                          Eklendi: {formatDate(item.addedAt)}
                        </p>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromList(item.id)}
                        className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Listeden çıkar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <p className="text-gray-500 text-lg mb-2">Okuma listeniz boş</p>
                <p className="text-gray-600 text-sm">
                  Yazıları kaydetmek için bookmark simgesine tıklayın
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={() => {
                  if (confirm('Tüm liste silinecek. Emin misiniz?')) {
                    clearList()
                  }
                }}
                className="w-full py-3 bg-gray-800 text-gray-400 font-bold text-sm hover:bg-red-500 hover:text-white transition-colors"
              >
                Listeyi Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
