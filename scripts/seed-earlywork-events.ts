// pnpm tsx scripts/seed-earlywork-events.ts
// Imports EarlyWork events from CSV export (pre-processed to /tmp/earlywork-events.json)
// 1. Deletes 6 placeholder events seeded earlier
// 2. Downloads cover images and uploads to Payload media
// 3. Creates/deduplicates venues
// 4. Creates events (draft or published)

import { readFileSync } from 'fs'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

// The 6 placeholder events from seed-events.ts (by slug)
const PLACEHOLDER_SLUGS = [
  'member-preview-ornament-information',
  'artist-conversation-b-ingrid-olson',
  'curator-walkthrough-over-my-head',
  'collectors-dinner',
  'evening-performance',
  'studio-visits-logan-square',
]

interface EventData {
  title: string
  slug: string
  category: string
  date: string
  coverImageUrl: string
  venueName: string | null
  address: string | null
  timeRange: string
  draft: boolean
}

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

async function uploadImage(imageUrl: string, title: string, token: string): Promise<number | null> {
  if (!imageUrl) return null

  try {
    // Download the image
    const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!imgRes.ok) {
      console.warn(`  Image download failed (${imgRes.status}): ${imageUrl}`)
      return null
    }

    const contentType = imgRes.headers.get('content-type') ?? 'image/jpeg'
    const buf = await imgRes.arrayBuffer()

    // Derive filename from URL
    const urlPath = new URL(imageUrl).pathname
    const rawName = urlPath.split('/').pop() ?? 'image.jpg'
    // Clean filename: decode URI components, take last segment after underscores pattern
    let filename = decodeURIComponent(rawName)
    // Webflow CDN files often look like "hash_actualname.jpg" — use as-is but sanitize
    filename = filename.replace(/[^\w.\-]/g, '_').slice(0, 80)
    if (!filename.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      filename += '.jpg'
    }

    const form = new FormData()
    form.set('file', new Blob([buf], { type: contentType }), filename)
    form.set('_payload', JSON.stringify({ alt: title }))

    const uploadRes = await fetch(`${BASE}/api/media`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: form as any,
    })
    const uploadJson = await uploadRes.json()

    if (uploadJson.doc?.id) {
      console.log(`  Uploaded image: ${filename} (id=${uploadJson.doc.id})`)
      return uploadJson.doc.id
    } else {
      console.warn(`  Image upload failed:`, JSON.stringify(uploadJson.errors ?? uploadJson).slice(0, 200))
      return null
    }
  } catch (err: any) {
    console.warn(`  Image error: ${err.message}`)
    return null
  }
}

async function upsertVenue(name: string, address: string | null, token: string): Promise<number | null> {
  const existing = await api('GET', `/api/venues?where[name][equals]=${encodeURIComponent(name)}&limit=1`, undefined, token)
  if (existing?.docs?.[0]) {
    return existing.docs[0].id
  }
  const payload: any = { name }
  if (address) payload.address = address
  const created = await api('POST', '/api/venues', payload, token)
  if (created.doc?.id) {
    console.log(`  Created venue: ${name} (id=${created.doc.id})`)
    return created.doc.id
  }
  console.warn(`  Venue creation failed for: ${name}`)
  return null
}

async function main() {
  // Load pre-processed event data
  const events: EventData[] = JSON.parse(readFileSync('/tmp/earlywork-events.json', 'utf-8'))

  // Login
  const auth = await api('POST', '/api/users/login', {
    email: 'test@bruinooge.net',
    password: 'vvwDEsWqLeim9onPDi7XCnXz',
  })
  const token: string = auth.token
  console.log(`Login: ${token ? 'OK' : 'FAILED'}`)
  if (!token) process.exit(1)

  // Delete placeholder events
  console.log('\n--- Deleting placeholder events ---')
  for (const slug of PLACEHOLDER_SLUGS) {
    const found = await api('GET', `/api/events?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, undefined, token)
    if (found?.docs?.[0]) {
      const id = found.docs[0].id
      await api('DELETE', `/api/events/${id}`, undefined, token)
      console.log(`Deleted placeholder: ${slug}`)
    } else {
      console.log(`Placeholder not found (already deleted?): ${slug}`)
    }
  }

  // Import events
  console.log(`\n--- Importing ${events.length} events ---`)
  let created = 0
  let skipped = 0
  let failed = 0

  for (const event of events) {
    console.log(`\n[${created + skipped + failed + 1}/${events.length}] ${event.title}`)

    // Skip if already exists
    const existing = await api('GET', `/api/events?where[slug][equals]=${encodeURIComponent(event.slug)}&limit=1`, undefined, token)
    if (existing?.docs?.[0]) {
      console.log(`  Already exists, skipping`)
      skipped++
      continue
    }

    // Upload cover image
    let coverImageId: number | null = null
    if (event.coverImageUrl) {
      coverImageId = await uploadImage(event.coverImageUrl, event.title, token)
    }

    // Upsert venue
    let venueId: number | null = null
    if (event.venueName) {
      venueId = await upsertVenue(event.venueName, event.address, token)
    }

    // Create event
    const payload: any = {
      title: event.title,
      slug: event.slug,
      category: event.category,
      date: event.date,
      _status: event.draft ? 'draft' : 'published',
    }
    if (coverImageId) payload.coverImage = coverImageId
    if (venueId) payload.venue = venueId
    if (event.timeRange) payload.timeRange = event.timeRange

    const result = await api('POST', '/api/events', payload, token)
    if (result.doc?.id) {
      console.log(`  Created: ${event.slug} (id=${result.doc.id}, status=${event.draft ? 'draft' : 'published'})`)
      created++
    } else {
      console.error(`  FAILED:`, JSON.stringify(result.errors ?? result).slice(0, 300))
      failed++
    }
  }

  console.log(`\n--- Done ---`)
  console.log(`Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`)
}

main().catch(e => { console.error(e); process.exit(1) })
