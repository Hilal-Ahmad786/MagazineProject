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
    
    // Homepage
    'home.hero.title': 'DÜŞÜNCE VE EDEBİYAT DERGİSİ',
    'home.hero.subtitle': 'Her ay yeni bir tema, yeni bakış açıları',
    'home.latestIssue': 'Son Sayı',
    'home.featuredArticles': 'Öne Çıkan Yazılar',
    'home.ourAuthors': 'Yazarlarımız',
    'home.newsletter.title': 'Bültenimize Abone Olun',
    'home.newsletter.placeholder': 'E-posta adresiniz',
    'home.newsletter.button': 'Abone Ol',
    
    // Articles
    'articles.title': 'Yazılar',
    'articles.filter.all': 'Tümü',
    'articles.readTime': 'dk okuma',
    'articles.relatedArticles': 'İlgili Yazılar',
    'articles.shareArticle': 'Yazıyı Paylaş',
    
    // Authors
    'authors.title': 'Yazarlar',
    'authors.articles': 'Yazıları',
    'authors.role.founder': 'Kurucu',
    'authors.role.editor': 'Editör',
    'authors.role.guest': 'Konuk Yazar',
    
    // Issues
    'issues.title': 'Sayılar',
    'issues.latestIssue': 'Son Sayı',
    'issues.archive': 'Arşiv',
    'issues.tableOfContents': 'İçindekiler',
    'issues.downloadPdf': 'PDF İndir',
    'issues.readOnline': 'Online Oku',
    
    // About
    'about.title': 'Hakkımızda',
    'about.mission': 'Misyonumuz',
    'about.vision': 'Vizyonumuz',
    'about.team': 'Ekibimiz',
    
    // Contact
    'contact.title': 'İletişim',
    'contact.form.name': 'Adınız',
    'contact.form.email': 'E-posta',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesajınız',
    'contact.form.send': 'Gönder',
    
    // Footer
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.links': 'Bağlantılar',
    'footer.social': 'Sosyal Medya',
    'footer.subscribe': 'Abone Ol',
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
    
    // Homepage
    'home.hero.title': 'THOUGHT AND LITERATURE MAGAZINE',
    'home.hero.subtitle': 'Every month a new theme, new perspectives',
    'home.latestIssue': 'Latest Issue',
    'home.featuredArticles': 'Featured Articles',
    'home.ourAuthors': 'Our Authors',
    'home.newsletter.title': 'Subscribe to Our Newsletter',
    'home.newsletter.placeholder': 'Your email address',
    'home.newsletter.button': 'Subscribe',
    
    // Articles
    'articles.title': 'Articles',
    'articles.filter.all': 'All',
    'articles.readTime': 'min read',
    'articles.relatedArticles': 'Related Articles',
    'articles.shareArticle': 'Share Article',
    
    // Authors
    'authors.title': 'Authors',
    'authors.articles': 'Articles',
    'authors.role.founder': 'Founder',
    'authors.role.editor': 'Editor',
    'authors.role.guest': 'Guest Writer',
    
    // Issues
    'issues.title': 'Issues',
    'issues.latestIssue': 'Latest Issue',
    'issues.archive': 'Archive',
    'issues.tableOfContents': 'Table of Contents',
    'issues.downloadPdf': 'Download PDF',
    'issues.readOnline': 'Read Online',
    
    // About
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.team': 'Our Team',
    
    // Contact
    'contact.title': 'Contact',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.links': 'Links',
    'footer.social': 'Social Media',
    'footer.subscribe': 'Subscribe',
  },
} as const

export type Locale = keyof typeof translations
export type TranslationKey = keyof typeof translations.tr
