export type QuoteSourceType = 'author' | 'manifesto' | 'proverb' | 'literature'

export interface Quote {
  id: string
  text: string
  source?: string
  sourceType?: QuoteSourceType
  language: string
  active: boolean
}
