// pnpm tsx scripts/seed-installation-images.ts
import { readFileSync } from 'fs'
import path from 'path'

const BASE = 'http://localhost:3000'

const images = [
  { file: '/tmp/img1.jpg', alt: 'Over My Head installation view — 019', caption: '' },
  { file: '/tmp/img2.jpg', alt: 'Over My Head installation view — 012', caption: '' },
  { file: '/tmp/img3.jpg', alt: 'Over My Head installation view — 024', caption: '' },
]

async function main() {
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@bruinooge.net', password: 'vvwDEsWqLeim9onPDi7XCnXz' }),
  })
  const { token } = await loginRes.json() as any
  if (!token) throw new Error('Login failed')

  // Upload each image
  const mediaIds: number[] = []
  for (const img of images) {
    const fileBuffer = readFileSync(img.file)
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' })
    const filename = path.basename(img.file)

    const form = new FormData()
    form.append('file', blob, filename)
    form.append('_payload', JSON.stringify({ alt: img.alt }))

    const res = await fetch(`${BASE}/api/media`, {
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: form,
    })
    const data = await res.json() as any
    if (!data.doc?.id) throw new Error(`Upload failed: ${JSON.stringify(data)}`)
    console.log(`Uploaded ${filename} → media ID ${data.doc.id}`)
    mediaIds.push(data.doc.id)
  }

  // Find exhibition
  const listRes = await fetch(`${BASE}/api/exhibitions?limit=10`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const { docs } = await listRes.json() as any
  const exhibition = docs.find((e: any) => e.slug === 'over-my-head')
  if (!exhibition) throw new Error('Exhibition not found')

  // Patch installationImages
  const installationImages = mediaIds.map((id, i) => ({
    image: id,
    caption: images[i].caption,
  }))

  const patchRes = await fetch(`${BASE}/api/exhibitions/${exhibition.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ installationImages }),
  })
  const result = await patchRes.json() as any
  if (!result.doc) throw new Error(JSON.stringify(result))
  console.log(`Linked ${result.doc.installationImages?.length} installation images to "${result.doc.title}"`)
}

main().catch(e => { console.error(e); process.exit(1) })
