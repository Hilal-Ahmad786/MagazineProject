# Mazhar Dergisi v2 - Search System

Tam ekran arama modal'ı, klavye navigasyonu ve grouped results ile gelişmiş arama sistemi.

## 📦 İçerik

```
src/components/search/
├── SearchModal.tsx      # Full-screen arama overlay
├── SearchButton.tsx     # Arama tetikleyici (3 varyant)
├── SearchInput.tsx      # Arama input field
├── SearchResults.tsx    # Grouped arama sonuçları
├── SearchResultItem.tsx # Tekil sonuç item
├── RecentSearches.tsx   # Son aramalar listesi
├── SearchHighlight.tsx  # Arama terimini vurgulama
└── index.ts             # Merkezi export
```

## 🔌 Bağımlılıklar

Bu paket **Foundation Package** gerektirir:
- `SearchContext` from `@/contexts`
- `cn` utility from `@/lib/utils`
- `SearchResult` type from `@/types`

## 🚀 Kurulum

1. Foundation paketinin kurulu olduğundan emin olun
2. `src/components/search/` klasörünü projenize kopyalayın

## 📝 Kullanım

### 1. Layout'a SearchModal Ekleyin

```tsx
// src/app/layout.tsx
import { Providers } from '@/components/Providers'
import { SearchModal } from '@/components/search'

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="dark">
      <body>
        <Providers>
          {children}
          <SearchModal />
        </Providers>
      </body>
    </html>
  )
}
```

### 2. Header'a SearchButton Ekleyin

```tsx
// src/components/Header.tsx
import { SearchButton } from '@/components/search'

export function Header() {
  return (
    <header>
      <nav>
        {/* ... navigation links ... */}
        
        {/* Icon variant (mobile) */}
        <SearchButton variant="icon" className="md:hidden" />
        
        {/* Input-like variant (desktop) */}
        <SearchButton variant="input" className="hidden md:flex" />
      </nav>
    </header>
  )
}
```

### 3. SearchProvider'a Data Geçirin

```tsx
// src/components/Providers.tsx
import { SearchProvider } from '@/contexts/SearchContext'
import articles from '@/data/articles.json'
import authors from '@/data/authors.json'
import issues from '@/data/issues.json'

export function Providers({ children }) {
  return (
    <SearchProvider
      articles={articles}
      authors={authors}
      issues={issues}
    >
      {children}
    </SearchProvider>
  )
}
```

## 🎨 Component Varyantları

### SearchButton

```tsx
// Icon only
<SearchButton variant="icon" size="md" />

// Button with text
<SearchButton variant="button" size="md" showShortcut />

// Input-like appearance
<SearchButton variant="input" size="md" showShortcut />
```

### SearchInput

```tsx
// Default with border
<SearchInput variant="default" size="md" />

// Minimal (underline only)
<SearchInput variant="minimal" size="lg" />

// Filled background
<SearchInput variant="filled" size="md" autoFocus />
```

### SearchResults

```tsx
// Grouped by type (default)
<SearchResults
  results={results}
  groupByType={true}
  maxResults={20}
/>

// Flat list
<SearchResults
  results={results}
  groupByType={false}
/>
```

## ⌨️ Klavye Kısayolları

| Kısayol | Aksiyon |
|---------|---------|
| `⌘/Ctrl + K` | Arama modal'ını aç/kapa |
| `↑` / `↓` | Sonuçlar arasında gezin |
| `Enter` | Seçili sonucu aç |
| `Escape` | Modal'ı kapat |

## 🎯 Özellikler

- ✅ Full-screen overlay modal
- ✅ Keyboard navigation (arrow keys)
- ✅ Global keyboard shortcut (⌘K)
- ✅ Grouped results by type
- ✅ Recent searches with localStorage
- ✅ Debounced search
- ✅ Loading & empty states
- ✅ Responsive design
- ✅ Dark theme support
- ✅ Animation on open/close

## 📐 Stil Özelleştirme

Component'ler `className` prop'u ile özelleştirilebilir:

```tsx
<SearchModal className="custom-modal" />
<SearchButton className="custom-button" />
<SearchInput className="custom-input" />
```

## 🔗 İlgili Dosyalar

- `@/contexts/SearchContext.tsx` - Search state yönetimi
- `@/types/index.ts` - SearchResult type
- `@/lib/constants.ts` - Storage keys, debounce delay

---

**Version:** 2.9.0-search
**Date:** December 2024
