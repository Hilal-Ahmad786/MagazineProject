import { NextRequest, NextResponse } from 'next/server'

// In-memory store (replace with database in production)
const viewCounts: Record<string, number> = {}

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json()

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 })
    }

    // Increment view count
    viewCounts[articleId] = (viewCounts[articleId] || 0) + 1

    // In production, save to database:
    // await db.article.update({
    //   where: { id: articleId },
    //   data: { views: { increment: 1 } }
    // })

    return NextResponse.json({ success: true, views: viewCounts[articleId] })
  } catch (error) {
    console.error('View tracking error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const articleId = searchParams.get('articleId')

  if (articleId) {
    return NextResponse.json({ views: viewCounts[articleId] || 0 })
  }

  return NextResponse.json({ totalViews: Object.values(viewCounts).reduce((a, b) => a + b, 0) })
}
