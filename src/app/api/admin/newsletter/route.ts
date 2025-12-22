import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const existing = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
        }

        const newSubscriber = await prisma.subscriber.create({
            data: {
                email,
                source: 'admin',
                status: 'active'
            }
        });

        return NextResponse.json(newSubscriber);
    } catch (error) {
        console.error("Failed to add subscriber:", error);
        return NextResponse.json({ error: "Failed to add subscriber" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await prisma.subscriber.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Failed to delete subscriber:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
