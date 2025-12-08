'use client'

import { useEffect } from 'react'
import { PDFViewer } from './PDFViewer'

interface PDFModalProps {
  url: string
  title?: string
  isOpen: boolean
  onClose: () => void
}

export function PDFModal({ url, title, isOpen, onClose }: PDFModalProps) {
  // Prevent body scroll
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative h-full">
        <PDFViewer url={url} title={title} onClose={onClose} />
      </div>
    </div>
  )
}
