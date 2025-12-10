# Mazhar Dergisi v2 - Foundation Package

Bu paket, Mazhar Dergisi v2 projesinin temel yapı taşlarını içerir.

## 📦 İçerik

### Types (`src/types/`)
- `article.ts` - Makale tipleri
- `author.ts` - Yazar tipleri  
- `issue.ts` - Sayı tipleri
- `comment.ts` - Yorum tipleri
- `index.ts` - Merkezi export + ortak tipler

### Contexts (`src/contexts/`)
- `ThemeContext.tsx` - Dark/Light mod yönetimi
- `SearchContext.tsx` - Global arama sistemi
- `ReadingListContext.tsx` - Okuma listesi yönetimi
- `CommentsContext.tsx` - Yorum sistemi
- `AnalyticsContext.tsx` - Okuma istatistikleri
- `LanguageContext.tsx` - TR/EN dil desteği
- `index.ts` - Merkezi export

### Hooks (`src/hooks/`)
- `useLocalStorage.ts` - localStorage hook
- `useMediaQuery.ts` - Responsive breakpoint hooks
- `useScrollProgress.ts` - Scroll tracking hooks
- `useReadingTracker.ts` - Makale okuma takibi
- `usePWA.ts` - PWA işlevleri
- `index.ts` - Merkezi export + ek utility hooks

### Lib (`src/lib/`)
- `utils.ts` - Yardımcı fonksiyonlar (cn, formatDate, debounce, etc.)
- `constants.ts` - Sabitler (navigation, storage keys, config)
- `i18n/translations.ts` - TR/EN çeviriler

### Components (`src/components/`)
- `Providers.tsx` - Tüm context'leri saran wrapper

## 🚀 Kurulum

1. ZIP dosyasını açın
2. Dosyaları projenizin `src/` klasörüne kopyalayın
3. Gerekli bağımlılıkları yükleyin:

```bash
npm install clsx tailwind-merge
```

4. `@/` path alias'ının tsconfig.json'da tanımlı olduğundan emin olun:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📝 Kullanım

### Layout.tsx'de Providers Ekleme

```tsx
// src/app/layout.tsx
import { Providers } from '@/components/Providers'

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="dark">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### Context Hook'larını Kullanma

```tsx
// Herhangi bir client component'te
'use client'

import { useTheme, useSearch, useTranslation } from '@/hooks'

export function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  const { openSearch } = useSearch()
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button onClick={openSearch}>
        {t('common.search')}
      </button>
    </div>
  )
}
```

### Makale Okuma Takibi

```tsx
// src/app/yazilar/[slug]/page.tsx
'use client'

import { useReadingTracker } from '@/hooks'

export default function ArticlePage({ article }) {
  useReadingTracker(article.id)
  
  return <article>...</article>
}
```

### Type'ları Kullanma

```tsx
import type { Article, Author, Issue, Comment } from '@/types'

const article: Article = {
  id: '1',
  slug: 'ornek-yazi',
  title: 'Örnek Yazı',
  // ...
}
```

## 📁 Dosya Listesi

```
src/
├── components/
│   └── Providers.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   ├── SearchContext.tsx
│   ├── ReadingListContext.tsx
│   ├── CommentsContext.tsx
│   ├── AnalyticsContext.tsx
│   ├── LanguageContext.tsx
│   └── index.ts
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── useScrollProgress.ts
│   ├── useReadingTracker.ts
│   ├── usePWA.ts
│   └── index.ts
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   ├── i18n/
│   │   ├── translations.ts
│   │   └── index.ts
│   └── index.ts
└── types/
    ├── article.ts
    ├── author.ts
    ├── issue.ts
    ├── comment.ts
    └── index.ts
```

## ⚠️ Önemli Notlar

1. **Tüm context'ler `'use client'` direktifi gerektirir**

2. **SearchProvider'a data geçirmek için:**
```tsx
<SearchProvider
  articles={articlesData}
  authors={authorsData}
  issues={issuesData}
>
```

3. **localStorage Keys:**
- `mazhar_theme` - Tema tercihi
- `mazhar_locale` - Dil tercihi
- `mazhar_reading_list` - Okuma listesi
- `mazhar_comments` - Yorumlar
- `mazhar_analytics` - Okuma istatistikleri
- `mazhar_recent_searches` - Son aramalar

## 🔜 Sonraki Adımlar

Bu foundation paketini entegre ettikten sonra:

1. **Search System** - SearchModal, SearchInput, SearchResults
2. **Comments** - CommentSection, CommentForm, CommentList
3. **Reading List** - ReadingListButton, ReadingListDrawer
4. **Theme Toggle** - ThemeToggle component
5. **Language Switcher** - LanguageSwitcher component
6. **PWA** - manifest.json, sw.js, InstallPrompt

---

**Version:** 2.9.0-foundation
**Date:** December 2024
