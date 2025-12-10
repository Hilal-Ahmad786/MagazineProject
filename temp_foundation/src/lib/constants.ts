// src/lib/constants.ts
// Constants and configuration for Mazhar Dergisi v2

import type { NavigationItem, SocialLink, SiteMetadata, Category } from '@/types'

// Site metadata
export const SITE_CONFIG: SiteMetadata = {
  title: 'Mazhar Dergisi',
  description: 'Çağdaş edebiyat, kültür ve sanat dergisi',
  url: 'https://mazhar.com',
  locale: 'tr-TR',
  siteName: 'Mazhar Dergisi',
  twitterHandle: '@mazhardergisi',
}

// Navigation links
export const NAVIGATION: NavigationItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Yazılar', href: '/yazilar' },
  { label: 'Yazarlar', href: '/yazarlar' },
  { label: 'Sayılar', href: '/sayilar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
]

// Footer navigation
export const FOOTER_LINKS: NavigationItem[] = [
  { label: 'Yazılar', href: '/yazilar' },
  { label: 'Yazarlar', href: '/yazarlar' },
  { label: 'Sayılar', href: '/sayilar' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
  { label: 'Yazar Başvurusu', href: '/yazar-basvurusu' },
  { label: 'RSS', href: '/feed.xml' },
]

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Twitter', href: 'https://twitter.com/mazhardergisi', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com/mazhardergisi', icon: 'instagram' },
  { name: 'Facebook', href: 'https://facebook.com/mazhardergisi', icon: 'facebook' },
  { name: 'YouTube', href: 'https://youtube.com/@mazhardergisi', icon: 'youtube' },
]

// Categories
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Edebiyat', slug: 'edebiyat', description: 'Şiir, öykü, roman ve edebiyat eleştirisi' },
  { id: '2', name: 'Kültür', slug: 'kultur', description: 'Kültür ve toplum üzerine yazılar' },
  { id: '3', name: 'Sanat', slug: 'sanat', description: 'Görsel sanatlar, müzik ve performans' },
  { id: '4', name: 'Sinema', slug: 'sinema', description: 'Film eleştirileri ve sinema dünyası' },
  { id: '5', name: 'Felsefe', slug: 'felsefe', description: 'Felsefi düşünceler ve tartışmalar' },
  { id: '6', name: 'Söyleşi', slug: 'soylesi', description: 'Röportajlar ve söyleşiler' },
  { id: '7', name: 'Deneme', slug: 'deneme', description: 'Özgün denemeler' },
  { id: '8', name: 'Eleştiri', slug: 'elestiri', description: 'Kitap ve sanat eleştirileri' },
]

// Contact subjects
export const CONTACT_SUBJECTS = [
  { value: 'genel', label: 'Genel' },
  { value: 'yazarlik', label: 'Yazarlık Başvurusu' },
  { value: 'isbirligi', label: 'İşbirliği' },
  { value: 'reklam', label: 'Reklam' },
  { value: 'teknik', label: 'Teknik Destek' },
  { value: 'diger', label: 'Diğer' },
]

// Author application topics
export const APPLICATION_TOPICS = [
  'Edebiyat',
  'Kültür',
  'Sanat',
  'Sinema',
  'Müzik',
  'Felsefe',
  'Tarih',
  'Politika',
  'Teknoloji',
  'Seyahat',
  'Gastronomi',
  'Diğer',
]

// Pagination
export const ITEMS_PER_PAGE = 12
export const MAX_RECENT_SEARCHES = 5
export const MAX_READING_LIST_ITEMS = 50

// Timeouts and delays (in ms)
export const DEBOUNCE_DELAY = 300
export const NEWSLETTER_MODAL_DELAY = 30000 // 30 seconds
export const PWA_PROMPT_DELAY = 30000 // 30 seconds
export const TOAST_DURATION = 5000 // 5 seconds

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'mazhar_theme',
  locale: 'mazhar_locale',
  readingList: 'mazhar_reading_list',
  comments: 'mazhar_comments',
  analytics: 'mazhar_analytics',
  recentSearches: 'mazhar_recent_searches',
  newsletterSubscribed: 'newsletter_subscribed',
  newsletterEmail: 'newsletter_email',
  pwaPromptDismissed: 'pwa_prompt_dismissed',
  newsletterModalShown: 'newsletter_modal_shown',
} as const

// Animation durations (for consistency)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
}

// Breakpoints (should match tailwind.config.ts)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Theme colors
export const THEME_COLORS = {
  primary: '#facc15',
  background: {
    dark: '#000000',
    light: '#ffffff',
  },
  text: {
    dark: '#ffffff',
    light: '#000000',
  },
}

// API endpoints (if using external APIs)
export const API_ENDPOINTS = {
  newsletter: '/api/newsletter',
  contact: '/api/contact',
  application: '/api/application',
  comments: '/api/comments',
}

// SEO defaults
export const SEO_DEFAULTS = {
  titleTemplate: '%s | Mazhar Dergisi',
  defaultTitle: 'Mazhar Dergisi',
  description: 'Çağdaş edebiyat, kültür ve sanat dergisi',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Mazhar Dergisi',
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@mazhardergisi',
  },
}

// Reading analytics thresholds
export const ANALYTICS_CONFIG = {
  minReadTime: 5, // seconds - minimum time to count as "read"
  scrollDepthInterval: 25, // percentage intervals to track
  maxHistoryDays: 30, // days of history to keep
}
