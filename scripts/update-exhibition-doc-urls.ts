/**
 * Update Over My Head exhibition document URLs via REST API
 * Run: pnpm tsx scripts/update-exhibition-doc-urls.ts
 */

const BASE = 'http://localhost:3000'
const EMAIL = 'agent@bruinooge.net'
const PASSWORD = 'Ln11DoX0pFEFK316wQGGuZzt'

async function main() {
  // 1. Login
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const loginData = (await loginRes.json()) as any
  const token = loginData?.token
  if (!token) throw new Error(`Login failed: ${JSON.stringify(loginData)}`)
  console.log('Logged in as', EMAIL)

  // 2. Find the Over My Head exhibition
  const findRes = await fetch(`${BASE}/api/exhibitions?where[slug][equals]=over-my-head&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const findData = (await findRes.json()) as any
  const exhibition = findData?.docs?.[0]
  if (!exhibition) throw new Error('Exhibition not found')
  console.log(`Found exhibition: "${exhibition.title}" (id: ${exhibition.id})`)
  console.log('Current documents:', JSON.stringify(exhibition.documents, null, 2))

  // 3. PATCH with updated document URLs
  const patchRes = await fetch(`${BASE}/api/exhibitions/${exhibition.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      documents: [
        {
          label: 'View exhibition labels',
          url: '/exhibitions/over-my-head/labels',
        },
        {
          label: 'View exhibition checklist',
          url: 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68def53fd5043a3fe9fbf56f_omh_exhibitionchecklist_20251002_print_imposed.pdf',
        },
        {
          label: 'View archival checklist',
          url: 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68cc60477b0c257a09562450_omh_archivechecklist_20250917_print.pdf',
        },
      ],
    }),
  })
  const patchData = (await patchRes.json()) as any
  if (!patchRes.ok) throw new Error(`PATCH failed: ${JSON.stringify(patchData)}`)
  console.log('Updated documents:')
  console.log(JSON.stringify(patchData.doc?.documents, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
