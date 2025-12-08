import { Theme } from '@/types/theme'
import themesData from '@/data/themes.json'

export async function getAllThemes(): Promise<Theme[]> {
  return themesData.themes as unknown as Theme[]
}

export async function getActiveThemes(): Promise<Theme[]> {
  return themesData.themes.filter(theme => theme.active) as unknown as Theme[]
}

export async function getThemeBySlug(slug: string): Promise<Theme | null> {
  return (themesData.themes.find(theme => theme.slug === slug) || null) as unknown as Theme | null
}

export async function getPopularThemes(limit: number = 8): Promise<Theme[]> {
  return themesData.themes
    .filter(theme => theme.active)
    .slice(0, limit) as unknown as Theme[]
}
