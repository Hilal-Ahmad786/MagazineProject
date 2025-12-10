# Mazhar Dergisi v2 - PWA System

Progressive Web App desteği: manifest, service worker, install prompt, offline page.

## 📦 İçerik

```
public/
├── manifest.json        # PWA manifest
└── sw.js               # Service Worker

src/components/pwa/
├── PWARegister.tsx     # SW kayıt component'i
├── InstallPrompt.tsx   # Yükleme prompt'u (3 varyant)
├── OfflineIndicator.tsx # Çevrimdışı göstergesi
└── index.ts            # Merkezi export

src/app/offline/
└── page.tsx            # Çevrimdışı sayfa
```

## 🔌 Bağımlılıklar

Bu paket **Foundation Package** gerektirir:
- `cn` from `@/lib/utils`
- `STORAGE_KEYS`, `PWA_PROMPT_DELAY` from `@/lib/constants`

## 🚀 Kurulum

### Adım 1: Dosyaları Kopyala

```
public/manifest.json → Projenizin public/ klasörüne
public/sw.js         → Projenizin public/ klasörüne
src/components/pwa/  → src/components/pwa/
src/app/offline/     → src/app/offline/
```

### Adım 2: İkonları Oluştur

`public/icons/` klasörüne şu boyutlarda ikon ekleyin:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

> 💡 İpucu: [RealFaviconGenerator](https://realfavicongenerator.net/) kullanarak tek bir PNG'den tüm boyutları oluşturabilirsiniz.

### Adım 3: Layout'u Güncelle

```tsx
// src/app/layout.tsx
import { PWARegister, InstallPrompt, OfflineIndicator } from '@/components/pwa'

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mazhar" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <Providers>
          {children}
          
          {/* PWA Components */}
          <PWARegister />
          <InstallPrompt variant="banner" delay={30000} />
          <OfflineIndicator variant="toast" />
        </Providers>
      </body>
    </html>
  )
}
```

### Adım 4: next.config.js (Opsiyonel Headers)

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ]
  },
}
```

## 🎨 Component API

### PWARegister

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `onUpdate` | `() => void` | - | Güncelleme mevcut callback |
| `onSuccess` | `() => void` | - | Başarılı kayıt callback |
| `onError` | `(error) => void` | - | Hata callback |

### InstallPrompt

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `delay` | `number` | `30000` | Gösterim gecikmesi (ms) |
| `variant` | `'banner' \| 'modal' \| 'toast'` | `'banner'` | Görünüm |

### OfflineIndicator

| Prop | Type | Default | Açıklama |
|------|------|---------|----------|
| `variant` | `'banner' \| 'toast' \| 'dot'` | `'banner'` | Görünüm |
| `position` | `'top' \| 'bottom'` | `'top'` | Konum |
| `showOnlineMessage` | `boolean` | `true` | Çevrimiçi mesajı göster |

## 🎯 Özellikler

### Service Worker
- ✅ **Cache-first** - Statik dosyalar için
- ✅ **Network-first** - Dinamik içerik için
- ✅ **Background sync** - Yorum ve okuma listesi senkronizasyonu
- ✅ **Push notifications** - Bildirim desteği
- ✅ **Cache trimming** - Otomatik önbellek temizleme

### Install Prompt
- ✅ 3 varyant (banner, modal, toast)
- ✅ Configurable delay
- ✅ 7 gün sonra tekrar gösterme
- ✅ Standalone detection

### Offline Support
- ✅ Offline page fallback
- ✅ Cached content access
- ✅ Online/offline indicator
- ✅ Automatic reconnection detection

## 📱 Manifest Özellikleri

```json
{
  "name": "Mazhar Dergisi",
  "short_name": "Mazhar",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#000000",
  "shortcuts": [
    { "name": "Yazılar", "url": "/yazilar" },
    { "name": "Son Sayı", "url": "/sayilar" }
  ]
}
```

## 🔧 Service Worker Cache Stratejileri

| İçerik Türü | Strateji | Cache |
|-------------|----------|-------|
| Statik dosyalar | Cache-first | `mazhar-static-v1` |
| Sayfalar | Network-first | `mazhar-dynamic-v1` |
| Görseller | Cache-first + refresh | `mazhar-images-v1` |
| API istekleri | Network only | - |

## 💾 localStorage Keys

- `pwa_prompt_dismissed` - Install prompt reddedilme zamanı

## 🧪 Test Etme

### Chrome DevTools
1. Application → Service Workers → Durumu kontrol et
2. Application → Manifest → Manifest'i doğrula
3. Network → Offline checkbox → Çevrimdışı testi
4. Lighthouse → PWA audit

### Test Senaryoları
1. ✅ Sayfa yükleme hızı (Service Worker aktif)
2. ✅ Çevrimdışı sayfa erişimi
3. ✅ Install prompt gösterimi
4. ✅ Çevrimdışı göstergesi
5. ✅ Güncelleme prompt'u

## 📐 Varyant Örnekleri

### InstallPrompt Varyantları

```tsx
// Banner - sayfa altında
<InstallPrompt variant="banner" delay={30000} />

// Modal - merkez popup
<InstallPrompt variant="modal" delay={60000} />

// Toast - sağ alt köşe
<InstallPrompt variant="toast" delay={15000} />
```

### OfflineIndicator Varyantları

```tsx
// Banner - tam genişlik
<OfflineIndicator variant="banner" position="top" />

// Toast - yuvarlak pill
<OfflineIndicator variant="toast" position="bottom" />

// Dot - sadece nokta (header için)
<OfflineIndicator variant="dot" />
```

## ⚠️ Önemli Notlar

1. **HTTPS gerekli** - Service Worker sadece HTTPS'de çalışır (localhost hariç)

2. **İkonlar zorunlu** - manifest.json'daki tüm ikon boyutları mevcut olmalı

3. **Cache versiyonlama** - SW güncellemelerinde `CACHE_NAME` versiyonunu değiştirin

4. **iOS Safari** - Bazı PWA özellikleri sınırlı:
   - Push notifications desteklenmiyor
   - Install prompt otomatik gösterilmiyor

## 🔗 İlgili Dosyalar

- `@/hooks/usePWA.ts` - PWA hook (Foundation'da)
- `@/lib/constants.ts` - Storage keys

---

**Version:** 2.9.0-pwa
**Date:** December 2024
