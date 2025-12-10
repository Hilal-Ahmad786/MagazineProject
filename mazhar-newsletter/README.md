# Mazhar Dergisi v2 - Newsletter System

30 saniye delay ile popup modal, inline form ve banner varyantları ile bülten abonelik sistemi.

## 📦 İçerik

```
src/components/newsletter/
├── NewsletterModal.tsx   # Popup modal (30s delay)
├── NewsletterForm.tsx    # Reusable form (3 varyant)
├── NewsletterBanner.tsx  # Inline banner (4 varyant)
└── index.ts              # Merkezi export
```

## 🔌 Bağımlılıklar

Bu paket **Foundation Package** gerektirir:
- `cn`, `isValidEmail` from `@/lib/utils`

## 🚀 Kurulum

### Adım 1: Dosyaları Kopyala

```
src/components/newsletter/ → Projenize kopyalayın
```

### Adım 2: Layout'a Modal Ekleyin

```tsx
// src/app/layout.tsx
import { NewsletterModal } from '@/components/newsletter'

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          {children}
          
          {/* 30 saniye sonra popup */}
          <NewsletterModal delay={30000} />
        </Providers>
      </body>
    </html>
  )
}
```

### Adım 3: Banner/Form Kullanımı (Opsiyonel)

```tsx
// Footer veya sidebar'da
import { NewsletterBanner } from '@/components/newsletter'

<NewsletterBanner variant="card" />
```

## 🎨 Component API

### NewsletterModal

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `delay` | `number` | `30000` | Gösterim gecikmesi (ms) |
| `cooldownDays` | `number` | `7` | Tekrar gösterme süresi |
| `onSubscribe` | `(email) => void` | - | Abone callback |

### NewsletterForm

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `onSubmit` | `(email) => void` | - | Submit callback |
| `onSuccess` | `() => void` | - | Başarı callback |
| `variant` | `'default' \| 'minimal' \| 'inline'` | `'default'` | Görünüm |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Boyut |
| `placeholder` | `string` | `'E-posta adresiniz'` | Placeholder |
| `buttonText` | `string` | `'Abone Ol'` | Buton metni |

### NewsletterBanner

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `variant` | `'default' \| 'compact' \| 'card' \| 'fullwidth'` | `'default'` | Görünüm |
| `title` | `string` | `'Bültene Abone Ol'` | Başlık |
| `description` | `string` | - | Açıklama |
| `onSubscribe` | `(email) => void` | - | Abone callback |

## 🎯 Özellikler

### Modal
- ✅ **30s delay** - Configurable gecikme
- ✅ **7 gün cooldown** - Tekrar gösterme engeli
- ✅ **ESC ile kapatma** - Klavye desteği
- ✅ **Backdrop click** - Dışına tıklayınca kapanır
- ✅ **Success state** - Başarı animasyonu
- ✅ **localStorage** - Durum persistance

### Form
- ✅ **3 varyant** - default, minimal, inline
- ✅ **Email validation** - Doğrulama
- ✅ **Loading state** - Yükleniyor animasyonu
- ✅ **Error handling** - Hata mesajları
- ✅ **Success state** - Onay gösterimi

### Banner
- ✅ **4 varyant** - default, compact, card, fullwidth
- ✅ **Already subscribed** - Abone kontrolü
- ✅ **Trust badges** - Güven işaretleri
- ✅ **Responsive** - Mobil uyumlu

## 💾 localStorage Keys

| Key | Açıklama |
|-----|----------|
| `newsletter_subscribed` | Abone durumu (`'true'`) |
| `newsletter_email` | Abone e-postası |
| `newsletter_modal_dismissed` | Modal kapatma zamanı |

## 📐 Varyant Örnekleri

### NewsletterModal

```tsx
// Default - 30 saniye sonra popup
<NewsletterModal />

// Özel delay - 1 dakika sonra
<NewsletterModal delay={60000} />

// Daha kısa cooldown - 3 gün
<NewsletterModal cooldownDays={3} />

// Custom handler
<NewsletterModal 
  onSubscribe={async (email) => {
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }} 
/>
```

### NewsletterForm

```tsx
// Default - tam form
<NewsletterForm />

// Inline - yan yana input ve buton
<NewsletterForm variant="inline" />

// Minimal - alt çizgi stili
<NewsletterForm variant="minimal" />
```

### NewsletterBanner

```tsx
// Default - flex layout
<NewsletterBanner />

// Compact - tek satır
<NewsletterBanner variant="compact" />

// Card - kart görünümü
<NewsletterBanner variant="card" />

// Fullwidth - section olarak
<NewsletterBanner 
  variant="fullwidth"
  title="Haftalık Bültenimize Katıl"
  description="Her hafta en iyi içerikleri e-posta kutunuza gönderiyoruz."
/>
```

## 🔗 API Entegrasyonu

Backend'e bağlamak için `onSubscribe` prop'unu kullanın:

```tsx
// src/app/layout.tsx
import { NewsletterModal } from '@/components/newsletter'

async function handleSubscribe(email: string) {
  const res = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  
  if (!res.ok) {
    throw new Error('Subscription failed')
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          {children}
          <NewsletterModal onSubscribe={handleSubscribe} />
        </Providers>
      </body>
    </html>
  )
}
```

## 📧 API Route Örneği

```ts
// src/app/api/newsletter/subscribe/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Mailchimp, ConvertKit, vb. entegrasyonu
    // await addToMailingList(email)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    )
  }
}
```

## 🔗 İlgili Dosyalar

- `@/lib/utils.ts` - isValidEmail helper
- `@/lib/constants.ts` - Storage keys

---

**Version:** 2.9.0-newsletter
**Date:** December 2024
