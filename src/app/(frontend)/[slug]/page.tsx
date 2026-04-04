import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import NavServer from '@/components/NavServer'
import PageHero from '@/components/PageHero'
import TeamAccordion from '@/components/TeamAccordion'
import SiteFooter from '@/components/SiteFooter'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const [result, footer] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: false,
    }).catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
  ])

  const page = result?.docs?.[0]
  if (!page) notFound()

  return (
    <>
      <NavServer />
      <main style={{ paddingTop: '80px' }}>
        <PageHero title={page.title} />

        {((page.layout as any[]) ?? []).map((block: any, i: number) => {
          if (block.blockType === 'richText') {
            return (
              <section key={i} className="page-section">
                <div className="page-section-label">
                  {block.sectionLabel && <RichText data={block.sectionLabel} />}
                </div>
                <div className={`page-section-body${block.constrainWidth !== false ? ' page-section-body--constrained' : ''}`}>
                  <RichText data={block.body} />
                </div>
              </section>
            )
          }

          if (block.blockType === 'teamSection') {
            return (
              <section key={i} className="page-section">
                <div className="page-section-label">
                  {block.sectionLabel && <RichText data={block.sectionLabel} />}
                </div>
                <div className={`page-section-body${block.constrainWidth !== false ? ' page-section-body--constrained' : ''}`}>
                  <TeamAccordion members={block.members ?? []} />
                </div>
              </section>
            )
          }

          return null
        })}
      </main>

      <SiteFooter
        instagramUrl={(footer as any)?.instagramUrl}
        copyrightText={(footer as any)?.copyrightText}
      />
    </>
  )
}
