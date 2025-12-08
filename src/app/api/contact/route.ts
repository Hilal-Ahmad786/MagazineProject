import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları doldurun.' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      )
    }

    // Send email via Resend (or your preferred email service)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'iletisim@mazhardergisi.com'

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
          reply_to: email,
          subject: `İletişim Formu: ${subject}`,
          html: `
            <h2>Yeni İletişim Mesajı</h2>
            <p><strong>Gönderen:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <hr />
            <h3>Mesaj</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        }),
      })

      // Optional: Send auto-reply to user
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Mazhar Dergisi <noreply@mazhardergisi.com>',
          to: email,
          subject: 'Mesajınız Alındı - Mazhar Dergisi',
          html: `
            <h2>Merhaba ${name},</h2>
            <p>Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <hr />
            <p>Teşekkürler,<br>Mazhar Dergisi Ekibi</p>
          `,
        }),
      })
    }

    // Log for development
    console.log('New contact message:', { name, email, subject })

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi!'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
