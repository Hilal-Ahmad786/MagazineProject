# Mazhar Dergisi v2.0 - Contemporary Bold Design

🎨 **Option 5: Contemporary Bold** tasarımı uygulanmıştır.

## 🆕 V2.0 YENİLİKLERİ

### Tasarım Değişiklikleri
- ✅ **Dark Theme**: Tam karanlık tema (siyah arka plan)
- ✅ **Bold Typography**: Güçlü, cesur tipografi (900 font weight)
- ✅ **Yellow Accent**: #FFD700 sarı renk vurgusu
- ✅ **Full-Screen Hero**: Tam ekran hero bölümü
- ✅ **Split Section**: İkiye bölünmüş layout (Latest Issue)
- ✅ **Dynamic Grid**: Esnek, modern grid sistemi
- ✅ **Contemporary Animations**: Hover efektleri ve geçişler

### Güncellenen Componentler

#### Layout
- `Header.tsx` - Fixed header, sarı logo, gradient background
- `Navbar.tsx` - Uppercase menü, hover efektleri
- `Footer.tsx` - 3 kolonlu dark footer, sarı aksenler

#### Home Page
- `HeroSection.tsx` - Full-screen, büyük tipografi, scroll indicator
- `LatestIssue.tsx` - Split section tasarımı (YENİ)
- `FeaturedArticles.tsx` - Dynamic grid, 12-column system
- `AuthorsSection.tsx` - Yuvarlak avatarlar, hover efektleri
- `NewsletterSection.tsx` - Sarı gradient background

#### UI Components
- `Button.tsx` - 3 varyant (primary=sarı, secondary=border, ghost)
- `Card.tsx` - Dark cards, sarı accent bar
- `Badge.tsx` - Uppercase, bold, sarı default

### Styling
- `globals.css` - Black background, white text, yellow primary
- `theme.css` - Contemporary animations, utilities
- `typography.css` - Dark mode typography
- `tailwind.config.ts` - Dark theme colors, custom animations

## 🚀 KURULUM

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Tarayıcıda aç
http://localhost:3000
```

## 🎨 TASARIM ÖZELLİKLERİ

### Renk Paleti
- **Primary**: #FFD700 (Sarı)
- **Background**: #000000 (Siyah)
- **Text**: #FFFFFF (Beyaz)
- **Gray-800**: #1a1a1a (Koyu gri)
- **Gray-700**: #2a2a2a (Orta gri)
- **Accent**: #FFA500 (Turuncu)

### Tipografi
- **Font**: Helvetica Neue, Arial, sans-serif
- **Heading Weight**: 900 (Black)
- **Body Weight**: 400 (Regular)
- **Letter Spacing**: -0.02em (tight)

### Animasyonlar
- `animate-fade-in-up` - Yukarıdan fade in
- `animate-bounce-slow` - Yavaş bounce
- `hover:scale-105` - Hover büyütme
- `transition-all duration-300` - Smooth geçişler

## 📱 RESPONSIVE

- **Mobile**: 320px+ (Single column)
- **Tablet**: 768px+ (2 columns)
- **Desktop**: 1024px+ (Grid layouts)
- **Wide**: 1440px+ (Max-width 1600px)

## 🔧 DOSYA YAPISI

```
src/
├── app/
│   ├── layout.tsx          # Root layout (dark theme)
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Loading spinner
│   └── not-found.tsx       # 404 page
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Fixed header
│   │   ├── Navbar.tsx      # Navigation
│   │   └── Footer.tsx      # Dark footer
│   ├── home/
│   │   ├── HeroSection.tsx      # Full-screen hero
│   │   ├── LatestIssue.tsx      # Split section (NEW)
│   │   ├── FeaturedArticles.tsx # Dynamic grid
│   │   ├── AuthorsSection.tsx   # Authors grid
│   │   └── NewsletterSection.tsx # Yellow newsletter
│   └── ui/
│       ├── Button.tsx      # Contemporary buttons
│       ├── Card.tsx        # Dark cards
│       └── Badge.tsx       # Yellow badges
├── styles/
│   ├── globals.css         # Dark theme base
│   ├── theme.css           # Animations & utilities
│   └── typography.css      # Dark typography
└── data/
    └── *.json              # Same as v1
```

## 🎯 ÖNEMLİ NOTLAR

### 1. Dark Mode Varsayılan
```tsx
// layout.tsx
<html lang="tr" className="dark">
```

### 2. Yellow CTA Buttons
```tsx
<Button variant="primary"> // Yellow background
<Button variant="secondary"> // White border
<Button variant="ghost"> // Transparent
```

### 3. Grid System
```tsx
// 12-column grid
className="grid grid-cols-12 gap-5"

// Large item: 6 columns
className="col-span-12 lg:col-span-6"

// Medium item: 4 columns
className="col-span-12 md:col-span-6 lg:col-span-4"
```

### 4. Animations
```tsx
// Fade in up (stagger with delay)
className="animate-fade-in-up"
style={{ animationDelay: '0.2s' }}

// Bounce indicator
className="animate-bounce-slow"
```

## 📦 SONRAKİ ADIMLAR

### Tamamlanacak Sayfalar
- [ ] `/yazilar` - Articles list page
- [ ] `/yazilar/[slug]` - Article detail page
- [ ] `/yazarlar` - Authors list page
- [ ] `/yazarlar/[slug]` - Author profile page
- [ ] `/sayilar` - Issues archive page
- [ ] `/sayilar/[id]` - Issue detail page
- [ ] `/hakkimizda` - About page

### Eklenecek Özellikler
- [ ] Search modal (dark theme)
- [ ] Mobile menu (hamburger)
- [ ] Reading progress bar
- [ ] Social share buttons
- [ ] Comment system

## 🐛 SORUN GİDERME

### Stil Yüklenmiyor
```bash
# Tailwind cache'i temizle
rm -rf .next
npm run dev
```

### Renkler Doğru Görünmüyor
- `tailwind.config.ts` dosyasını kontrol et
- `dark` class'ı html tag'inde olmalı

### Component Bulunamıyor
```bash
# TypeScript type check
npm run type-check
```

## 📞 DESTEK

Sorularınız için: khan@paksoftware.com

---

**Versiyon**: 2.0.0  
**Tasarım**: Contemporary Bold (Option 5)  
**Tarih**: Aralık 2024  
**Geliştirici**: PakSoft IT Solutions
# MagazineProject
