// pnpm tsx scripts/seed-events.ts
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

const venues = [
  { name: 'Chicago Cultural Center', address: '78 E Washington St, Chicago, IL 60602' },
  { name: 'Gertie Hub', address: '400 N Peoria St, Chicago, IL 60642' },
  { name: 'Gertie', address: '400 N Peoria St, Chicago, IL 60642' },
  { name: 'Private Residence' },
  { name: 'Logan Square' },
]

const events = [
  { title: 'Member Preview: Ornament & Information', category: 'opening',       venueIdx: 0, date: '2026-04-09T18:00:00.000Z' },
  { title: 'Artist Conversation: B. Ingrid Olson',  category: 'talk',          venueIdx: 1, date: '2026-05-03T14:00:00.000Z' },
  { title: 'Curator Walkthrough: Over My Head',     category: 'walkthrough',   venueIdx: 2, date: '2026-05-17T11:00:00.000Z' },
  { title: 'Collector\u2019s Dinner',               category: 'dinner',        venueIdx: 3, date: '2026-06-06T19:00:00.000Z' },
  { title: 'Evening Performance',                    category: 'performance',   venueIdx: 1, date: '2026-06-20T19:00:00.000Z' },
  { title: 'Studio Visits: Logan Square',            category: 'open-studios',  venueIdx: 4, date: '2026-07-12T10:00:00.000Z' },
]

async function main() {
  const auth = await api('POST', '/api/users/login', {
    email: 'test@bruinooge.net',
    password: 'vvwDEsWqLeim9onPDi7XCnXz',
  })
  const token: string = auth.token
  console.log(`Login: ${token ? 'OK' : 'FAILED'}`)
  if (!token) process.exit(1)

  // Upsert venues
  const venueIds: number[] = []
  for (const v of venues) {
    const existing = await api('GET', `/api/venues?where[name][equals]=${encodeURIComponent(v.name)}&limit=1`, undefined, token)
    if (existing?.docs?.[0]) {
      venueIds.push(existing.docs[0].id)
      console.log(`Venue exists: ${v.name} (${existing.docs[0].id})`)
    } else {
      const created = await api('POST', '/api/venues', v, token)
      venueIds.push(created.doc?.id)
      console.log(`Created venue: ${v.name} (${created.doc?.id})`)
    }
  }

  // Delete existing seeded events (by title match)
  for (const e of events) {
    const existing = await api('GET', `/api/events?where[title][equals]=${encodeURIComponent(e.title)}&limit=1`, undefined, token)
    if (existing?.docs?.[0]) {
      await api('DELETE', `/api/events/${existing.docs[0].id}`, undefined, token)
      console.log(`Deleted existing event: ${e.title}`)
    }
  }

  // Create events
  for (const e of events) {
    const slug = e.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const result = await api('POST', '/api/events', {
      title: e.title,
      slug,
      category: e.category,
      date: e.date,
      venue: venueIds[e.venueIdx],
      _status: 'published',
    }, token)

    if (result.doc?.id) {
      console.log(`Created event: ${e.title} (${result.doc.id})`)
    } else {
      console.error(`Error creating ${e.title}:`, JSON.stringify(result.errors ?? result, null, 2))
    }
  }

  console.log('Done.')
}

main().catch(e => { console.error(e); process.exit(1) })
