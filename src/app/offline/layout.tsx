import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Çevrimdışı',
    description: 'İnternet bağlantınız yok',
}

export default function OfflineLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
