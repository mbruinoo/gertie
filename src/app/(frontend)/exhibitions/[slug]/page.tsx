import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ExhibitionCoverClickable, ExhibitionInstallationGrid, ExhibitionLightboxController } from '@/components/ExhibitionImageGallery'

function formatDateRange(start?: string | null, end?: string | null): string | null {
  if (!start) return null
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const s = new Date(start)
  const sm = months[s.getUTCMonth()]
  const sd = s.getUTCDate()
  const sy = s.getUTCFullYear()
  if (!end) return `${sm} ${sd}, ${sy}`
  const e = new Date(end)
  const em = months[e.getUTCMonth()]
  const ed = e.getUTCDate()
  const ey = e.getUTCFullYear()
  if (sy === ey) {
    if (sm === em) return `${sm} ${sd}–${ed}, ${sy}`
    return `${sm} ${sd}–${em} ${ed}, ${sy}`
  }
  return `${sm} ${sd}, ${sy}–${em} ${ed}, ${ey}`
}

export default async function ExhibitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload
    .find({
      collection: 'exhibitions',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: false,
    })
    .catch(() => null)

  const exhibition = result?.docs?.[0] as any
  if (!exhibition) notFound()

  const dateRange = formatDateRange(exhibition.dateStart, exhibition.dateEnd)
  const curators = (exhibition.curators ?? []) as string[]
  const artists = (exhibition.artists ?? []) as { name: string }[]
  const documents = (exhibition.documents ?? []) as {
    label: string
    file?: { url?: string } | null
    url?: string
  }[]
  const installationImages = (exhibition.installationImages ?? []).flatMap((item: any) =>
    item.image?.url
      ? [{ url: item.image.url, alt: item.image.alt, width: item.image.width, height: item.image.height }]
      : []
  )
  const coverImage = exhibition.coverImage?.url
    ? {
        url: exhibition.coverImage.url,
        alt: exhibition.coverImage.alt ?? exhibition.title,
        width: exhibition.coverImage.width,
        height: exhibition.coverImage.height,
      }
    : null

  return (
    <>
      {/* Exhibition header */}
      <header className="exhibition-header">
        {(dateRange || exhibition.venue) && (
          <p className="exhibition-meta">
            {[dateRange, exhibition.venue].filter(Boolean).join(' at ')}
          </p>
        )}
        <h1 className="exhibition-title">{exhibition.title}</h1>
        {(curators.length > 0 || exhibition.presenting) && (
          <p className="exhibition-curators">
            {curators.length > 0 && (
              <span>Curated by {curators.join(' and ')}</span>
            )}
            {curators.length > 0 && exhibition.presenting && <br />}
            {exhibition.presenting && <span>{exhibition.presenting}</span>}
          </p>
        )}
      </header>

      {/* Cover image */}
      {coverImage && <ExhibitionCoverClickable image={coverImage} index={0} />}

      <div className="exhibition-body">
        {/* Description */}
        {exhibition.description && (
          <div className="exhibition-body-section">
            <RichText data={exhibition.description} />
          </div>
        )}

        {/* Artists */}
        {artists.length > 0 && (
          <div className="exhibition-body-section exhibition-body-section--artists">
            <h3 className="exhibition-body-label">Artists</h3>
            {artists.map((a, i) => (
              <p key={i} className="exhibition-body-text">{a.name}</p>
            ))}
          </div>
        )}

        {/* Installation images */}
        <ExhibitionInstallationGrid images={installationImages} indexOffset={coverImage ? 1 : 0} />

        {/* Documents */}
        {documents.length > 0 && (
          <div className="exhibition-body-section">
            <h3 className="exhibition-body-label">Documents</h3>
            {documents.map((doc, i) => {
              const href = doc.file?.url ?? doc.url
              if (!href) return null
              return (
                <p key={i} className="exhibition-body-text">
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {doc.label}
                  </a>
                </p>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox controller — listens for lightbox-open events */}
      <ExhibitionLightboxController
        images={[...(coverImage ? [coverImage] : []), ...installationImages]}
      />
    </>
  )
}
