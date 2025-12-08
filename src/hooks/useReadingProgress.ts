'use client'

import { useEffect, useState } from 'react'

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / height) * 100
      setProgress(progress)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}
