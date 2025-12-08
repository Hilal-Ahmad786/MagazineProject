import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Mazhar Dergisi'
  const subtitle = searchParams.get('subtitle') || 'Düşünce ve Edebiyat'
  const author = searchParams.get('author') || ''
  const theme = searchParams.get('theme') || ''
  const type = searchParams.get('type') || 'default' // default, article, author, issue

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000000',
          padding: '60px',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, white 2px, white 4px)',
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 900,
              color: '#facc15',
              letterSpacing: '-1px',
            }}
          >
            MAZHAR.
          </div>
          {theme && (
            <div
              style={{
                padding: '8px 20px',
                backgroundColor: '#facc15',
                color: '#000000',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {theme}
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? '48px' : '64px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '20px',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p
              style={{
                fontSize: '24px',
                color: '#9ca3af',
                maxWidth: '700px',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #374151',
            paddingTop: '30px',
          }}
        >
          {author ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#facc15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#000000',
                }}
              >
                {author.charAt(0)}
              </div>
              <span style={{ fontSize: '20px', color: '#ffffff' }}>{author}</span>
            </div>
          ) : (
            <div style={{ fontSize: '18px', color: '#6b7280' }}>
              mazhardergisi.com
            </div>
          )}
          
          <div style={{ fontSize: '18px', color: '#6b7280' }}>
            Düşünce ve Edebiyat Dergisi
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
