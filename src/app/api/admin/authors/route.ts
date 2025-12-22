import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

// Helper to ensure authentication
async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const authors = await prisma.author.findMany({
            orderBy: { name: 'asc' }
        });

        // Map if needed, but Prisma types should be fine for API response
        return NextResponse.json(authors);
    } catch (error) {
        console.error("Failed to fetch authors:", error);
        return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const slug = data.slug || data.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

        // Validation check for duplicate slug
        const existing = await prisma.author.findUnique({
            where: { slug }
        });

        if (existing) {
            return NextResponse.json({ error: "Author with this slug already exists" }, { status: 400 });
        }

        const newAuthor = await prisma.author.create({
            data: {
                name: data.name,
                slug: slug,
                email: data.email,
                role: data.role || 'guest',
                title: data.title,
                avatar: data.avatar,
                bio: data.bio,
                social: data.social || {}, // Default empty json
                joinedAt: data.joinedAt ? new Date(data.joinedAt) : new Date(), // Use provided date or now
                active: true
            }
        });

        return NextResponse.json(newAuthor);
    } catch (error) {
        console.error("Failed to create author:", error);
        return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
    }
}
