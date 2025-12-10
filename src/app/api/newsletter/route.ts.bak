import { NextRequest, NextResponse } from 'next/server'

// Mailchimp API endpoint format: https://usX.api.mailchimp.com/3.0/
// Replace with your own values in .env.local:
// MAILCHIMP_API_KEY=your-api-key
// MAILCHIMP_AUDIENCE_ID=your-audience-id
// MAILCHIMP_API_SERVER=us1 (or your server prefix)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      )
    }

    // Option 1: Mailchimp Integration
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER

    if (MAILCHIMP_API_KEY && MAILCHIMP_AUDIENCE_ID && MAILCHIMP_API_SERVER) {
      const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['website'],
        }),
      })

      const data = await response.json()

      if (response.status === 400 && data.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'Bu e-posta zaten kayıtlı.' },
          { status: 400 }
        )
      }

      if (!response.ok) {
        console.error('Mailchimp error:', data)
        return NextResponse.json(
          { error: 'Kayıt sırasında bir hata oluştu.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, message: 'Başarıyla abone oldunuz!' })
    }

    // Option 2: ConvertKit Integration
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID

    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
      const url = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
        }),
      })

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Kayıt sırasında bir hata oluştu.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, message: 'Başarıyla abone oldunuz!' })
    }

    // Fallback: Just log (for development/testing)
    console.log('Newsletter signup:', email)
    
    // In production, you might want to:
    // - Store in database
    // - Send to your own email service
    // - Use a different provider

    return NextResponse.json({ 
      success: true, 
      message: 'Başarıyla abone oldunuz!' 
    })

  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
