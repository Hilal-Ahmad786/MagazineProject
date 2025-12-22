import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/admin/comments
export async function GET(request: NextRequest) {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                article: {
                    select: {
                        title: true,
                        slug: true,
                        issue: {
                            select: {
                                number: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching admin comments:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
