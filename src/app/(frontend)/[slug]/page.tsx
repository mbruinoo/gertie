import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import NavServer from '@/components/NavServer'
import PageHero from '@/components/PageHero'
import TeamAccordion from '@/components/TeamAccordion'
import SiteFooter from '@/components/SiteFooter'
import MembershipOptionsBlock from '@/components/MembershipOptionsBlock'
import MemberEventsBlock from '@/components/MemberEventsBlock'
import CuratedExperiencesBlock from '@/components/CuratedExperiencesBlock'
import HubHeroBlock from '@/components/HubHeroBlock'
import HubInfoBlock from '@/components/HubInfoBlock'

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
        <PageHero title={page.title} hideRule={(page as any).hideHeroRule === true} />

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

          if (block.blockType === 'membershipOptions') {
            return <MembershipOptionsBlock key={i} cards={block.cards ?? []} />
          }

          if (block.blockType === 'memberEvents') {
            return (
              <MemberEventsBlock
                key={i}
                subtitle={block.subtitle}
                ctaLabel={block.ctaLabel}
                ctaUrl={block.ctaUrl}
              />
            )
          }

          if (block.blockType === 'curatedExperiences') {
            return (
              <CuratedExperiencesBlock
                key={i}
                ctaLabel={block.ctaLabel}
                ctaUrl={block.ctaUrl}
                upcomingItems={block.upcomingItems}
                disclaimer={block.disclaimer}
                experiences={(block.experiences ?? []).map((e: any) => ({
                  ...e,
                  image: e.image ? { url: e.image.url, alt: e.image.alt, width: e.image.width, height: e.image.height } : null,
                }))}
              />
            )
          }

          if (block.blockType === 'hubHero') {
            return <HubHeroBlock key={i} image={block.image} />
          }

          if (block.blockType === 'hubInfo') {
            return <HubInfoBlock key={i} address={block.address} hours={block.hours} />
          }

          return null
        })}
      </main>

      <SiteFooter
        instagramUrl={(footer as any)?.instagramUrl}
        copyrightText={(footer as any)?.copyrightText}
        privacyPolicyPdfUrl={(footer as any)?.privacyPolicyPdf?.url}
        contactEmail={(footer as any)?.contactEmail}
      />
    </>
  )
}
