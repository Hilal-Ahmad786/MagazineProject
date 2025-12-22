import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const commentId = params.id;

    try {
        const comment = await prisma.comment.update({
            where: { id: commentId },
            data: {
                likes: {
                    increment: 1
                }
            }
        });

        return NextResponse.json({ likes: comment.likes });
    } catch (error) {
        console.error('Error liking comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
