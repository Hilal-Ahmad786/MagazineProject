import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/footer/Footer'
import { SearchModal } from '@/components/search/SearchModal'
import { ReadingListDrawer } from '@/components/reading-list/ReadingListDrawer'
import { PWARegister } from '@/components/pwa/PWARegister'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { OfflineIndicator } from '@/components/pwa/OfflineIndicator'
import { NewsletterModal } from '@/components/newsletter/NewsletterModal'
import { ScrollToTop } from '@/components/common/ScrollToTop'

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <PWARegister />
            <InstallPrompt variant="banner" delay={30000} />
            <OfflineIndicator variant="toast" />

            <NewsletterModal delay={60000} />
            <Header />
            {children}
            <Footer />
            <SearchModal />
            <ReadingListDrawer />
            <ScrollToTop />
        </>
    )
}
