import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { articleId, parentId, content } = body;

        // Admin reply specific fields
        const name = "Mazhar Dergisi - Editör";
        const email = "editor@mazhardergisi.com";

        if (!articleId || !parentId || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const comment = await prisma.comment.create({
            data: {
                articleId,
                parentId,
                name,
                email,
                content,
                status: 'active',
                isAdmin: true
            },
        });

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error('Error creating admin reply:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
