export const ROUTES = {
  HOME: '/',
  ARTICLES: '/yazilar',
  ARTICLE: (slug: string) => `/yazilar/${slug}`,
  AUTHORS: '/yazarlar',
  AUTHOR: (slug: string) => `/yazarlar/${slug}`,
  ISSUES: '/sayilar',
  ISSUE: (id: string) => `/sayilar/${id}`,
  THEME: (slug: string) => `/tema/${slug}`,
  ABOUT: '/hakkimizda',
  GUEST_AUTHOR: '/konuk-yazar',
  SEARCH: '/ara',
} as const
