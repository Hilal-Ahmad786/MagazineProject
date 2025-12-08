'use client'

import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
    alert('Bülten aboneliği için teşekkürler!')
  }

  return (
    <section className="bg-gradient-to-br from-yellow-400 to-yellow-500 py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
          ABONE OLUN
        </h2>
        
        <p className="text-lg md:text-xl text-black/80 mb-10 max-w-2xl mx-auto">
          Her yeni sayımızdan ve özel içeriklerimizden haberdar olmak için e-posta bültenimize katılın.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            required
            className="flex-1 px-6 py-4 bg-white text-black placeholder:text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-10 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors whitespace-nowrap"
          >
            Abone Ol
          </button>
        </form>

        <p className="text-xs text-black/60 mt-6">
          Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </section>
  )
}
