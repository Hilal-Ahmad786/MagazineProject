interface QuoteOfTheDayProps {
  quote: {
    text: string
    source?: string
  }
}

export function QuoteOfTheDay({ quote }: QuoteOfTheDayProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <blockquote className="text-h3 font-heading italic text-mazhar-bronze">
        &quot;{quote.text}&quot;
      </blockquote>
      {quote.source && (
        <p className="mt-4 text-mazhar-grey">— {quote.source}</p>
      )}
    </div>
  )
}
