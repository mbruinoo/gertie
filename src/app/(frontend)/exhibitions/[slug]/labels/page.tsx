import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'exhibitions', where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => null)
  const exhibition = result?.docs?.[0] as any
  if (!exhibition) return {}
  return { title: `Exhibition Labels — ${exhibition.title}` }
}

export default async function ExhibitionLabelsPage({
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

  const labels = (exhibition.labels ?? []) as {
    artistName: string
    content?: any
    audioCaption?: string
    audioUrl?: string
  }[]

  return (
    <>
      <div className="exhibition-body" style={{ paddingTop: 'calc(var(--padding) * 3)' }}>
        <h3 className="exhibition-body-label">Exhibition Labels</h3>

        {labels.map((label, i) => (
          <div key={i} className="exhibition-body-section">
            <p className="labels-artist-name">{label.artistName}</p>
            {label.content && <RichText data={label.content} />}
            {label.audioCaption && (
              <p className="labels-audio-heading">{label.audioCaption}</p>
            )}
            {label.audioUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio controls src={label.audioUrl} className="labels-audio" />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

