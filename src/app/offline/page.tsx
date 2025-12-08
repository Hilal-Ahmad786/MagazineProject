import { Metadata } from 'next'
import { OfflineClient } from './OfflineClient'

export const metadata: Metadata = {
  title: 'Çevrimdışı | Mazhar Dergisi',
}

export default function OfflinePage() {
  return <OfflineClient />
}
