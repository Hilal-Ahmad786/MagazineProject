'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const interestAreas = [
  'Edebiyat',
  'Felsefe',
  'Sanat',
  'Toplum',
  'Şehir',
  'Estetik',
  'Tarih',
  'Psikoloji',
  'Teknoloji',
  'Diğer',
]

export function AuthorApplicationForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    bio: '',
    interests: [] as string[],
    sampleWork: '',
    portfolio: '',
    motivation: '',
  })

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/author-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          occupation: '',
          bio: '',
          interests: [],
          sampleWork: '',
          portfolio: '',
          motivation: '',
        })
      } else {
        setStatus('error')
        setMessage(data.error || 'Bir hata oluştu.')
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
        <h3 className="text-2xl font-bold mb-4 text-green-500">Başvurunuz Alındı!</h3>
        <p className="text-gray-400">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">
            Meslek
          </label>
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2">
          Kısa Biyografi *
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400 resize-none"
          placeholder="Kendinizi kısaca tanıtın..."
          required
        />
      </div>

      {/* Interest Areas */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-3">
          İlgi Alanları *
        </label>
        <div className="flex flex-wrap gap-2">
          {interestAreas.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`px-4 py-2 text-sm font-bold transition-colors ${formData.interests.includes(interest)
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Sample Work */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2">
          Örnek Yazı *
        </label>
        <textarea
          value={formData.sampleWork}
          onChange={(e) => setFormData({ ...formData, sampleWork: e.target.value })}
          rows={8}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400 resize-none"
          placeholder="Daha önce yazdığınız bir yazıyı veya yeni bir örnek paylaşın..."
          required
        />
      </div>

      {/* Portfolio Link */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2">
          Portfolyo / Blog Linki
        </label>
        <input
          type="url"
          value={formData.portfolio}
          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
          placeholder="https://"
        />
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-2">
          Neden Mazhar Dergisi? *
        </label>
        <textarea
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400 resize-none"
          placeholder="Neden Mazhar Dergisi'nde yazmak istiyorsunuz?"
          required
        />
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400">
          {message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || formData.interests.length === 0}
        className="w-full py-4 bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
      </button>

      <p className="text-gray-600 text-sm text-center">
        Başvurunuz editör ekibimiz tarafından değerlendirilecek ve en geç 2 hafta içinde yanıt verilecektir.
      </p>
    </form>
  )
}
