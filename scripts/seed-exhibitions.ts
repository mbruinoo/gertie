/**
 * Seed Over My Head exhibition via REST API
 * Run: pnpm tsx scripts/seed-exhibitions.ts
 */

const BASE = 'http://localhost:3000'
const EMAIL = 'agent@bruinooge.net'
const PASSWORD = 'Ln11DoX0pFEFK316wQGGuZzt'

// ── Helpers ──────────────────────────────────────────────────────────────────

function para(...children: object[]): object {
  return { type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0, children }
}

function text(t: string, format = 0): object {
  return { type: 'text', version: 1, text: t, format, style: '', mode: 'normal', detail: 0 }
}

const bold = (t: string) => text(t, 1)
const italic = (t: string) => text(t, 2)
const br = () => ({ type: 'linebreak', version: 1 })

function richText(...children: object[]): object {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children,
    },
  }
}

// ── Content ──────────────────────────────────────────────────────────────────

const galleryHours = richText(
  para(bold('Opening weekend')),
  para(
    text('September 19, 12\u20138pm'),
    br(),
    text('September 20, 10am\u20136pm'),
    br(),
    text('September 21, 10am\u20136pm'),
  ),
  para(bold('Regular hours'), text(' (September 22\u2013October 11)')),
  para(
    text('Mon\u2013Thu, 2\u20137pm'),
    br(),
    text('Fri\u2013Sun, 12\u20138pm'),
  ),
)

const description = richText(
  para(
    text('Organized on the occasion of Chicago Exhibition Weekend, '),
    italic('Over My Head'),
    text(
      ' presents a fragment of Chicago\u2019s oft-forgotten position as a nerve center for post-conceptual art. The works on view (or a version of them) were at some point exhibited, sold, or produced in Chicago between 1984 and 2015. Their inclusion here both recalls particular exhibitions and, more tangentially, the complex entanglements between artists, dealers, curators, critics, and collectors that come to shape how we know a place (and an artist\u2019s work) in hindsight. Among the cohort of galleries and institutions whose programs laid the foundation for this recollection of Chicago are Donald Young, Rhona Hoffman, Feature, Robbin Lockett, Rowley Kennerk, Shane Campbell, Monique Meloche, Corbett vs. Dempsey, GRAY, the Art Institute of Chicago, the MCA Chicago, and the Renaissance Society.',
    ),
  ),
  para(
    text(
      'This exhibition may be approached in two distinct, if not reciprocal, ways: as an assembly of discrete artworks relating to a distinct moment in an artist\u2019s history with Chicago and as a chorus asynchronously inciting a contemporary conversation around time, place, and memory, which might remind us that forgetting can sometimes be an invitation to return.',
    ),
  ),
)

// ── Main ─────────────────────────────────────────────────────────────────────

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

  // 2. Create exhibition
  const body = {
    title: 'Over My Head: Encounters with Conceptual Art in a Flyover City, 1984\u20132015',
    slug: 'over-my-head',
    status: 'past',
    dateStart: '2025-09-19T00:00:00.000Z',
    dateEnd: '2025-10-11T00:00:00.000Z',
    venue: '400 N. Peoria',
    curators: ['Gareth Kaye', 'Iris Colburn'],
    presenting: 'Presented by Gertie',
    galleryHours,
    description,
    artists: [
      { name: 'Dara Birnbaum' },
      { name: 'Gaylen Gerber' },
      { name: 'Wendy Jacob' },
      { name: 'Rashid Johnson' },
      { name: 'Tony Lewis' },
      { name: 'Martin Puryear' },
      { name: 'Kay Rosen' },
      { name: 'Rosemarie Trockel' },
      { name: 'Jordan Wolfson' },
      { name: 'Molly Zuckerman-Hartung' },
    ],
    documents: [
      { label: 'View exhibition labels', url: '#' },
      { label: 'View exhibition checklist', url: '#' },
      { label: 'View archival checklist', url: '#' },
    ],
    _status: 'published',
  }

  const createRes = await fetch(`${BASE}/api/exhibitions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  })
  const createData = (await createRes.json()) as any
  if (!createRes.ok) throw new Error(`Create failed: ${JSON.stringify(createData)}`)

  console.log(`Created: "${createData.doc?.title}" (id: ${createData.doc?.id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
