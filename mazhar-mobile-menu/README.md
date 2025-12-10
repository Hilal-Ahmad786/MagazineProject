# Mazhar Dergisi v2 - Mobile Menu System

Animasyonlu slide-in panel, hamburger button ve tam özellikli mobil navigasyon.

## 📦 İçerik

```
src/components/mobile-menu/
├── MobileMenu.tsx       # Ana slide-in panel
├── MobileMenuButton.tsx # Animasyonlu hamburger toggle
├── MobileMenuItem.tsx   # Tekil menü item'ı
└── index.ts             # Merkezi export

src/components/
└── Header.tsx           # Tam entegre Header (güncellendi)
```

## 🔌 Bağımlılıklar

Bu paket şu paketleri gerektirir:
- **Foundation Package** - `cn`, `useScrollPast`
- **Theme System** - `ThemeToggle`
- **Search System** - `SearchButton`, `SearchModal`
- **Reading List** - `ReadingListToggle`, `ReadingListDrawer`

## 🚀 Kurulum

### Adım 1: Dosyaları Kopyala

```
src/components/mobile-menu/ → Projenize kopyala
src/components/Header.tsx   → Mevcut Header'ı değiştir
```

### Adım 2: Header'ı Kullan

```tsx
// src/app/layout.tsx
import { Header } from '@/components/Header'

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

### MobileMenu

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `isOpen` | `boolean` | required | Menü açık mı? |
| `onClose` | `() => void` | required | Kapatma handler |
| `navigation` | `NavigationItem[]` | default list | Menü linkleri |
| `socialLinks` | `SocialLink[]` | default list | Sosyal medya |
| `showThemeToggle` | `boolean` | `true` | Tema toggle göster |
| `showNewsletter` | `boolean` | `true` | Bülten linki göster |

### MobileMenuButton

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `isOpen` | `boolean` | required | Menü açık mı? |
| `onClick` | `() => void` | required | Tıklama handler |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Buton boyutu |

### MobileMenuItem

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `href` | `string` | required | Link URL |
| `label` | `string` | required | Link metni |
| `icon` | `ReactNode` | - | Opsiyonel ikon |
| `onClick` | `() => void` | - | Tıklama handler |
| `index` | `number` | `0` | Animasyon delay için |

## 🎯 Özellikler

- ✅ **Slide-in Panel** - Sağdan açılan tam ekran menü
- ✅ **Animated Hamburger** - Çizgili → X animasyonu
- ✅ **Backdrop Blur** - Arka plan bulanıklaştırma
- ✅ **ESC ile Kapatma** - Klavye desteği
- ✅ **Body Scroll Lock** - Açıkken scroll engelleme
- ✅ **Active Link** - Mevcut sayfa vurgusu
- ✅ **Theme Toggle** - Menü içinde tema değiştirme
- ✅ **Social Links** - Sosyal medya ikonları
- ✅ **Responsive** - lg breakpoint'te gizlenir
- ✅ **Staggered Animation** - Sıralı item animasyonu

## 📐 Kullanım Örnekleri

### Basit Kullanım

```tsx
import { MobileMenu, MobileMenuButton } from '@/components/mobile-menu'

function MyHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header>
        <MobileMenuButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </header>
      
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
```

### Özel Navigation

```tsx
const customNav = [
  { label: 'Blog', href: '/blog' },
  { label: 'Ürünler', href: '/urunler' },
  { label: 'Hizmetler', href: '/hizmetler' },
]

<MobileMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  navigation={customNav}
  showThemeToggle={false}
  showNewsletter={false}
/>
```

### İkonlu Navigation

```tsx
const navWithIcons = [
  { 
    label: 'Ana Sayfa', 
    href: '/',
    icon: <HomeIcon className="w-5 h-5" />
  },
  { 
    label: 'Yazılar', 
    href: '/yazilar',
    icon: <DocumentIcon className="w-5 h-5" />
  },
]
```

## 🎨 Animasyon Detayları

### Hamburger Button
- 3 çizgi → X dönüşümü
- `duration-300` geçiş süresi
- Rotation ve translate kombinasyonu

### Menu Panel
- `translate-x-full` → `translate-x-0`
- `duration-300 ease-out`
- Backdrop fade-in

### Menu Items
- Staggered animation (50ms delay per item)
- `slide-in-from-right` direction
- Hover'da sola kayma efekti

## 🔧 Tailwind Config

Animasyonlar için tailwind.config.ts'e ekleyin:

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
      },
      keyframes: {
        'slide-in-from-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
}
```

## 📱 Responsive Davranış

| Breakpoint | Davranış |
|------------|----------|
| `< 1024px` | Hamburger button görünür |
| `≥ 1024px` | Desktop navigation, hamburger gizli |

Resize olduğunda menü otomatik kapanır.

## 🔗 İlgili Dosyalar

- `@/components/theme/ThemeToggle.tsx`
- `@/components/search/SearchButton.tsx`
- `@/components/reading-list/ReadingListToggle.tsx`
- `@/hooks/useScrollPast.ts`

---

**Version:** 2.9.0-mobilemenu
**Date:** December 2024
