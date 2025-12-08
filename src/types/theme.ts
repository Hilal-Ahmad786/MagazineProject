import { Locale } from './common'

export interface Theme {
  id: string
  slug: string
  name: string
  description: string
  image?: string
  color?: string
  relatedThemes?: string[]
  active: boolean
  locale: Locale
}

export interface ThemeWithCount extends Theme {
  articleCount: number
}

export interface ThemeCardData {
  id: string
  slug: string
  name: string
  articleCount: number
  color?: string
}
