import { Article, Person, Organization, WithContext } from 'schema-dts'
import { SITE_CONFIG } from '@/lib/constants'

export function JsonLd({ data }: { data: WithContext<Article | Person | Organization> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}

export function OrganizationJsonLd() {
    const data: WithContext<Organization> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.title,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/images/logo.png`,
        sameAs: [
            'https://twitter.com/mazhardergisi',
            'https://instagram.com/mazhardergisi',
            'https://facebook.com/mazhardergisi',
        ],
    }

    return <JsonLd data={data} />
}
