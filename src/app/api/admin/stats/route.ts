import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [
            issuesCount,
            articlesCount,
            authorsCount,
            subscribersCount,
            recentActivity
        ] = await Promise.all([
            prisma.issue.count(),
            prisma.article.count(),
            prisma.author.count(),
            prisma.subscriber.count(),
            prisma.activityLog.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return NextResponse.json({
            stats: {
                issues: issuesCount,
                articles: articlesCount,
                authors: authorsCount,
                subscribers: subscribersCount
            },
            activity: recentActivity
        });

    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
