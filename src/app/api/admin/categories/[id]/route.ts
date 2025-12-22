import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const category = await prisma.category.findUnique({
            where: { id: params.id },
            include: { _count: { select: { articles: true } } }
        });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const json = await req.json();
        const body = categorySchema.parse(json);

        const category = await prisma.category.update({
            where: { id: params.id },
            data: body
        });

        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.category.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
