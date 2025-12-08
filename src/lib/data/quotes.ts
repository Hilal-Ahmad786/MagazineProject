import { Quote } from '@/types/quote'
import quotesData from '@/data/quotes.json'

export async function getAllQuotes(): Promise<Quote[]> {
  return quotesData.quotes as unknown as Quote[]
}

export async function getActiveQuotes(): Promise<Quote[]> {
  return quotesData.quotes.filter(quote => quote.active) as unknown as Quote[]
}

export async function getRandomQuote(): Promise<Quote | null> {
  const activeQuotes = await getActiveQuotes()
  if (activeQuotes.length === 0) return null

  const randomIndex = Math.floor(Math.random() * activeQuotes.length)
  return activeQuotes[randomIndex]
}
