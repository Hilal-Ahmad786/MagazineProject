# Mazhar Dergisi v2 - Footer System

Tam özellikli footer: navigation links, newsletter, social media, copyright ve scroll to top.

## 📦 İçerik

```
src/components/footer/
├── Footer.tsx          # Ana footer (3 varyant)
├── FooterLinks.tsx     # Navigation linkleri
├── FooterNewsletter.tsx # Newsletter formu
├── FooterSocial.tsx    # Sosyal medya ikonları
├── FooterBottom.tsx    # Alt bar (copyright, legal)
└── index.ts            # Merkezi export
```

## 🔌 Bağımlılıklar

Bu paket **Foundation Package** gerektirir:
- `cn`, `isValidEmail` from `@/lib/utils`

## 🚀 Kurulum

### Adım 1: Dosyaları Kopyala

```
src/components/footer/ → Projenize kopyalayın
```

### Adım 2: Layout'a Footer Ekle

```tsx
// src/app/layout.tsx
import { Footer } from '@/components/footer'

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
```

## 🎨 Component API

### Footer

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `variant` | `'default' \| 'minimal' \| 'centered'` | `'default'` | Görünüm |
| `showNewsletter` | `boolean` | `true` | Newsletter göster |

### FooterLinks

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `groups` | `LinkGroup[]` | default list | Link grupları |

### FooterNewsletter

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `variant` | `'default' \| 'inline'` | `'default'` | Görünüm |
| `title` | `string` | `'Bültene Abone Ol'` | Başlık |
| `description` | `string` | - | Açıklama |

### FooterSocial

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `variant` | `'icons' \| 'inline' \| 'buttons'` | `'icons'` | Görünüm |
| `links` | `SocialLink[]` | default list | Sosyal linkler |

### FooterBottom

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `variant` | `'default' \| 'simple'` | `'default'` | Görünüm |

## 🎯 Özellikler

- ✅ **3 footer varyantı** - default, minimal, centered
- ✅ **Navigation links** - 3 sütun, özelleştirilebilir
- ✅ **Newsletter form** - Inline ve default varyant
- ✅ **Social icons** - 5 platform (Twitter, Instagram, YouTube, LinkedIn, Spotify)
- ✅ **Copyright bar** - Legal linkler
- ✅ **Scroll to top** - Animasyonlu button
- ✅ **Already subscribed** - Abone kontrolü
- ✅ **Responsive** - Mobil uyumlu

## 📐 Varyant Örnekleri

### Footer Varyantları

```tsx
// Default - tam özellikli
<Footer />

// Minimal - tek satır
<Footer variant="minimal" />

// Centered - ortalanmış
<Footer variant="centered" />

// Newsletter olmadan
<Footer showNewsletter={false} />
```

### FooterSocial Varyantları

```tsx
// Icons - sadece ikonlar (default)
<FooterSocial variant="icons" />

// Inline - ikon + label
<FooterSocial variant="inline" />

// Buttons - buton görünümü
<FooterSocial variant="buttons" />
```

### Özel Link Grupları

```tsx
const customGroups = [
  {
    title: 'Ürünler',
    links: [
      { label: 'Özellikler', href: '/ozellikler' },
      { label: 'Fiyatlar', href: '/fiyatlar' },
    ],
  },
  {
    title: 'Kaynaklar',
    links: [
      { label: 'Dökümanlar', href: 'https://docs.site.com', external: true },
      { label: 'API', href: '/api' },
    ],
  },
]

<FooterLinks groups={customGroups} />
```

### Özel Sosyal Linkler

```tsx
const customSocial = [
  {
    name: 'GitHub',
    href: 'https://github.com/...',
    icon: <GitHubIcon />,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/...',
    icon: <DiscordIcon />,
  },
]

<FooterSocial links={customSocial} />
```

## 🎨 Default Link Grupları

```tsx
// Keşfet
- Yazılar → /yazilar
- Yazarlar → /yazarlar
- Sayılar → /sayilar
- Kategoriler → /kategoriler
- Arşiv → /arsiv

// Dergi
- Hakkımızda → /hakkimizda
- Ekibimiz → /ekip
- İletişim → /iletisim
- Yazar Ol → /yazar-basvurusu
- Reklam → /reklam

// Yasal
- Gizlilik Politikası → /gizlilik
- Kullanım Şartları → /kullanim-sartlari
- Çerez Politikası → /cerezler
- KVKK → /kvkk
```

## 🌐 Default Sosyal Linkler

- Twitter: @mazhardergisi
- Instagram: @mazhardergisi
- YouTube: @mazhardergisi
- LinkedIn: /company/mazhardergisi
- Spotify: /show/mazhardergisi

## 💾 localStorage

Newsletter abonelik durumu:
- `newsletter_subscribed` - `'true'` değeri
- `newsletter_email` - Abone e-postası

## 🔗 İlgili Dosyalar

- `@/components/newsletter/` - Newsletter system
- `@/lib/utils.ts` - cn, isValidEmail

---

**Version:** 2.9.0-footer
**Date:** December 2024
