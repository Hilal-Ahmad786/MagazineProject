import emailjs from '@emailjs/browser'

// Initialize EmailJS with public key
const initEmailJS = () => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
        emailjs.init(publicKey)
    }
}

// Initialize on module load
if (typeof window !== 'undefined') {
    initEmailJS()
}

/**
 * Send contact form notification to admin
 */
export const sendContactNotification = async (data: {
    name: string
    email: string
    title: string
    message: string
}) => {
    try {
        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
            {
                name: data.name,
                email: data.email,
                title: data.title,
                message: data.message,
            }
        )
        console.log('Contact email sent successfully:', response)
        return { success: true, response }
    } catch (error) {
        console.error('EmailJS Contact Error:', error)
        return { success: false, error }
    }
}

/**
 * Send newsletter signup notification to admin
 */
export const sendNewsletterNotification = async (
    subscriberEmail: string,
    subscriberName?: string
) => {
    try {
        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID!,
            {
                subscriber_email: subscriberEmail,
                subscriber_name: subscriberName || 'Belirtilmedi',
                signup_date: new Date().toLocaleString('tr-TR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                }),
            }
        )
        console.log('Newsletter email sent successfully:', response)
        return { success: true, response }
    } catch (error) {
        console.error('EmailJS Newsletter Error:', error)
        return { success: false, error }
    }
}

/**
 * Send author application notification to admin
 */
export const sendAuthorApplicationNotification = async (data: {
    name: string
    email: string
    bio?: string
    sampleWork?: string
}) => {
    try {
        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!, // Reuse contact template
            {
                name: data.name,
                email: data.email,
                title: 'Yeni Yazar Başvurusu',
                message: `Biyografi: ${data.bio || 'Belirtilmedi'}\n\nÖrnek Çalışma: ${data.sampleWork || 'Belirtilmedi'}`,
            }
        )
        console.log('Author application email sent successfully:', response)
        return { success: true, response }
    } catch (error) {
        console.error('EmailJS Author Application Error:', error)
        return { success: false, error }
    }
}