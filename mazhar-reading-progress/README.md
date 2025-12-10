# Mazhar Dergisi v2 - Reading Progress System

Makale okuma ilerlemesi için progress bar, circle indicator ve stats component'leri.

## 📦 İçerik

```
src/components/reading-progress/
├── ReadingProgressBar.tsx    # Yatay progress bar (3 varyant)
├── ReadingProgressCircle.tsx # Dairesel indicator + scroll to top
├── ReadingStats.tsx          # Okuma istatistikleri (3 varyant)
└── index.ts                  # Merkezi export
```

## 🔌 Bağımlılıklar

Bu paket **Foundation Package** gerektirir:
- `cn` from `@/lib/utils`

## 🚀 Kurulum

### Adım 1: Dosyaları Kopyala

```
src/components/reading-progress/ → Projenize kopyalayın
```

### Adım 2: Makale Sayfasında Kullan

```tsx
// src/app/yazilar/[slug]/page.tsx
import { 
  ReadingProgressBar, 
  ReadingProgressCircle,
  ReadingStats 
} from '@/components/reading-progress'

export default function ArticlePage({ article }) {
  return (
    <>
      {/* Üstte progress bar */}
      <ReadingProgressBar />
      
      {/* Sağ altta dairesel indicator */}
      <ReadingProgressCircle />

      <article>
        {/* Header */}
        <header>
          <h1>{article.title}</h1>
          <ReadingStats readingTime={article.readingTime} variant="inline" />
        </header>
        
        {/* Content */}
        <div className="prose">
          {article.content}
        </div>
      </article>
    </>
  )
}
```

## 🎨 Component API

### ReadingProgressBar

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `target` | `string` | `'article'` | Takip edilecek element selector |
| `position` | `'top' \| 'bottom'` | `'top'` | Bar pozisyonu |
| `height` | `number` | `3` | Bar yüksekliği (px) |
| `showPercentage` | `boolean` | `false` | Yüzde göster |
| `variant` | `'primary' \| 'gradient' \| 'rainbow'` | `'primary'` | Renk varyantı |
| `showAfterScroll` | `number` | `0` | Scroll sonrası göster (px) |
| `zIndex` | `number` | `50` | z-index değeri |

### ReadingProgressCircle

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `target` | `string` | `'article'` | Takip edilecek element |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Boyut |
| `showPercentage` | `boolean` | `true` | Yüzde göster |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Pozisyon |
| `showAfterScroll` | `number` | `100` | Scroll sonrası göster |
| `scrollToTop` | `boolean` | `true` | Tıklayınca başa dön |
| `zIndex` | `number` | `40` | z-index değeri |

### ReadingStats

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `readingTime` | `number` | required | Toplam okuma süresi (dk) |
| `target` | `string` | `'article'` | Takip edilecek element |
| `variant` | `'inline' \| 'badge' \| 'detailed'` | `'inline'` | Görünüm |
| `showAfterScroll` | `number` | `0` | Scroll sonrası göster |
| `position` | `'top-center' \| 'bottom-center'` | `'top-center'` | Fixed pozisyon |
| `fixed` | `boolean` | `false` | Fixed positioning |

## 🎯 Özellikler

### ReadingProgressBar
- ✅ **3 renk varyantı** - primary, gradient, rainbow
- ✅ **Üst/alt pozisyon** - Configurable
- ✅ **Yüzde gösterimi** - Opsiyonel tooltip
- ✅ **Scroll sonrası göster** - Configurable delay
- ✅ **Smooth animasyon** - 150ms transition

### ReadingProgressCircle
- ✅ **3 boyut** - sm, md, lg
- ✅ **4 pozisyon** - Dört köşe
- ✅ **Scroll to top** - Tıklayınca başa dön
- ✅ **SVG circle** - Smooth progress
- ✅ **Backdrop blur** - Modern görünüm

### ReadingStats
- ✅ **3 varyant** - inline, badge, detailed
- ✅ **Kalan süre** - Otomatik hesaplama
- ✅ **Tamamlandı** - Completion state
- ✅ **Fixed mode** - Floating badge

## 📐 Kullanım Örnekleri

### Temel Kullanım

```tsx
// Sadece progress bar
<ReadingProgressBar />

// Sadece circle indicator
<ReadingProgressCircle />

// İkisi birlikte
<>
  <ReadingProgressBar />
  <ReadingProgressCircle />
</>
```

### Progress Bar Varyantları

```tsx
// Primary (default)
<ReadingProgressBar variant="primary" />

// Gradient
<ReadingProgressBar variant="gradient" />

// Rainbow
<ReadingProgressBar variant="rainbow" />

// Kalın bar
<ReadingProgressBar height={5} />

// Yüzde ile
<ReadingProgressBar showPercentage />

// Header sonrası göster
<ReadingProgressBar showAfterScroll={200} />
```

### Circle Varyantları

```tsx
// Default
<ReadingProgressCircle />

// Sol alt köşe
<ReadingProgressCircle position="bottom-left" />

// Büyük boyut
<ReadingProgressCircle size="lg" />

// Yüzde yerine ok ikonu
<ReadingProgressCircle showPercentage={false} />

// Scroll to top deaktif
<ReadingProgressCircle scrollToTop={false} />
```

### Stats Varyantları

```tsx
// Inline (makale başlığında)
<ReadingStats readingTime={8} variant="inline" />

// Badge (floating)
<ReadingStats 
  readingTime={8} 
  variant="badge" 
  fixed 
  showAfterScroll={300}
/>

// Detailed (sidebar için)
<ReadingStats readingTime={8} variant="detailed" />
```

### Custom Target

```tsx
// Farklı element takibi
<ReadingProgressBar target=".article-content" />
<ReadingProgressCircle target="#main-content" />
```

## 📱 Önerilen Layout

```tsx
// src/app/yazilar/[slug]/page.tsx
export default function ArticlePage({ article }) {
  return (
    <>
      {/* Fixed: Progress bar en üstte */}
      <ReadingProgressBar 
        showAfterScroll={100}
        variant="primary"
      />
      
      {/* Fixed: Circle sağ altta */}
      <ReadingProgressCircle 
        showAfterScroll={300}
        scrollToTop
      />

      <article className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          {/* Inline stats */}
          <ReadingStats 
            readingTime={article.readingTime} 
            variant="inline"
          />
        </header>
        
        <div className="prose prose-lg">
          {article.content}
        </div>
      </article>
    </>
  )
}
```

## 🧮 Progress Hesaplama

Progress şu formülle hesaplanır:

```
progress = (scrolledPast / totalScrollable) * 100

scrolledPast = scrollY - elementTop + windowHeight
totalScrollable = elementHeight
```

- `0%` - Element henüz görünür değil
- `50%` - Element yarısı okundu
- `100%` - Element tamamen okundu

## 🔗 İlgili Dosyalar

- `@/hooks/useScrollProgress.ts` - Foundation'daki scroll hooks
- `@/hooks/useReadingTracker.ts` - Analytics için reading tracker

---

**Version:** 2.9.0-reading-progress
**Date:** December 2024
