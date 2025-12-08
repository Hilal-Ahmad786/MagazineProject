'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'footer'
}

export function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Başarıyla abone oldunuz!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Bir hata oluştu.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.')
    }
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Abone Ol'}
        </button>
      </form>
    )
  }

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Gönderiliyor...' : 'Bülten\'e Abone Ol'}
        </button>
        {status !== 'idle' && (
          <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>
    )
  }

  // Default variant
  return (
    <div className="bg-gray-900 p-8 md:p-12">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-black mb-4">
          BÜLTENİMİZE ABONE OLUN
        </h3>
        <p className="text-gray-400 mb-8">
          Her yeni sayıda en güncel yazıları ve özel içerikleri e-posta adresinize gönderelim.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 text-lg"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Abone Ol'}
            </button>
          </div>
          
          {status !== 'idle' && (
            <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-gray-600 text-xs mt-6">
          Abone olarak gizlilik politikamızı kabul etmiş olursunuz. İstediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </div>
  )
}
