# Mazhar Dergisi v2 - Article Share System

Sosyal medya paylaşım butonları: Twitter, Facebook, WhatsApp, LinkedIn, Telegram, E-posta ve link kopyalama.

## 📦 İçerik

```
src/components/share/
├── ShareButton.tsx     # Tekil platform butonu (6 platform)
├── ShareButtons.tsx    # Buton grubu
├── ShareModal.tsx      # Paylaşım modal'ı
├── ShareTrigger.tsx    # Modal açma butonu
├── CopyLinkButton.tsx  # Link kopyalama
└── index.ts            # Merkezi export
```

## 🔌 Bağımlılıklar

Bu paket **Foundation Package** gerektirir:
- `cn` from `@/lib/utils`

## 🚀 Kurulum

### Adım 1: Dosyaları Kopyala

```
src/components/share/ → Projenize kopyalayın
```

### Adım 2: Kullanım

```tsx
// Makale sayfasında
import { ShareTrigger, ShareButtons } from '@/components/share'

export default function ArticlePage({ article }) {
  const articleUrl = `https://mazhar.com/yazilar/${article.slug}`

  return (
    <article>
      <header>
        <h1>{article.title}</h1>
        
        {/* Tek buton ile modal */}
        <ShareTrigger
          url={articleUrl}
          title={article.title}
          description={article.excerpt}
          image={article.image}
        />
        
        {/* veya inline butonlar */}
        <ShareButtons
          url={articleUrl}
          title={article.title}
        />
      </header>
    </article>
  )
}
```

## 🎨 Component API

### ShareButton

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `platform` | `SharePlatform` | required | Platform adı |
| `url` | `string` | required | Paylaşılacak URL |
| `title` | `string` | required | Paylaşım başlığı |
| `description` | `string` | - | Açıklama |
| `variant` | `'icon' \| 'button' \| 'pill'` | `'icon'` | Görünüm |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Boyut |

### ShareButtons

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `url` | `string` | required | Paylaşılacak URL |
| `title` | `string` | required | Paylaşım başlığı |
| `platforms` | `SharePlatform[]` | `['twitter', 'facebook', 'whatsapp', 'linkedin']` | Platformlar |
| `showCopy` | `boolean` | `true` | Kopyala butonu göster |
| `variant` | `'icon' \| 'button' \| 'pill'` | `'icon'` | Görünüm |
| `layout` | `'horizontal' \| 'vertical' \| 'grid'` | `'horizontal'` | Yerleşim |

### ShareModal

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `isOpen` | `boolean` | required | Modal açık mı |
| `onClose` | `() => void` | required | Kapatma handler |
| `url` | `string` | required | Paylaşılacak URL |
| `title` | `string` | required | Başlık |
| `description` | `string` | - | Açıklama |
| `image` | `string` | - | Önizleme görseli |
| `platforms` | `SharePlatform[]` | all | Platformlar |

### ShareTrigger

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `url` | `string` | required | Paylaşılacak URL |
| `title` | `string` | required | Başlık |
| `variant` | `'icon' \| 'button' \| 'text'` | `'button'` | Görünüm |
| `label` | `string` | `'Paylaş'` | Buton metni |
| `useNativeFirst` | `boolean` | `true` | Native share öncelikli |

### CopyLinkButton

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `url` | `string` | required | Kopyalanacak URL |
| `variant` | `'icon' \| 'button' \| 'pill' \| 'input'` | `'button'` | Görünüm |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Boyut |

## 🎯 Desteklenen Platformlar

| Platform | Renk | URL Şablonu |
|----------|------|-------------|
| `twitter` | #1DA1F2 | `twitter.com/intent/tweet` |
| `facebook` | #1877F2 | `facebook.com/sharer/sharer.php` |
| `whatsapp` | #25D366 | `wa.me/?text=` |
| `linkedin` | #0A66C2 | `linkedin.com/sharing/share-offsite` |
| `telegram` | #0088cc | `t.me/share/url` |
| `email` | zinc | `mailto:?subject=&body=` |

## 📐 Kullanım Örnekleri

### ShareTrigger ile Modal

```tsx
// En basit kullanım - tek buton
<ShareTrigger
  url="https://mazhar.com/yazi-1"
  title="Harika Bir Yazı"
/>

// Tüm özelliklerle
<ShareTrigger
  url={articleUrl}
  title={article.title}
  description={article.excerpt}
  image={article.image}
  variant="button"
  size="md"
  label="Paylaş"
  useNativeFirst={true}
/>
```

### ShareButtons ile Inline

```tsx
// Default - icon buttons
<ShareButtons
  url={articleUrl}
  title={article.title}
/>

// Seçili platformlar
<ShareButtons
  url={articleUrl}
  title={article.title}
  platforms={['twitter', 'whatsapp']}
  showCopy={true}
/>

// Button varyantı
<ShareButtons
  url={articleUrl}
  title={article.title}
  variant="button"
  layout="vertical"
/>

// Grid layout
<ShareButtons
  url={articleUrl}
  title={article.title}
  variant="pill"
  layout="grid"
/>
```

### Tekil ShareButton

```tsx
// Sadece Twitter
<ShareButton
  platform="twitter"
  url={articleUrl}
  title={article.title}
  variant="icon"
/>

// WhatsApp button
<ShareButton
  platform="whatsapp"
  url={articleUrl}
  title={article.title}
  variant="button"
  size="lg"
/>
```

### CopyLinkButton

```tsx
// Icon
<CopyLinkButton url={articleUrl} variant="icon" />

// Button
<CopyLinkButton url={articleUrl} variant="button" />

// Input + button
<CopyLinkButton url={articleUrl} variant="input" />
```

## 📱 Native Share API

Modern tarayıcılarda (özellikle mobil) native paylaşım API'si desteklenir:

```tsx
// Native share öncelikli (default)
<ShareTrigger useNativeFirst={true} ... />

// Her zaman modal göster
<ShareTrigger useNativeFirst={false} ... />
```

Native share desteklenen cihazlarda:
- iOS Safari
- Android Chrome
- Bazı desktop tarayıcılar

## 🎨 Önerilen Layout

### Makale Header'ında

```tsx
<header className="flex items-center justify-between">
  <div>
    <h1>{article.title}</h1>
    <p>{article.excerpt}</p>
  </div>
  <ShareTrigger
    url={articleUrl}
    title={article.title}
    variant="icon"
    size="lg"
  />
</header>
```

### Makale Sonunda

```tsx
<footer className="border-t border-zinc-800 pt-8">
  <h4 className="font-bold mb-4">Bu yazıyı paylaş</h4>
  <ShareButtons
    url={articleUrl}
    title={article.title}
    platforms={['twitter', 'facebook', 'whatsapp', 'linkedin', 'telegram']}
    showCopy={true}
  />
</footer>
```

### Floating Button

```tsx
<div className="fixed bottom-6 right-6 z-40">
  <ShareTrigger
    url={articleUrl}
    title={article.title}
    variant="icon"
    size="lg"
    className="shadow-lg"
  />
</div>
```

## 🔗 İlgili Dosyalar

- `@/lib/utils.ts` - cn helper

---

**Version:** 2.9.0-share
**Date:** December 2024
