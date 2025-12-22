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

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { articles: true } } }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = categorySchema.parse(json);

        const existing = await prisma.category.findUnique({
            where: { slug: body.slug }
        });

        if (existing) {
            return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: body
        });

        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
