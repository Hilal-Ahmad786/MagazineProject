'use client'

import { useState } from 'react'
import { sendContactNotification } from '@/lib/emailjs'

type Status = 'idle' | 'loading' | 'success' | 'error'

const subjects = [
  'Genel Soru',
  'İş Birliği Teklifi',
  'Reklam ve Sponsorluk',
  'Teknik Destek',
  'Öneri ve Şikayet',
  'Diğer',
]

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Send email via EmailJS
      const emailResult = await sendContactNotification({
        name: formData.name,
        email: formData.email,
        title: formData.subject,
        message: formData.message,
      })

      if (emailResult.success) {
        // Optionally also save to database via API
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          })
        } catch {
          // API save failed but email sent - still show success
          console.log('API save failed but email was sent')
        }

        setStatus('success')
        setMessage('Mesajınız alındı! En kısa sürede yanıt vereceğiz.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setMessage('E-posta gönderilemedi. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-green-500">Mesajınız Gönderildi!</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-gray-800 text-white font-bold hover:bg-yellow-400 hover:text-black transition-colors"
        >
          Yeni Mesaj Gönder
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">
            Adınız *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">
            E-posta *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2">
          Konu *
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
          required
        >
          <option value="">Konu seçin...</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2">
          Mesajınız *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400 resize-none"
          placeholder="Mesajınızı buraya yazın..."
          required
        />
      </div>

      {status === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
      </button>
    </form>
  )
}