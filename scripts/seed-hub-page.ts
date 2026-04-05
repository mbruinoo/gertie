// pnpm tsx scripts/seed-hub-page.ts
import { readFileSync } from 'fs'
import path from 'path'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

async function api(method: string, endpoint: string, data?: unknown, token?: string) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  return res.json()
}

const p = (text: string, format = 0) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
  textFormat: 0, textStyle: '',
  children: [{ type: 'text', text, format, style: '', mode: 'normal', detail: 0, version: 1 }],
})
const rt = (...paragraphs: any[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: paragraphs },
})

async function main() {
  const auth = await api('POST', '/api/users/login', {
    email: 'test@bruinooge.net',
    password: 'vvwDEsWqLeim9onPDi7XCnXz',
  })
  const token: string = auth.token
  console.log(`Login: ${token ? 'OK' : 'FAILED'}`)
  if (!token) process.exit(1)

  // Upload hub image
  const fileBuffer = readFileSync(path.join(process.cwd(), 'public/gertie-hub.png'))
  const blob = new Blob([fileBuffer], { type: 'image/png' })
  const form = new FormData()
  form.append('file', blob, 'gertie-hub.png')
  form.append('_payload', JSON.stringify({ alt: 'Gertie Hub building' }))
  const uploadRes = await fetch(`${BASE}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: form,
  })
  const uploadData = await uploadRes.json() as any
  const imageId = uploadData.doc?.id
  if (!imageId) throw new Error(`Image upload failed: ${JSON.stringify(uploadData)}`)
  console.log(`Uploaded hub image → media ID ${imageId}`)

  // Delete existing hub page
  const existing = await api('GET', '/api/pages?where[slug][equals]=hub&limit=1', undefined, token)
  if (existing?.docs?.[0]) {
    await api('DELETE', `/api/pages/${existing.docs[0].id}`, undefined, token)
    console.log('Deleted existing hub page')
  }

  const layout = [
    { blockType: 'hubHero', image: imageId },
    {
      blockType: 'richText',
      sectionLabel: rt(p('Hub')),
      body: rt(p('The Gertie Hub is lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae semper risus. Curabitur in purus in orci ultrices ultrices. Vestibulum eu imperdiet elit, ac ornare lectus. Maecenas euismod est ut lectus lacinia efficitur. Aliquam tincidunt neque vitae velit convallis, in cursus tellus vehicula.')),
      constrainWidth: true,
    },
    {
      blockType: 'hubInfo',
      address: '400 N Peoria St\nChicago, IL 60642',
      hours: 'Wednesday\u2013Saturday\n10am\u20136pm',
    },
    {
      blockType: 'memberEvents',
      subtitle: 'Interested in our member events?',
      ctaLabel: 'Learn more',
      ctaUrl: '/membership',
    },
    {
      blockType: 'richText',
      sectionLabel: rt(p('Gertie Exchange')),
      body: rt(p('Gertie Exchange is our collaborative programming arm\u2014a platform for bringing artists, galleries, and institutions from outside Chicago into meaningful, mutually beneficial dialogue with the city. Exchange partnerships create opportunities for visiting artists and institutions to engage directly with Chicago\u2019s audiences, collectors, and cultural infrastructure.')),
      constrainWidth: true,
    },
  ]

  const result = await api('POST', '/api/pages', {
    title: 'Hub',
    slug: 'hub',
    hideHeroRule: true,
    _status: 'published',
    layout,
  }, token)

  if (result.doc?.id) {
    console.log(`Hub page created: id=${result.doc.id}`)
  } else {
    console.error('Error:', JSON.stringify(result.errors ?? result, null, 2))
    process.exit(1)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
