'use client'

import { useState, useEffect, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
}

interface PDFViewerProps {
  url: string
  title?: string
  onClose?: () => void
}

export function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const onDocumentLoadError = (error: Error) => {
    setError('PDF yüklenemedi. Lütfen tekrar deneyin.')
    setIsLoading(false)
    console.error('PDF load error:', error)
  }

  const goToPrevPage = useCallback(() => setPageNumber(prev => Math.max(prev - 1, 1)), [])
  const goToNextPage = useCallback(() => setPageNumber(prev => Math.min(prev + 1, numPages)), [numPages])
  const zoomIn = useCallback(() => setScale(prev => Math.min(prev + 0.25, 3)), [])
  const zoomOut = useCallback(() => setScale(prev => Math.max(prev - 0.25, 0.5)), [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevPage()
      if (e.key === 'ArrowRight') goToNextPage()
      if (e.key === 'Escape' && onClose) onClose()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [numPages, onClose, goToPrevPage, goToNextPage, zoomIn, zoomOut])

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-800">
        <div className="flex items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 transition-colors"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {title && <span className="font-bold truncate max-w-[200px]">{title}</span>}
        </div>

        {/* Page controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 hover:bg-gray-800 disabled:opacity-30 transition-colors"
            aria-label="Önceki sayfa"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-sm px-3">
            {pageNumber} / {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 hover:bg-gray-800 disabled:opacity-30 transition-colors"
            aria-label="Sonraki sayfa"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 hover:bg-gray-800 disabled:opacity-30 transition-colors"
            aria-label="Uzaklaştır"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3}
            className="p-2 hover:bg-gray-800 disabled:opacity-30 transition-colors"
            aria-label="Yakınlaştır"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <a
            href={url}
            download
            className="p-2 hover:bg-gray-800 transition-colors ml-2"
            aria-label="İndir"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">PDF yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-400 mb-4">{error}</p>
            <a
              href={url}
              download
              className="px-6 py-3 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors"
            >
              PDF&apos;i İndir
            </a>
          </div>
        )}

        {!error && (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-2xl"
            />
          </Document>
        )}
      </div>

      {/* Page thumbnails bar */}
      {numPages > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-black border-t border-gray-800 overflow-x-auto">
          {Array.from({ length: numPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setPageNumber(page)}
              className={`flex-shrink-0 w-10 h-14 flex items-center justify-center text-sm font-bold transition-colors ${page === pageNumber
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 hover:bg-gray-700'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
