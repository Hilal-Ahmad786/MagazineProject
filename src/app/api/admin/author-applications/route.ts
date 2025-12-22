
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user || !['admin', 'editor'].includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const status = searchParams.get('status')

        const where: any = {}
        if (status && status !== 'all') {
            where.status = status
        }

        const applications = await prisma.authorApplication.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(applications)
    } catch (error) {
        console.error('Error fetching applications:', error)
        return NextResponse.json(
            { error: 'Başvurular alınırken bir hata oluştu.' },
            { status: 500 }
        )
    }
}
