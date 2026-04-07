import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { buildMetadata } from '@/lib/buildMetadata'
import NavServer from '@/components/NavServer'
import Masthead from '@/components/Masthead'
import Ticker from '@/components/Ticker'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const [homepage, settings] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null),
  ])
  const hp = homepage as any
  const firstMastheadImage = hp?.mastheadPhotos?.[0]?.image?.url ?? null
  return buildMetadata({
    seo: hp?.seo,
    fallbackImageUrl: firstMastheadImage,
    settings,
  })
}

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
    caption: p.caption ?? null,
  }))

  const tickerItems = upcomingEvents.docs.map((event: any) => {
    const date = event.date
      ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
      : ''
    const venue = event.venue?.value?.name ?? event.venue?.name ?? ''
    const prefix = event.tickerPrefix ? `${event.tickerPrefix}: ` : ''
    return {
      label: prefix + [event.title, venue, date].filter(Boolean).join(' · '),
      url: event.registrationUrl ?? '/membership',
    }
  })

  // Fallback ticker items while no events are in the CMS yet
  const fallbackTicker = [
    { label: 'Add upcoming events in the Payload admin to populate this ticker' },
  ]

  return (
    <>
      <NavServer transparent />

      <main>
        <Masthead tagline={tagline} photos={mastheadPhotos} />

        <Ticker items={tickerItems.length ? tickerItems : fallbackTicker} />

        {/* About section */}
        <section className="about-section">
          <div style={{ gridArea: 'Area' }} className="about-section-label">
            <h5>About Gertie</h5>
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
            <h5>
              <Link href="/about" className="arrow-link" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span className="arrow-text">Learn more about Gertie</span>
                {' '}
                <span className="animrightarrow">→</span>
              </Link>
            </h5>
          </div>
        </section>
      </main>

      <SiteFooter
        klaviyoEmbedCode={(footer as any)?.klaviyoEmbedCode}
        instagramUrl={(footer as any)?.instagramUrl}
        privacyPolicyPdfUrl={(footer as any)?.privacyPolicyPdf?.url}
        contactEmail={(footer as any)?.contactEmail}
        copyrightText={(footer as any)?.copyrightText}
      />
    </>
  )
}
