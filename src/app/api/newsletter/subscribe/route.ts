import { NextResponse } from 'next/server'

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

        // Mock delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Here you would typically integrate with Mailchimp, ConvertKit, etc.
        // await addToMailingList(email)

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
