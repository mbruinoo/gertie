import { getPayload } from 'payload'
import config from '@payload-config'
import NavServer from '@/components/NavServer'
import SiteFooter from '@/components/SiteFooter'

export default async function NotFound() {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({ slug: 'footer' }).catch(() => null)

  return (
    <>
      <NavServer />
      <main style={{ paddingTop: '80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 'var(--padding)' }}>
          <h1 style={{ fontWeight: 400, marginBottom: '0.5em' }}>404</h1>
          <p style={{ fontWeight: 300 }}>Page not found.</p>
        </div>
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
