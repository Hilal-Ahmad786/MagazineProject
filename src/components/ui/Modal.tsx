'use client'

import { cn } from '@/lib/utils/cn'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-mazhar-dark rounded-md p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {title && (
          <h2 className="text-h3 mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  )
}
