import { NextResponse } from 'next/server'
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        // Validate email
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            )
        }

        // Check availability
        const existing = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            // Already subscribed, treat as success
            return NextResponse.json({ success: true, message: "Already subscribed" });
        }

        // Create subscriber
        await prisma.subscriber.create({
            data: {
                email,
                source: 'website',
                status: 'active'
            }
        });

        console.log(`[Newsletter] New subscriber: ${email}`)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[Newsletter] Subscription failed:', error)
        return NextResponse.json(
            { error: 'Subscription failed' },
            { status: 500 }
        )
    }
}
