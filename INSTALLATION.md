# 🚀 Kurulum Rehberi - Mazhar Dergisi v2.0

## Ön Gereksinimler

- Node.js 18.0 veya üzeri
- npm veya yarn package manager

## Adım 1: Projeyi İndirin

ZIP dosyasını indirin ve çıkartın:

```bash
unzip mazhar-dergisi-v2-option5.zip
cd mazhar-dergisi-v2-option5
```

## Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

veya yarn kullanıyorsanız:

```bash
yarn install
```

**Süre**: ~2-3 dakika

## Adım 3: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

veya:

```bash
yarn dev
```

## Adım 4: Tarayıcıda Görüntüleyin

Tarayıcınızda açın:
```
http://localhost:3000
```

## ✅ Başarılı Kurulum Kontrolü

E�er aşağıdakileri görüyorsanız kurulum başarılı:

1. ✅ Siyah arkaplan
2. ✅ Sarı "MAZHAR." logosu sol üstte
3. ✅ Tam ekran hero bölümü
4. ✅ "DÜŞÜNCE & EDEBİYAT" başlığı
5. ✅ Sarı renk vurguları

## 🔧 Yaygın Sorunlar ve Çözümleri

### Sorun 1: "Module not found" hatası
```bash
# node_modules klasörünü sil ve yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

### Sorun 2: Stiller yüklenmiyor
```bash
# .next cache'i temizle
rm -rf .next
npm run dev
```

### Sorun 3: Port 3000 kullanımda
```bash
# Farklı port kullan
npm run dev -- -p 3001
```

### Sorun 4: TypeScript hataları
```bash
# Type check
npm run type-check

# Eğer hatalar varsa:
npm install --save-dev @types/react @types/node
```

## 🎨 Özelleştirme

### Renkleri Değiştirmek

`tailwind.config.ts` dosyasını açın:

```typescript
colors: {
  yellow: {
    400: '#FFD700', // Buradan sarıyı değiştirin
  },
  // ... diğer renkler
}
```

### İçerik Eklemek

JSON dosyalarını düzenleyin:
- `src/data/articles.json` - Yazılar
- `src/data/authors.json` - Yazarlar
- `src/data/issues.json` - Sayılar

## 📦 Production Build

```bash
# Build oluştur
npm run build

# Production sunucusunu başlat
npm run start
```

## 🌐 Deploy

### Vercel (Önerilen)

1. Vercel hesabı oluşturun: https://vercel.com
2. Projeyi GitHub'a yükleyin
3. Vercel dashboard'da "Import Project"
4. Repository'yi seçin
5. Deploy!

### Diğer Platformlar

- **Netlify**: `npm run build` → dist klasörünü yükle
- **AWS Amplify**: GitHub entegrasyonu
- **DigitalOcean**: App Platform

## 📱 Mobil Test

```bash
# Network üzerinden erişim için
npm run dev -- --hostname 0.0.0.0
```

Mobil cihazınızdan:
```
http://[BİLGİSAYARINIZIN-IP]:3000
```

## 🆘 Yardım

Sorun yaşıyorsanız:

1. **README.md** dosyasını okuyun
2. **CHANGELOG.md** dosyasında değişiklikleri inceleyin
3. Terminal'deki hata mesajlarını kontrol edin
4. khan@paksoftware.com adresine yazın

## ✨ Sonraki Adımlar

1. ✅ Ana sayfa çalışıyor
2. ⏳ Yazılar sayfası oluşturun (`/yazilar`)
3. ⏳ Yazarlar sayfası oluşturun (`/yazarlar`)
4. ⏳ Sayılar sayfası oluşturun (`/sayilar`)
5. ⏳ Hakkımızda sayfası oluşturun (`/hakkimizda`)

---

**İyi çalışmalar!** 🚀
