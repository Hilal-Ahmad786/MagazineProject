# Mazhar Dergisi - Data Update (Sayı 9 - Estetik)

Bu paket, Mazhar Dergisi'nin 9. sayısı (Estetik teması) için güncellenmiş veri dosyalarını içerir.

## 📦 İçerik

### JSON Data Files (`src/data/`)
- **articles.json** - 7 yazı (Sayı 8 + Sayı 9)
- **authors.json** - 6 yazar
- **issues.json** - 2 sayı (Sayı 8: Gurbet, Sayı 9: Estetik)

### TypeScript Data Files (`src/lib/data/`)
- **articles.ts** - Yazı fonksiyonları
- **authors.ts** - Yazar fonksiyonları
- **issues.ts** - Sayı fonksiyonları

## 📝 Yazılar (7 adet)

### Sayı 8 - Gurbet
1. **Gurbet: Ayrılığın ve Özlemin Sessiz Çığlığı** - Mehmet Oktay Yetiş
2. **Otogar=Gurbet, Ben=Ağlamak** - Furkan Ahmet Aydın
3. **Şehir ve Yalnızlık: Modern İnsanın Paradoksu** - Ayşe Nur Kaya

### Sayı 9 - Estetik
4. **Estetik: Göze mi Kalbe mi Hitap Ediyor?** - Ahmet Talha Çamcı
5. **Zaman ve Anlam Arayışı** - Mehmet Oktay Yetiş
6. **Plastik Toplum** - Seyyid Ali Ayaz
7. **Gün Başlamadan Temizlenen Şehir** - Muhammet Kürşat Çolak

## 👥 Yazarlar (6 adet)

| İsim | Rol | Slug |
|------|-----|------|
| Mehmet Oktay Yetiş | Editör & Kurucu Yazar | mehmet-oktay-yetis |
| Furkan Ahmet Aydın | Kurucu Yazar | furkan-ahmet-aydin |
| Ahmet Talha Çamcı | Editör | ahmet-talha-camci |
| Ayşe Nur Kaya | Konuk Yazar | ayse-nur-kaya |
| Seyyid Ali Ayaz | Konuk Yazar | seyyid-ali-ayaz |
| Muhammet Kürşat Çolak | Konuk Yazar | muhammet-kursat-colak |

## 📚 Sayılar (2 adet)

| Sayı | Tema | Tarih | Yazı Sayısı |
|------|------|-------|-------------|
| 8 | Gurbet | Eylül 2025 | 3 |
| 9 | Estetik | Kasım 2025 | 4 |

## 🚀 Kurulum

```bash
# 1. Unzip
unzip mazhar-data-update.zip

# 2. JSON dosyalarını kopyala
cp data-update/articles.json src/data/
cp data-update/authors.json src/data/
cp data-update/issues.json src/data/

# 3. TypeScript dosyalarını kopyala
cp data-update/lib/data/articles.ts src/lib/data/
cp data-update/lib/data/authors.ts src/lib/data/
cp data-update/lib/data/issues.ts src/lib/data/

# 4. Temizle
rm -rf data-update

# 5. Restart
rm -rf .next && npm run dev
```

## 📁 Gerekli Görseller

Aşağıdaki görsellerin `public/images/` klasörüne eklenmesi gerekir:

### Kapak Görselleri (`/images/covers/`)
- `sayi-8-gurbet.jpg` (1200x1600)
- `sayi-9-estetik.jpg` (1200x1600)

### Yazar Görselleri (`/images/authors/`)
- `mehmet-oktay-yetis.jpg` (400x400)
- `furkan-ahmet-aydin.jpg` (400x400)
- `ahmet-talha-camci.jpg` (400x400)
- `ayse-nur-kaya.jpg` (400x400)
- `seyyid-ali-ayaz.jpg` (400x400)
- `muhammet-kursat-colak.jpg` (400x400)

### Yazı Görselleri (`/images/articles/`)
- `gurbet-001.jpg` (1200x800)
- `otogar-001.jpg` (1200x800)
- `estetik-001.jpg` (1200x800)
- `sehir-001.jpg` (1200x800)
- `zaman-001.jpg` (1200x800)
- `plastik-toplum.jpg` (1200x800)
- `sehir-temizlik.jpg` (1200x800)

### PDF Dosyaları (`/pdfs/`)
- `mazhar-sayi-8-gurbet.pdf`
- `mazhar-sayi-9-estetik.pdf`

## ✅ Tamamlandı

Bu güncelleme ile Mazhar Dergisi'nin 8. ve 9. sayıları için tüm içerik hazır hale gelmiştir.
