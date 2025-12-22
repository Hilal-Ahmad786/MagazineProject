
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

// Schema for validation
const applicationSchema = z.object({
    fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    phone: z.string().optional(),
    occupation: z.string().optional(),
    bio: z.string().min(10, 'Biyografi en az 10 karakter olmalıdır'),
    interests: z.array(z.string()).min(1, 'En az 1 ilgi alanı seçmelisiniz'),
    sampleWork: z.string().min(50, 'Örnek yazı en az 50 karakter olmalıdır'),
    portfolio: z.string().url('Geçerli bir URL giriniz').optional().or(z.literal('')),
    motivation: z.string().min(10, 'Motivasyon yazısı en az 10 karakter olmalıdır'),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validatedData = applicationSchema.parse(body)

        const application = await prisma.authorApplication.create({
            data: {
                name: validatedData.fullName,
                email: validatedData.email,
                phone: validatedData.phone,
                // occupation is not in schema but useful, maybe append to bio or notes? 
                // Or we should add it to schema? 
                // Current schema: bio, sampleWork, portfolioUrl, socialLinks, topicsOfInterest, notes
                bio: `${validatedData.occupation ? `Meslek: ${validatedData.occupation}\n\n` : ''}${validatedData.bio}`,
                topicsOfInterest: validatedData.interests,
                sampleWork: validatedData.sampleWork,
                portfolioUrl: validatedData.portfolio || null,
                notes: `Motivasyon:\n${validatedData.motivation}`,
            },
        })

        return NextResponse.json({ success: true, data: application })
    } catch (error) {
        console.error('Application submission error:', error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json(
            { error: 'Başvuru gönderilirken bir hata oluştu.' },
            { status: 500 }
        )
    }
}
