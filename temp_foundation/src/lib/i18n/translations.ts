// src/lib/i18n/translations.ts
// Translations for Turkish and English

export const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.articles': 'Yazılar',
    'nav.authors': 'Yazarlar',
    'nav.issues': 'Sayılar',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',

    // Common
    'common.readMore': 'Devamını Oku',
    'common.seeAll': 'Tümünü Gör',
    'common.loadMore': 'Daha Fazla',
    'common.search': 'Ara',
    'common.close': 'Kapat',
    'common.back': 'Geri',
    'common.share': 'Paylaş',
    'common.download': 'İndir',
    'common.subscribe': 'Abone Ol',
    'common.submit': 'Gönder',
    'common.cancel': 'İptal',
    'common.save': 'Kaydet',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.noResults': 'Sonuç bulunamadı',
    'common.required': 'Zorunlu',
    'common.optional': 'İsteğe bağlı',

    // Homepage
    'home.hero.title': 'MAZHAR DERGİSİ',
    'home.hero.subtitle': 'Çağdaş edebiyat, kültür ve sanat dergisi',
    'home.hero.cta': 'Keşfet',
    'home.latestIssue': 'Son Sayı',
    'home.featuredArticles': 'Öne Çıkan Yazılar',
    'home.ourAuthors': 'Yazarlarımız',
    'home.newsletter.title': 'Bültene Abone Ol',
    'home.newsletter.subtitle': 'Yeni sayılardan ve özel içeriklerden haberdar ol',
    'home.newsletter.placeholder': 'E-posta adresiniz',
    'home.newsletter.success': 'Teşekkürler! Abone oldunuz.',
    'home.newsletter.error': 'Bir hata oluştu. Lütfen tekrar deneyin.',

    // Articles
    'articles.title': 'Yazılar',
    'articles.subtitle': 'Edebiyat, kültür ve sanat üzerine yazılar',
    'articles.filter': 'Filtrele',
    'articles.all': 'Tümü',
    'articles.readTime': 'dk okuma',
    'articles.relatedArticles': 'İlgili Yazılar',
    'articles.shareArticle': 'Yazıyı Paylaş',
    'articles.byAuthor': 'Yazar',
    'articles.publishedOn': 'Yayın tarihi',
    'articles.category': 'Kategori',

    // Authors
    'authors.title': 'Yazarlarımız',
    'authors.subtitle': 'Dergimize katkıda bulunan yazarlar',
    'authors.articles': 'Yazıları',
    'authors.totalReads': 'Toplam okunma',
    'authors.joinedAt': 'Katılım tarihi',
    'authors.role.founder': 'Kurucu',
    'authors.role.editor': 'Editör',
    'authors.role.writer': 'Yazar',
    'authors.role.guest': 'Konuk Yazar',

    // Issues
    'issues.title': 'Sayılar',
    'issues.subtitle': 'Tüm sayılarımız',
    'issues.latestIssue': 'Son Sayı',
    'issues.archive': 'Arşiv',
    'issues.issue': 'Sayı',
    'issues.tableOfContents': 'İçindekiler',
    'issues.downloadPdf': 'PDF İndir',
    'issues.readOnline': 'Online Oku',
    'issues.editorsNote': 'Editörün Notu',
    'issues.theme': 'Tema',

    // About
    'about.title': 'Hakkımızda',
    'about.ourStory': 'Hikayemiz',
    'about.mission': 'Misyonumuz',
    'about.vision': 'Vizyonumuz',
    'about.team': 'Ekibimiz',
    'about.joinUs': 'Bize Katılın',
    'about.joinUsSubtitle': 'Yazar olmak veya katkıda bulunmak ister misiniz?',
    'about.apply': 'Başvur',

    // Contact
    'contact.title': 'İletişim',
    'contact.subtitle': 'Soru, öneri veya işbirliği teklifleriniz için bizimle iletişime geçin',
    'contact.form.name': 'Adınız',
    'contact.form.email': 'E-posta',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesajınız',
    'contact.form.send': 'Gönder',
    'contact.form.success': 'Mesajınız gönderildi. En kısa sürede dönüş yapacağız.',
    'contact.form.error': 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
    'contact.info.email': 'E-posta',
    'contact.info.address': 'Adres',
    'contact.info.phone': 'Telefon',

    // Comments
    'comments.title': 'Yorumlar',
    'comments.add': 'Yorum Yap',
    'comments.reply': 'Yanıtla',
    'comments.empty': 'Henüz yorum yapılmamış. İlk yorumu siz yapın!',
    'comments.form.name': 'Adınız',
    'comments.form.email': 'E-posta (görünmez)',
    'comments.form.content': 'Yorumunuz...',
    'comments.form.submit': 'Yorum Yap',
    'comments.replyTo': 'yanıtla',
    'comments.edited': 'düzenlendi',

    // Reading List
    'readingList.title': 'Okuma Listesi',
    'readingList.add': 'Listeye Ekle',
    'readingList.remove': 'Listeden Çıkar',
    'readingList.inList': 'Listede',
    'readingList.empty': 'Okuma listeniz boş',
    'readingList.emptySubtitle': 'Beğendiğiniz yazıları buraya ekleyin',
    'readingList.clear': 'Temizle',
    'readingList.clearConfirm': 'Tüm öğeleri silmek istediğinize emin misiniz?',

    // Search
    'search.title': 'Ara',
    'search.placeholder': 'Yazı, yazar veya sayı ara...',
    'search.noResults': 'Sonuç bulunamadı',
    'search.recent': 'Son Aramalar',
    'search.clearRecent': 'Temizle',
    'search.results': 'Sonuçlar',
    'search.articles': 'Yazılar',
    'search.authors': 'Yazarlar',
    'search.issues': 'Sayılar',
    'search.hint': 'Aramak için yazmaya başlayın...',
    'search.shortcut': '⌘K ile arayın',

    // Theme
    'theme.toggle': 'Tema değiştir',
    'theme.light': 'Açık',
    'theme.dark': 'Koyu',
    'theme.system': 'Sistem',

    // Language
    'language.switch': 'Dil değiştir',
    'language.tr': 'Türkçe',
    'language.en': 'English',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Okuma istatistikleriniz',
    'dashboard.totalViews': 'Toplam Görüntüleme',
    'dashboard.articlesRead': 'Okunan Yazı',
    'dashboard.totalReadTime': 'Toplam Okuma Süresi',
    'dashboard.avgReadTime': 'Ortalama Okuma',
    'dashboard.topArticles': 'En Çok Okunanlar',
    'dashboard.last14Days': 'Son 14 Gün',
    'dashboard.views': 'görüntüleme',

    // PWA
    'pwa.install': 'Uygulamayı Yükle',
    'pwa.installTitle': 'Mazhar Dergisi',
    'pwa.installSubtitle': 'Uygulamayı ana ekranınıza ekleyin',
    'pwa.later': 'Sonra',
    'pwa.offline': 'Çevrimdışısınız',
    'pwa.offlineSubtitle': 'İnternet bağlantınız yok gibi görünüyor',
    'pwa.retry': 'Tekrar Dene',
    'pwa.cachedContent': 'Önbelleğe alınmış içeriklere erişebilirsiniz',

    // Footer
    'footer.rights': 'Tüm hakları saklıdır',
    'footer.links': 'Bağlantılar',
    'footer.social': 'Sosyal Medya',
    'footer.subscribe': 'Bültene Abone Ol',
    'footer.description': 'Çağdaş edebiyat, kültür ve sanat dergisi',

    // Author Application
    'application.title': 'Yazar Başvurusu',
    'application.subtitle': 'Dergimize yazar olarak katılın',
    'application.step1': 'Kişisel Bilgiler',
    'application.step2': 'Yazarlık',
    'application.step3': 'Konular',
    'application.step4': 'Gözden Geçir',
    'application.next': 'İleri',
    'application.back': 'Geri',
    'application.submit': 'Başvuruyu Gönder',
    'application.success': 'Başvurunuz alındı. En kısa sürede dönüş yapacağız.',

    // Errors
    'error.404.title': 'Sayfa Bulunamadı',
    'error.404.subtitle': 'Aradığınız sayfa mevcut değil veya taşınmış olabilir',
    'error.404.home': 'Ana Sayfaya Dön',
    'error.generic': 'Bir hata oluştu',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.authors': 'Authors',
    'nav.issues': 'Issues',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Common
    'common.readMore': 'Read More',
    'common.seeAll': 'See All',
    'common.loadMore': 'Load More',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.share': 'Share',
    'common.download': 'Download',
    'common.subscribe': 'Subscribe',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.noResults': 'No results found',
    'common.required': 'Required',
    'common.optional': 'Optional',

    // Homepage
    'home.hero.title': 'MAZHAR MAGAZINE',
    'home.hero.subtitle': 'Contemporary literature, culture and art magazine',
    'home.hero.cta': 'Explore',
    'home.latestIssue': 'Latest Issue',
    'home.featuredArticles': 'Featured Articles',
    'home.ourAuthors': 'Our Authors',
    'home.newsletter.title': 'Subscribe to Newsletter',
    'home.newsletter.subtitle': 'Get updates on new issues and exclusive content',
    'home.newsletter.placeholder': 'Your email address',
    'home.newsletter.success': 'Thank you! You are now subscribed.',
    'home.newsletter.error': 'An error occurred. Please try again.',

    // Articles
    'articles.title': 'Articles',
    'articles.subtitle': 'Articles on literature, culture and art',
    'articles.filter': 'Filter',
    'articles.all': 'All',
    'articles.readTime': 'min read',
    'articles.relatedArticles': 'Related Articles',
    'articles.shareArticle': 'Share Article',
    'articles.byAuthor': 'Author',
    'articles.publishedOn': 'Published on',
    'articles.category': 'Category',

    // Authors
    'authors.title': 'Our Authors',
    'authors.subtitle': 'Authors contributing to our magazine',
    'authors.articles': 'Articles',
    'authors.totalReads': 'Total reads',
    'authors.joinedAt': 'Joined',
    'authors.role.founder': 'Founder',
    'authors.role.editor': 'Editor',
    'authors.role.writer': 'Writer',
    'authors.role.guest': 'Guest Writer',

    // Issues
    'issues.title': 'Issues',
    'issues.subtitle': 'All our issues',
    'issues.latestIssue': 'Latest Issue',
    'issues.archive': 'Archive',
    'issues.issue': 'Issue',
    'issues.tableOfContents': 'Table of Contents',
    'issues.downloadPdf': 'Download PDF',
    'issues.readOnline': 'Read Online',
    'issues.editorsNote': "Editor's Note",
    'issues.theme': 'Theme',

    // About
    'about.title': 'About Us',
    'about.ourStory': 'Our Story',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.team': 'Our Team',
    'about.joinUs': 'Join Us',
    'about.joinUsSubtitle': 'Would you like to become a writer or contribute?',
    'about.apply': 'Apply',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us for questions, suggestions or collaboration',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send',
    'contact.form.success': 'Your message has been sent. We will get back to you soon.',
    'contact.form.error': 'Failed to send message. Please try again.',
    'contact.info.email': 'Email',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',

    // Comments
    'comments.title': 'Comments',
    'comments.add': 'Add Comment',
    'comments.reply': 'Reply',
    'comments.empty': 'No comments yet. Be the first to comment!',
    'comments.form.name': 'Your Name',
    'comments.form.email': 'Email (not visible)',
    'comments.form.content': 'Your comment...',
    'comments.form.submit': 'Post Comment',
    'comments.replyTo': 'reply to',
    'comments.edited': 'edited',

    // Reading List
    'readingList.title': 'Reading List',
    'readingList.add': 'Add to List',
    'readingList.remove': 'Remove from List',
    'readingList.inList': 'In List',
    'readingList.empty': 'Your reading list is empty',
    'readingList.emptySubtitle': 'Add articles you like here',
    'readingList.clear': 'Clear',
    'readingList.clearConfirm': 'Are you sure you want to delete all items?',

    // Search
    'search.title': 'Search',
    'search.placeholder': 'Search articles, authors or issues...',
    'search.noResults': 'No results found',
    'search.recent': 'Recent Searches',
    'search.clearRecent': 'Clear',
    'search.results': 'Results',
    'search.articles': 'Articles',
    'search.authors': 'Authors',
    'search.issues': 'Issues',
    'search.hint': 'Start typing to search...',
    'search.shortcut': 'Press ⌘K to search',

    // Theme
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    // Language
    'language.switch': 'Switch language',
    'language.tr': 'Türkçe',
    'language.en': 'English',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Your reading statistics',
    'dashboard.totalViews': 'Total Views',
    'dashboard.articlesRead': 'Articles Read',
    'dashboard.totalReadTime': 'Total Read Time',
    'dashboard.avgReadTime': 'Average Read Time',
    'dashboard.topArticles': 'Most Read',
    'dashboard.last14Days': 'Last 14 Days',
    'dashboard.views': 'views',

    // PWA
    'pwa.install': 'Install App',
    'pwa.installTitle': 'Mazhar Magazine',
    'pwa.installSubtitle': 'Add the app to your home screen',
    'pwa.later': 'Later',
    'pwa.offline': "You're Offline",
    'pwa.offlineSubtitle': 'It looks like you have no internet connection',
    'pwa.retry': 'Try Again',
    'pwa.cachedContent': 'You can access cached content',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.links': 'Links',
    'footer.social': 'Social Media',
    'footer.subscribe': 'Subscribe to Newsletter',
    'footer.description': 'Contemporary literature, culture and art magazine',

    // Author Application
    'application.title': 'Author Application',
    'application.subtitle': 'Join our magazine as a writer',
    'application.step1': 'Personal Info',
    'application.step2': 'Writing',
    'application.step3': 'Topics',
    'application.step4': 'Review',
    'application.next': 'Next',
    'application.back': 'Back',
    'application.submit': 'Submit Application',
    'application.success': 'Your application has been received. We will get back to you soon.',

    // Errors
    'error.404.title': 'Page Not Found',
    'error.404.subtitle': 'The page you are looking for does not exist or has been moved',
    'error.404.home': 'Go to Home',
    'error.generic': 'An error occurred',
  },
} as const

export type Locale = keyof typeof translations
export type TranslationKey = keyof (typeof translations)['tr']

// Helper to get nested translation value
export function getTranslation(
  locale: Locale,
  key: TranslationKey
): string {
  return translations[locale][key] || key
}
