
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { status, notes } = body

        const application = await prisma.authorApplication.update({
            where: { id: params.id },
            data: {
                ...(status && { status }),
                ...(notes && { notes }),
                reviewedBy: session.user.id === 'env-admin' ? null : session.user.id,
                reviewedAt: new Date(),
            },
        })

        return NextResponse.json(application)
    } catch (error) {
        console.error('Error updating application:', error)
        return NextResponse.json(
            { error: 'Başvuru güncellenirken bir hata oluştu.' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.authorApplication.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting application:', error)
        return NextResponse.json(
            { error: 'Başvuru silinirken bir hata oluştu.' },
            { status: 500 }
        )
    }
}
