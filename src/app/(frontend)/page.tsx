import { getPayload } from 'payload'
import config from '@payload-config'
import Nav from '@/components/Nav'
import Masthead from '@/components/Masthead'
import Ticker from '@/components/Ticker'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homepage, footer, upcomingEvents] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }).catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
    payload.find({
      collection: 'events',
      where: { date: { greater_than: new Date().toISOString() } },
      sort: 'date',
      limit: 20,
      draft: false,
    }).catch(() => ({ docs: [] })),
  ])

  const tagline =
    (homepage as any)?.tagline ??
    'A platform for the creation and experience of contemporary art. From the world to Chicago and Chicago to the world.'

  const mastheadPhotos = ((homepage as any)?.mastheadPhotos ?? []).map((p: any) => ({
    url: p.image?.url ?? '',
    alt: p.image?.alt ?? '',
    caption: p.caption ?? '',
  }))

  const tickerItems = upcomingEvents.docs.map((event: any) => {
    const date = event.date
      ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
      : ''
    const venue = event.venue?.value?.name ?? event.venue?.name ?? ''
    return {
      label: [event.title, venue, date].filter(Boolean).join(' · '),
    }
  })

  // Fallback ticker items while no events are in the CMS yet
  const fallbackTicker = [
    { label: 'Add upcoming events in the Payload admin to populate this ticker' },
  ]

  return (
    <>
      <Nav transparent />

      <main>
        <Masthead tagline={tagline} photos={mastheadPhotos} />

        <Ticker items={tickerItems.length ? tickerItems : fallbackTicker} />

        {/* About section */}
        <section
          style={{
            zIndex: 1,
            paddingTop: 'calc(var(--padding) * 2)',
            paddingBottom: 'calc(var(--padding) * 2)',
            paddingRight: 'var(--padding)',
            paddingLeft: 'var(--padding)',
            display: 'grid',
            gridTemplate: '"Area Area-2 Area-2 Area-2" / 1fr 1fr 1fr 1fr',
            columnGap: '16px',
          }}
        >
          <div style={{ gridArea: 'Area' }}>
            <h5 style={{ margin: 0, fontWeight: 700, fontSize: '14px' }}>
              <strong>About Gertie</strong>
            </h5>
          </div>
          <div style={{ gridArea: 'Area-2', maxWidth: '720px' }}>
            <h3 style={{ fontWeight: 400, margin: '0 0 1.5em' }}>
              Gertie is a platform for contemporary art and performance in
              Chicago—built on the conviction that complex, uncompromising practices can be deeply
              felt by a general audience. Through our exhibition program and membership community,
              we work to close the distance between ambitious art and curious people: equipping
              audiences to understand how the art world actually works, why it matters, and how to
              move through it with confidence. We partner with artists, curators, galleries, and
              institutions to connect Chicago to the world and the world to Chicago.
            </h3>
            <h5 style={{ margin: 0, fontSize: '14px' }}>
              <Link
                href="/about"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Learn more about Gertie{' '}
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.45s cubic-bezier(0.64, 0.57, 0.37, 1.53)',
                  }}
                  className="animrightarrow"
                >
                  →
                </span>
              </Link>
            </h5>
          </div>
        </section>
      </main>

      <SiteFooter
        klaviyoEmbedCode={(footer as any)?.klaviyoEmbedCode}
        instagramUrl={(footer as any)?.instagramUrl}
        copyrightText={(footer as any)?.copyrightText}
      />
    </>
  )
}
