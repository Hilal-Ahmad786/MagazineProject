import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: {
                number: 'desc'
            }
        });

        return NextResponse.json(issues);
    } catch (error) {
        console.error("Failed to fetch issues", error);
        return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();

        // Check if slug exists
        const slug = data.slug || `sayi-${data.number}`;
        const existingSlug = await prisma.issue.findUnique({
            where: { slug }
        });

        if (existingSlug) {
            return NextResponse.json({ error: "Issue with this slug already exists" }, { status: 400 });
        }

        // Check if number exists
        const existingNumber = await prisma.issue.findUnique({
            where: { number: parseInt(data.number) }
        });

        if (existingNumber) {
            return NextResponse.json({ error: "Issue number already exists" }, { status: 400 });
        }

        const issue = await prisma.issue.create({
            data: {
                title: data.title,
                number: parseInt(data.number),
                slug,
                publishMonth: data.publishMonth,
                publishDate: data.date ? new Date(data.date) : new Date(),
                coverImage: data.coverImage,
                status: data.status || 'draft',
                // Default theme if needed
                theme: 'dark'
            }
        });

        return NextResponse.json(issue);
    } catch (error) {
        console.error("Failed to create issue", error);
        return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
    }
}
