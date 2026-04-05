// pnpm tsx scripts/patch-membership-cta-urls.ts
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

async function main() {
  const auth = await api('POST', '/api/users/login', {
    email: 'test@bruinooge.net',
    password: 'vvwDEsWqLeim9onPDi7XCnXz',
  })
  const token: string = auth.token
  console.log(`Login: ${token ? 'OK' : 'FAILED'}`)
  if (!token) process.exit(1)

  const page = await api('GET', '/api/pages?where[slug][equals]=membership&limit=1', undefined, token)
  const doc = page?.docs?.[0]
  if (!doc) { console.error('No membership page found'); process.exit(1) }
  console.log(`Found membership page id=${doc.id}`)

  // Strip id fields from blocks (Payload re-assigns them on PATCH)
  function stripIds(obj: any): any {
    if (Array.isArray(obj)) return obj.map(stripIds)
    if (obj && typeof obj === 'object') {
      const { id, ...rest } = obj
      return Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, stripIds(v)]))
    }
    return obj
  }

  // Patch the layout: update ctaUrl on all membershipOptions cards
  const layout = doc.layout?.map((block: any) => {
    if (block.blockType !== 'membershipOptions') return block
    return {
      ...block,
      cards: block.cards?.map((card: any) => ({
        ...card,
        ctaUrl: 'https://join.gertie.co/',
      })),
    }
  })

  const cleanLayout = stripIds(layout)

  const result = await api('PATCH', `/api/pages/${doc.id}`, { layout: cleanLayout }, token)
  if (result.doc?.id) {
    console.log('Patched membership page CTAs → https://join.gertie.co/')
  } else {
    console.error('Error:', JSON.stringify(result.errors ?? result, null, 2))
    process.exit(1)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
