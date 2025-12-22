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
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('scroll') // Default to scroll as requested

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
      if (viewMode === 'single') {
        if (e.key === 'ArrowLeft') goToPrevPage()
        if (e.key === 'ArrowRight') goToNextPage()
      }
      if (e.key === 'Escape' && onClose) onClose()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [numPages, onClose, goToPrevPage, goToNextPage, zoomIn, zoomOut, viewMode])

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-white/10 text-white z-50 shadow-lg">
        <div className="flex items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-white/80 hover:text-white"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {title && <span className="font-bold truncate max-w-[150px] md:max-w-md hidden md:block">{title}</span>}
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2">
          {viewMode === 'single' ? (
            <>
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-2 hover:bg-neutral-800 rounded-lg disabled:opacity-30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium w-16 text-center">{pageNumber} / {numPages}</span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="p-2 hover:bg-neutral-800 rounded-lg disabled:opacity-30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : (
            <span className="text-sm font-medium text-white/50">{numPages} Sayfa</span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-neutral-800 rounded-lg p-1 mr-2">
            <button
              onClick={() => setViewMode('scroll')}
              className={`p-1.5 rounded transition-all ${viewMode === 'scroll' ? 'bg-neutral-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
              title="Dikey Kaydırma"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`p-1.5 rounded transition-all ${viewMode === 'single' ? 'bg-neutral-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
              title="Tek Sayfa"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <button onClick={zoomOut} disabled={scale <= 0.5} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
          <span className="text-sm w-12 text-center hidden md:block">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} disabled={scale >= 3} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-neutral-900 flex flex-col items-center p-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-20">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-neutral-400">PDF yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <a href={url} download className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300">
              PDF&apos;i İndir
            </a>
          </div>
        )}

        {!error && (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="flex flex-col items-center gap-8 py-8"
          >
            {viewMode === 'single' ? (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-2xl bg-white"
                loading={<div className="w-[600px] h-[800px] bg-neutral-800 animate-pulse rounded-lg" />}
              />
            ) : (
              /* Scroll Mode - Render all pages */
              Array.from({ length: numPages }, (_, i) => (
                <div key={i} className="relative">
                  <Page
                    pageNumber={i + 1}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="shadow-2xl bg-white"
                    loading={<div className="w-[600px] h-[800px] bg-neutral-800 animate-pulse rounded-lg mb-8" />}
                  />
                  <div className="absolute top-2 -right-12 text-xs text-neutral-500 font-mono hidden xl:block">
                    #{i + 1}
                  </div>
                </div>
              ))
            )}
          </Document>
        )}
      </div>
    </div>
  )
}
