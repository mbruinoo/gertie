// pnpm tsx scripts/patch-installation-images.ts
// Patches the Over My Head exhibition with already-uploaded installation image IDs 13, 14, 15

const BASE = 'http://localhost:3000'
const MEDIA_IDS = [13, 14, 15]

async function main() {
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@bruinooge.net', password: 'vvwDEsWqLeim9onPDi7XCnXz' }),
  })
  const { token } = await loginRes.json() as any
  if (!token) throw new Error('Login failed')

  const listRes = await fetch(`${BASE}/api/exhibitions?limit=10`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const { docs } = await listRes.json() as any
  const exhibition = docs.find((e: any) => e.slug === 'over-my-head')
  if (!exhibition) throw new Error('Exhibition not found')

  const installationImages = MEDIA_IDS.map((id) => ({ image: id, caption: '' }))

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
