'use client'

import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) throw new Error('Subscription failed');

      setEmail('')
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      setStatus('idle');
    }
  }

  return (
    <section className="bg-yellow-400 py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent mb-4 uppercase tracking-tight">
          Abone Olun
        </h2>

        <p className="text-lg text-black/80 mb-8 font-medium">
          Her yeni sayımızdan ve özel içeriklerimizden haberdar olmak için e-posta bültenimize katılın.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center p-8 bg-black/5 rounded-2xl border-2 border-black/10 max-w-xl mx-auto animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-black text-yellow-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-black mb-2">Bültene Abonesiniz ✨</h3>
            <p className="text-black/70">Aramıza hoş geldiniz!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 bg-white text-black placeholder:text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-10 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {status === 'loading' ? (
                <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                'Abone Ol'
              )}
            </button>
          </form>
        )}

        <p className="text-xs text-black/60 mt-6">
          Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </section>
  )
}
