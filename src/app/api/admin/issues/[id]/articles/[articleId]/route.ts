import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET(request: Request, { params }: { params: { id: string, articleId: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const article = await prisma.article.findUnique({
            where: { id: params.articleId },
            include: { author: true }
        });

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string, articleId: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Prepare update data
        const updateData: any = {
            title: body.title,
            slug: body.slug,
            status: body.status,
            excerpt: body.excerpt,
            readTime: body.readTime ? parseInt(body.readTime.toString()) : undefined,
            publishDate: body.date ? new Date(body.date) : (body.publishDate ? new Date(body.publishDate) : undefined),
            authorId: body.authorId,
            image: body.image,
            featured: body.featured,
            categoryId: body.categoryId || null
        };

        // If content is provided
        if (body.content !== undefined) {
            updateData.content = typeof body.content === 'string' ? body.content : JSON.stringify(body.content);
        }

        // Clean undefined values
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const updatedArticle = await prisma.article.update({
            where: { id: params.articleId },
            data: updateData
        });

        return NextResponse.json(updatedArticle);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string, articleId: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.article.delete({
            where: { id: params.articleId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
    }
}
