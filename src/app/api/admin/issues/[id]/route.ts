import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

// Helper to determine if ID is UUID or Slug
const isUUID = (str: string) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(str);
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let issue;
        if (isUUID(params.id)) {
            issue = await prisma.issue.findUnique({
                where: { id: params.id }
            });
        } else {
            issue = await prisma.issue.findUnique({
                where: { slug: params.id }
            });
        }

        if (!issue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        return NextResponse.json(issue);
    } catch (error) {
        console.error("Failed to fetch issue", error);
        return NextResponse.json({ error: "Failed to fetch issue" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();

        // 1. Find existing issue
        let existingIssue;
        if (isUUID(params.id)) {
            existingIssue = await prisma.issue.findUnique({ where: { id: params.id } });
        } else {
            existingIssue = await prisma.issue.findUnique({ where: { slug: params.id } });
        }

        if (!existingIssue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        // 2. Check if new slug is taken (if slug changed)
        if (data.slug && data.slug !== existingIssue.slug) {
            const slugExists = await prisma.issue.findUnique({ where: { slug: data.slug } });
            if (slugExists) {
                return NextResponse.json({ error: "New slug already in use" }, { status: 400 });
            }
        }

        // 3. Check if number is taken (if number changed)
        if (data.number && data.number !== existingIssue.number) {
            const numberExists = await prisma.issue.findUnique({ where: { number: data.number } });
            if (numberExists) {
                return NextResponse.json({ error: "Issue number already exists" }, { status: 400 });
            }
        }

        // 4. Update
        const updatedIssue = await prisma.issue.update({
            where: { id: existingIssue.id },
            data: {
                title: data.title,
                number: parseInt(String(data.number)),
                theme: data.theme || existingIssue.theme, // Preserve if not sent, logical fallback
                slug: data.slug,
                publishMonth: data.publishMonth,
                publishDate: data.date ? new Date(data.date) : undefined,
                coverImage: data.coverImage,
                status: data.status,
                // Add other fields as necessary from schema
            }
        });

        return NextResponse.json(updatedIssue);
    } catch (error) {
        console.error("Failed to update issue", error);
        return NextResponse.json({ error: "Failed to update issue" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let existingIssue;
        if (isUUID(params.id)) {
            existingIssue = await prisma.issue.findUnique({ where: { id: params.id } });
        } else {
            existingIssue = await prisma.issue.findUnique({ where: { slug: params.id } });
        }

        if (!existingIssue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        await prisma.issue.delete({
            where: { id: existingIssue.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete issue", error);
        return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 });
    }
}
