// pnpm tsx scripts/seed-ornament-images.ts
import { readFileSync } from 'fs'
import path from 'path'

const BASE = 'http://localhost:3000'
const FOLDER = path.join(process.cwd(), 'ornament and ornamentation to add (gitignore this)')

const images = [
  {
    file: path.join(FOLDER, 'B. Ingrid Olson, \u201cHys,\u201d XYZ Collective, Tokyo, 2024. Image courtesy of the artist and XYZ Collective, Tokyo.png'),
    alt: 'B. Ingrid Olson, \u201cHys,\u201d XYZ Collective, Tokyo, 2024. Image courtesy of the artist and XYZ Collective, Tokyo.',
    caption: 'B. Ingrid Olson, \u201cHys,\u201d XYZ Collective, Tokyo, 2024. Image courtesy of the artist and XYZ Collective, Tokyo.',
    mimeType: 'image/png',
    ext: 'png',
  },
  {
    file: path.join(FOLDER, 'Diane Simpson, Vest. Image courtesy of Corbett vs. Dempsey, Chicago.jpg'),
    alt: 'Diane Simpson, Vest. Image courtesy of Corbett vs. Dempsey, Chicago.',
    caption: 'Diane Simpson, Vest. Image courtesy of Corbett vs. Dempsey, Chicago.',
    mimeType: 'image/jpeg',
    ext: 'jpg',
  },
  {
    file: path.join(FOLDER, 'Gaylen Gerber, Backdrop, installation view, Nicole Klagsbrun Gallery, New York, 1994. Image courtesy of the artist. Images courtesy of the artist. Photos by Gaylen Gerber and Adam Reich.jpg'),
    alt: 'Gaylen Gerber, Backdrop, installation view, Nicole Klagsbrun Gallery, New York, 1994. Image courtesy of the artist. Photos by Gaylen Gerber and Adam Reich.',
    caption: 'Gaylen Gerber, Backdrop, installation view, Nicole Klagsbrun Gallery, New York, 1994. Image courtesy of the artist. Photos by Gaylen Gerber and Adam Reich.',
    mimeType: 'image/jpeg',
    ext: 'jpg',
  },
  {
    file: path.join(FOLDER, 'Josef Strau, The Nazis of Suburbia, _18INIQITIES'),
    alt: 'Josef Strau, The Nazis of Suburbia, 18INIQITIES.',
    caption: 'Josef Strau, The Nazis of Suburbia, 18INIQITIES.',
    mimeType: 'image/jpeg',
    ext: 'jpg',
  },
  {
    file: path.join(FOLDER, 'Nora Schultz, \u201cNow and The non-watch,\u201d Galerie Meyer Kainer, Vienna, 2026. Images courtesy of Galerie Meyer Kainer, Vienna. Photo by Simon Veres.jpg'),
    alt: 'Nora Schultz, \u201cNow and The non-watch,\u201d Galerie Meyer Kainer, Vienna, 2026. Images courtesy of Galerie Meyer Kainer, Vienna. Photo by Simon Veres.',
    caption: 'Nora Schultz, \u201cNow and The non-watch,\u201d Galerie Meyer Kainer, Vienna, 2026. Images courtesy of Galerie Meyer Kainer, Vienna. Photo by Simon Veres.',
    mimeType: 'image/jpeg',
    ext: 'jpg',
  },
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
    const blob = new Blob([fileBuffer], { type: img.mimeType })
    const filename = `ornament_${path.basename(img.file).slice(0, 40).replace(/[^a-zA-Z0-9._-]/g, '_')}.${img.ext}`

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
    console.log(`Uploaded → media ID ${data.doc.id}: ${img.alt.slice(0, 60)}`)
    mediaIds.push(data.doc.id)
  }

  // Find the exhibition
  const listRes = await fetch(`${BASE}/api/exhibitions?limit=20`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const { docs } = await listRes.json() as any
  const exhibition = docs.find((e: any) => e.slug === 'ornament-and-information')
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
  console.log(`Linked ${result.doc.installationImages?.length} images to "${result.doc.title}"`)
}

main().catch(e => { console.error(e); process.exit(1) })
