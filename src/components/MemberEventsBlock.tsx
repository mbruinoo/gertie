import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import MemberEventsList from './MemberEventsList'

export default async function MemberEventsBlock({
  subtitle,
  ctaLabel,
  ctaUrl,
}: {
  subtitle?: string
  ctaLabel?: string
  ctaUrl?: string
}) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'events',
    where: {
      and: [
        { date: { greater_than: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() } },
        { category: { not_equals: 'curated-experience' } },
      ],
    },
    sort: 'date',
    limit: 100,
    depth: 2,
    draft: false,
  }).catch(() => ({ docs: [] }))

  const events = (result.docs as any[]).map((event) => ({
    id: event.id,
    title: event.title,
    category: event.category ?? '',
    date: event.date ?? null,
    coverImageUrl: event.coverImage?.url ?? null,
    venueName: event.venue?.value?.name ?? event.venue?.name ?? '',
    tags: (event.tags ?? []).map((t: any) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      color: t.color ?? null,
    })),
  }))

  return (
    <section className="page-section member-events-section">
      <div className="page-section-label">
        <p><strong>Curious Experiences</strong></p>
        {subtitle && (
          <p style={{ fontWeight: 400, marginTop: '8px' }}>
            {subtitle}
            {ctaLabel && ctaUrl && (
              <><br /><Link href={ctaUrl} className="arrow-link">{ctaLabel} <span className="animrightarrow">&rarr;</span></Link></>
            )}
          </p>
        )}
      </div>
      <div className="page-section-body">
        <MemberEventsList events={events} />
      </div>
    </section>
  )
}
