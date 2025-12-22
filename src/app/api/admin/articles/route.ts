import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic';

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search");

        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { author: { name: { contains: search, mode: "insensitive" } } },
            ];
        }

        const articles = await prisma.article.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { name: true } },
                issue: { select: { number: true, title: true } },
                category: { select: { name: true } }
            },
            take: 100 // Limit for performance, consider pagination later
        });

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}
