import { getPayload } from 'payload'
import config from '@payload-config'
import Nav from './Nav'

export default async function NavServer({ transparent = false }: { transparent?: boolean }) {
  const payload = await getPayload({ config })
  const nav = await payload.findGlobal({ slug: 'navigation' }).catch(() => null)

  const navLinks = (nav?.navLinks ?? []).map((l: any) => ({ label: l.label, href: l.url }))
  const ctaLinks = (nav?.ctaLinks ?? []).map((l: any) => ({ label: l.label, href: l.url }))

  return (
    <Nav
      transparent={transparent}
      navLinks={navLinks.length ? navLinks : undefined}
      ctaLinks={ctaLinks.length ? ctaLinks : undefined}
    />
  )
}
