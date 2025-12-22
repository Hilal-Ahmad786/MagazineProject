import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/comments?articleId=...
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const articleId = searchParams.get('articleId');

    if (!articleId) {
        return NextResponse.json(
            { error: 'Article ID is required' },
            { status: 400 }
        );
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                articleId,
                status: 'active', // Only show active comments
            },
            include: {
                replies: {
                    where: {
                        status: 'active'
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Helper to format comment structure
        // We only want top-level comments here, but Prisma queries flatly or with relations.
        // Actually, we should filter parentId: null to get root comments, 
        // and include their replies recursively? 
        // Prisma recursive queries can be tricky. 
        // Simplify: fetch all active comments for the article and reorganize in memory? 
        // Or just fetch root comments and their replies (1 level deep is standard, but nested?)
        // The current schema has parentId.
        // Let's fetch ALL comments for the article and construct the tree or let frontend do it.
        // Better: Fetch where parentId is null, and include replies.

        const rootComments = await prisma.comment.findMany({
            where: {
                articleId,
                parentId: null,
                status: 'active',
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                replies: {
                    where: { status: 'active' },
                    orderBy: { createdAt: 'asc' },
                    include: {
                        replies: { // Support 2 levels of nesting if needed, or more
                            where: { status: 'active' },
                            orderBy: { createdAt: 'asc' }
                        }
                    }
                }
            }
        });

        // We can map this to the frontend structure.
        const formattedComments = rootComments.map(comment => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt.toISOString(),
            likes: comment.likes,
            author: {
                name: comment.name,
                avatar: null, // We don't store avatar for guests yet
                isAdmin: comment.isAdmin
            },
            isEdited: false, // Not tracking edits yet
            replies: comment.replies.map(reply => ({
                id: reply.id,
                content: reply.content,
                createdAt: reply.createdAt.toISOString(),
                likes: reply.likes,
                author: {
                    name: reply.name,
                    avatar: null,
                    isAdmin: reply.isAdmin
                },
                replies: reply.replies?.map(subReply => ({
                    id: subReply.id,
                    content: subReply.content,
                    createdAt: subReply.createdAt.toISOString(),
                    likes: subReply.likes,
                    author: {
                        name: subReply.name,
                        avatar: null,
                        isAdmin: subReply.isAdmin
                    }
                })) || []
            }))
        }));

        return NextResponse.json(formattedComments);

    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// POST /api/comments
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { articleId, name, email, content, parentId } = body;

        if (!articleId || !name || !email || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const comment = await prisma.comment.create({
            data: {
                articleId,
                parentId: parentId || null,
                name,
                email,
                content,
                status: 'active', // Auto-approve
            },
        });

        return NextResponse.json(comment, { status: 201 });

    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
