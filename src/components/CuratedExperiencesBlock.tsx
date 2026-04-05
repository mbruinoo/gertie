import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

type UpcomingItem = { title: string; note?: string; id?: string }

export default async function CuratedExperiencesBlock({
  ctaLabel,
  ctaUrl,
  upcomingItems,
  disclaimer,
}: {
  ctaLabel?: string
  ctaUrl?: string
  upcomingItems?: UpcomingItem[]
  disclaimer?: string
}) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'events',
    where: { category: { equals: 'curated-experience' } },
    sort: 'date',
    limit: 20,
    depth: 1,
    draft: false,
  }).catch(() => ({ docs: [] }))

  const experiences = (result.docs as any[]).map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date
      ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : null,
    imageUrl: event.coverImage?.url ?? null,
    imageAlt: event.coverImage?.alt ?? event.title,
  }))

  return (
    <section className="page-section">
      <div className="page-section-label">
        <p>
          <strong>Curated Experiences</strong><br />
          Interested in joining a trip?<br />
          {ctaLabel && ctaUrl && (
            <Link href={ctaUrl} className="arrow-link">
              {ctaLabel} <span className="animrightarrow">&rarr;</span>
            </Link>
          )}
        </p>
        {(upcomingItems && upcomingItems.length > 0) && (
          <div style={{ marginTop: '32px' }}>
            <p><strong>Upcoming:</strong></p>
            <ul className="curated-upcoming-list">
              {upcomingItems.map((item, i) => (
                <li key={i}>
                  {item.title}
                  {item.note && <><br /><span style={{ fontWeight: 400 }}>{item.note}</span></>}
                </li>
              ))}
            </ul>
            {disclaimer && <p className="curated-disclaimer">{disclaimer}</p>}
          </div>
        )}
      </div>
      <div className="page-section-body">
        <div className="curated-experiences-grid">
          {experiences.map((exp) => (
            <a key={exp.id} className="curated-experience-item" href="https://join.gertie.co/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              {exp.date && <p className="curated-experience-date">{exp.date}</p>}
              <h3 className="curated-experience-title">{exp.title}</h3>
              {exp.imageUrl && (
                <div className="curated-experience-image-wrap">
                  <Image
                    src={exp.imageUrl}
                    alt={exp.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
