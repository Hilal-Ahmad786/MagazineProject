# Mazhar Dergisi - Öncelikli Özellikler

Bu paket 4 öncelikli özelliği içerir:

1. **Newsletter Formu** - Mailchimp/ConvertKit entegrasyonu
2. **Yorum Sistemi** - Yazılara yorum yapabilme
3. **Okuma Listesi** - Favorilere ekleme (localStorage)
4. **Dark/Light Mode** - Tema değiştirici

---

## 📁 DOSYA YAPISI

```
src/
├── app/
│   └── api/
│       └── newsletter/
│           └── route.ts          ← API Route
├── components/
│   ├── Providers.tsx             ← TÜM PROVIDERS (GÜNCELLENMİŞ)
│   ├── newsletter/
│   │   ├── NewsletterForm.tsx
│   │   └── index.ts
│   ├── comments/
│   │   ├── CommentSection.tsx
│   │   ├── CommentForm.tsx
│   │   ├── Comment.tsx
│   │   └── index.ts
│   ├── reading-list/
│   │   ├── AddToListButton.tsx
│   │   ├── ReadingListPanel.tsx
│   │   └── index.ts
│   ├── theme/
│   │   ├── ThemeToggle.tsx
│   │   └── index.ts
│   └── layout/
│       └── Header.example.tsx    ← ÖRNEK HEADER
├── contexts/
│   ├── CommentsContext.tsx
│   ├── ReadingListContext.tsx
│   └── ThemeContext.tsx
└── styles/
    └── theme-variables.css       ← TEMA CSS DEĞİŞKENLERİ
```

---

## 🔧 KURULUM

### 1. Dosyaları Kopyalayın

Tüm klasörleri projenize kopyalayın:
- `src/components/newsletter/`
- `src/components/comments/`
- `src/components/reading-list/`
- `src/components/theme/`
- `src/contexts/` (yeni dosyaları ekleyin)
- `src/app/api/newsletter/`
- `src/styles/theme-variables.css`

### 2. Providers.tsx'i Güncelleyin

Mevcut `src/components/Providers.tsx` dosyanızı bu paketteki ile DEĞİŞTİRİN.

### 3. CSS'i Import Edin

`src/app/layout.tsx` veya `src/styles/globals.css` içine:

```css
@import './theme-variables.css';
```

### 4. Newsletter API için .env.local

```env
# Mailchimp
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_AUDIENCE_ID=your-audience-id
MAILCHIMP_API_SERVER=us1

# veya ConvertKit
CONVERTKIT_API_KEY=your-api-key
CONVERTKIT_FORM_ID=your-form-id
```

---

## 📖 KULLANIM

### 1. Newsletter Formu

```tsx
import { NewsletterForm } from '@/components/newsletter'

// 3 variant mevcut: default, compact, footer
<NewsletterForm />
<NewsletterForm variant="compact" />
<NewsletterForm variant="footer" />
```

### 2. Yorum Sistemi

Yazı detay sayfasında (`/yazilar/[slug]/page.tsx`):

```tsx
import { CommentSection } from '@/components/comments'

export default function ArticlePage() {
  return (
    <article>
      {/* ... yazı içeriği ... */}
      
      {/* Yorumlar */}
      <CommentSection articleId={article.id} />
    </article>
  )
}
```

### 3. Okuma Listesi

#### Yazı kartlarına bookmark butonu ekleyin:

```tsx
import { AddToListButton } from '@/components/reading-list'

<div className="relative">
  <ArticleCard article={article} />
  <AddToListButton 
    variant="card"
    item={{
      id: article.id,
      type: 'article',
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      image: article.featuredImage,
      author: article.author?.fullName
    }}
  />
</div>
```

#### layout.tsx'e ReadingListPanel ekleyin:

```tsx
import { ReadingListPanel } from '@/components/reading-list'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {/* ... */}
          <ReadingListPanel />
        </Providers>
      </body>
    </html>
  )
}
```

### 4. Dark/Light Mode

#### Header'a ThemeToggle ekleyin:

```tsx
import { ThemeToggle } from '@/components/theme'

// 3 variant: default, icon, switch
<ThemeToggle variant="icon" />
```

#### Footer veya Settings'de:

```tsx
<ThemeToggle variant="switch" />
```

---

## 🎨 TEMA DEĞİŞKENLERİ

CSS değişkenleri ile tema renkleri:

```css
/* Dark (varsayılan) */
--color-bg-primary: #000000;
--color-text-primary: #ffffff;
--color-accent: #facc15;

/* Light */
--color-bg-primary: #ffffff;
--color-text-primary: #111827;
--color-accent: #ca8a04;
```

Kullanım:
```tsx
<div className="bg-theme-primary text-theme-primary">
  ...
</div>
```

---

## 🧪 TEST

```bash
npm run dev

# Newsletter: Ana sayfada veya Footer'da formu test edin
# Yorumlar: /yazilar/[slug] sayfasında yorum yapın
# Okuma Listesi: Sağ alt köşedeki bookmark butonuna tıklayın
# Tema: Header'daki güneş/ay ikonuna tıklayın
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **localStorage**: Yorumlar ve Okuma Listesi localStorage kullanır (backend gerekmez)
2. **Newsletter**: API route Mailchimp veya ConvertKit ile çalışır
3. **Tema**: CSS değişkenleri ile tam özelleştirme mümkün
4. **SSR**: Tüm context'ler client-side, hydration sorunları çözülmüş

---

## 🚀 ÜRETİM İÇİN

1. Newsletter için gerçek API anahtarlarını `.env.local`'a ekleyin
2. Yorumlar için backend API entegrasyonu ekleyebilirsiniz
3. Okuma listesi için user authentication eklenebilir
