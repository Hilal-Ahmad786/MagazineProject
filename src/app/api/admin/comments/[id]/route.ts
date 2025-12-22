import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const commentId = params.id;

    try {
        // Delete the comment. Cascade will delete replies.
        await prisma.comment.delete({
            where: { id: commentId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
