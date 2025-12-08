import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { fullName, email, bio, interests, sampleWork, motivation } = data

    // Validation
    if (!fullName || !email || !bio || !interests?.length || !sampleWork || !motivation) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurun.' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      )
    }

    // Option 1: Send email via external service (e.g., Resend, SendGrid)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'editor@mazhardergisi.com'

    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Mazhar Dergisi <noreply@mazhardergisi.com>',
          to: NOTIFICATION_EMAIL,
          subject: `Yeni Yazar Başvurusu: ${fullName}`,
          html: `
            <h2>Yeni Yazar Başvurusu</h2>
            <p><strong>Ad Soyad:</strong> ${fullName}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${data.phone || 'Belirtilmedi'}</p>
            <p><strong>Meslek:</strong> ${data.occupation || 'Belirtilmedi'}</p>
            <p><strong>İlgi Alanları:</strong> ${interests.join(', ')}</p>
            <p><strong>Portfolyo:</strong> ${data.portfolio || 'Belirtilmedi'}</p>
            <hr />
            <h3>Biyografi</h3>
            <p>${bio}</p>
            <hr />
            <h3>Motivasyon</h3>
            <p>${motivation}</p>
            <hr />
            <h3>Örnek Yazı</h3>
            <p>${sampleWork}</p>
          `,
        }),
      })
    }

    // Option 2: Store in database (implement your own logic)
    // await db.authorApplications.create({ data })

    // Log for development
    console.log('New author application:', { fullName, email, interests })

    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alındı!'
    })

  } catch (error) {
    console.error('Author application error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
