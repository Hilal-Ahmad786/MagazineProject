import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

// Helper to ensure authentication
async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();

        // Prepare update data
        const updateData: any = {
            name: data.name,
            role: data.role,
            title: data.title,
            bio: data.bio,
            avatar: data.avatar,
            email: data.email,
            social: data.social || {}, // Ensure social is passed/updated
            active: data.active !== undefined ? data.active : true, // Preserve or update active status
            updatedAt: new Date()
        };

        // If joinedAt is provided, update it
        if (data.joinedAt) {
            updateData.joinedAt = new Date(data.joinedAt);
        }

        // Only update slug if it changed, to avoid unique constraint issues if same
        if (data.slug) {
            // Check if slug is different from current? Value collision check is handled by Prisma unique constraint
            // But we might want to check if another author has it? Prisma throws error P2002.
            // We can just try to update.
            updateData.slug = data.slug;
        }

        const updatedAuthor = await prisma.author.update({
            where: { id: params.id },
            data: updateData
        });

        return NextResponse.json(updatedAuthor);
    } catch (error: any) {
        console.error("Failed to update author:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
        }
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Author not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update author: " + error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.author.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Failed to delete author:", error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: "Author not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete author" }, { status: 500 });
    }
}
