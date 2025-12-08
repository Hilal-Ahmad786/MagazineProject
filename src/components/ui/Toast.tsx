'use client'

import { cn } from '@/lib/utils/cn'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export function Toast({ message, type = 'info', duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg animate-slide-up',
        {
          'bg-green-500 text-white': type === 'success',
          'bg-red-500 text-white': type === 'error',
          'bg-blue-500 text-white': type === 'info',
        }
      )}
    >
      {message}
    </div>
  )
}
