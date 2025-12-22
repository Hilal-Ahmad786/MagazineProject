'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const PDFViewer = dynamic(
  () => import('@/components/pdf/PDFViewer').then(mod => mod.PDFViewer),
  { ssr: false }
)

interface PDFReaderClientProps {
  pdfUrl: string
  title: string
  issueId: string
}

export function PDFReaderClient({ pdfUrl, title, issueId }: PDFReaderClientProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleClose = () => {
    router.push(`/sayilar/${issueId}`)
  }

  return (
    <div className="h-screen">
      <PDFViewer
        url={pdfUrl}
        title={title}
        onClose={handleClose}
      />
    </div>
  )
}
