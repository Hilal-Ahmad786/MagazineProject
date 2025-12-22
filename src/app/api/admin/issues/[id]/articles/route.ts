import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const issueIdParam = params.id;
        let issue = null;

        // 1. Try by ID (only if valid UUID)
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(issueIdParam);
        if (isUUID) {
            issue = await prisma.issue.findUnique({
                where: { id: issueIdParam }
            });
        }

        // 2. Try by Slug
        if (!issue) {
            issue = await prisma.issue.findUnique({
                where: { slug: issueIdParam }
            });
        }

        // 3. Try by Number (extract digits)
        if (!issue) {
            const issueNumber = parseInt(issueIdParam.replace(/[^0-9]/g, ''));
            if (!isNaN(issueNumber)) {
                issue = await prisma.issue.findUnique({
                    where: { number: issueNumber }
                });
            }
        }

        if (!issue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        const articles = await prisma.article.findMany({
            where: { issueId: issue.id },
            orderBy: { createdAt: "desc" },
            include: { author: true }
        });

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();

        // Resolve issue ID
        const issueIdParam = params.id;
        let issue = null;

        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(issueIdParam);
        if (isUUID) {
            issue = await prisma.issue.findUnique({ where: { id: issueIdParam } });
        }

        if (!issue) {
            issue = await prisma.issue.findUnique({ where: { slug: issueIdParam } });
        }

        if (!issue) {
            const issueNumber = parseInt(issueIdParam.replace(/[^0-9]/g, ''));
            if (!isNaN(issueNumber)) {
                issue = await prisma.issue.findUnique({ where: { number: issueNumber } });
            }
        }

        if (!issue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        const issueId = issue.id;

        // Generate slug if missing
        let slug = data.slug;
        if (!slug && data.title) {
            slug = data.title
                .toLowerCase()
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
        }

        // Check if slug exists
        const existingDetails = await prisma.article.findUnique({ where: { slug } });
        if (existingDetails) {
            slug = `${slug}-${Date.now()}`;
        }

        const newArticle = await prisma.article.create({
            data: {
                title: data.title,
                slug: slug,
                status: data.status || "draft",
                excerpt: data.excerpt,
                content: typeof data.content === 'string' ? data.content : JSON.stringify(data.content || []),
                readTime: parseInt(data.readTime?.toString() || "5"),
                publishDate: data.date ? new Date(data.date) : new Date(),
                issueId: issueId,
                authorId: data.authorId,
                featured: data.featured || false,

                image: data.image,
                categoryId: data.categoryId || null
            }
        });

        return NextResponse.json(newArticle);
    } catch (error) {
        console.error("Create article error:", error);
        return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
    }
}
