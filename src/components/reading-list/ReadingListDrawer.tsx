// src/components/reading-list/ReadingListDrawer.tsx
// Slide-in drawer showing all saved articles

'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useReadingList } from '@/contexts/ReadingListContext'
import { ReadingListItem } from './ReadingListItem'

interface ReadingListDrawerProps {
  className?: string
}

export function ReadingListDrawer({ className }: ReadingListDrawerProps) {
  const {
    items,
    count,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    clearList,
  } = useReadingList()

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, closeDrawer])

  // Handle clear all
  const handleClearAll = () => {
    if (window.confirm('Tüm okuma listesini silmek istediğinize emin misiniz?')) {
      clearList()
    }
  }

  if (!isDrawerOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm',
          'animate-in fade-in duration-200'
        )}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-md',
          'bg-zinc-900 border-l border-zinc-800 shadow-2xl',
          'animate-in slide-in-from-right duration-300',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Okuma Listesi"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <div>
              <h2 className="text-lg font-bold text-white">Okuma Listesi</h2>
              <p className="text-sm text-zinc-500">{count} yazı</p>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-88px)]">
          {items.length === 0 ? (
            // Empty State
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 mb-6 rounded-full bg-zinc-800/50 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-zinc-300 mb-2">
                Okuma listeniz boş
              </h3>
              <p className="text-sm text-zinc-500 max-w-xs">
                Beğendiğiniz yazıları kaydet butonuna tıklayarak buraya ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            // Items List
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-2">
                {items.map((item) => (
                  <ReadingListItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onClick={closeDrawer}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-zinc-800">
              <button
                onClick={handleClearAll}
                className={cn(
                  'w-full py-2.5 px-4 rounded-lg text-sm font-medium',
                  'text-zinc-400 hover:text-red-500 hover:bg-red-500/10',
                  'border border-zinc-800 hover:border-red-500/30',
                  'transition-all'
                )}
              >
                Tümünü Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReadingListDrawer
