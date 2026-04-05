import { getPayload } from 'payload'
import config from '@payload-config'
import NavServer from '@/components/NavServer'
import SiteFooter from '@/components/SiteFooter'
import ExhibitionSidebar from '@/components/ExhibitionSidebar'

export default async function ExhibitionsLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })

  const [result, footer] = await Promise.all([
    payload
      .find({
        collection: 'exhibitions',
        limit: 100,
        draft: false,
        sort: '-dateStart',
      })
      .catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
  ])

  const exhibitions = (result?.docs ?? []) as any[]
  const upcoming = exhibitions
    .filter((e) => e.status === 'upcoming')
    .map((e) => ({ slug: e.slug, title: e.title, dateStart: e.dateStart ?? null, venue: e.venue ?? null }))
  const past = exhibitions
    .filter((e) => e.status === 'past')
    .map((e) => ({ slug: e.slug, title: e.title, dateStart: e.dateStart ?? null, venue: e.venue ?? null }))

  return (
    <>
      <NavServer />
      <div className="exhibition-layout" style={{ paddingTop: '80px' }}>
        <div className="exhibition-sidebar-wrapper">
          <ExhibitionSidebar upcoming={upcoming} past={past} />
        </div>
        <main className="exhibition-main">{children}</main>
      </div>
      <SiteFooter
        instagramUrl={(footer as any)?.instagramUrl}
        copyrightText={(footer as any)?.copyrightText}
        privacyPolicyPdfUrl={(footer as any)?.privacyPolicyPdf?.url}
        contactEmail={(footer as any)?.contactEmail}
      />
    </>
  )
}
