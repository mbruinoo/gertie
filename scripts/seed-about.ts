/**
 * scripts/seed-about.ts
 *
 * Seeds the About page content via the Payload REST API.
 * Run with: pnpm tsx scripts/seed-about.ts
 *
 * Uses agent@bruinooge.net (editor role). The page ID is hard-coded
 * because the REST API won't return draft-enabled docs in a simple GET.
 * Update PAGE_ID if the DB record ever changes.
 */

const BASE = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
const PAGE_ID = 2 // slug: "about"

async function api(method: string, path: string, data?: unknown, token?: string) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  return res.json()
}

function lexical(...paragraphs: string[]) {
  return {
    root: {
      type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
        textFormat: 0, textStyle: '',
        children: [{ type: 'text', format: 0, style: '', mode: 'normal', detail: 0, text, version: 1 }],
      })),
    },
  }
}

// Short richText label (same structure as lexical, just a single paragraph)
const label = (text: string) => lexical(text)

const layout = [
  {
    blockType: 'richText',
    sectionLabel: label('About Gertie'),
    constrainWidth: true,
    body: lexical(
      'Gertie is a platform for contemporary art and performance in Chicago—built on the conviction that complex, uncompromising practices can be deeply felt by a general audience. Through our exhibition program and membership community, we work to close the distance between ambitious art and curious people: equipping audiences to understand how the art world actually works, why it matters, and how to move through it with confidence. We partner with artists, curators, galleries, and institutions to connect Chicago to the world and the world to Chicago.',
    ),
  },
  {
    blockType: 'teamSection',
    sectionLabel: label('Our Team'),
    constrainWidth: true,
    members: [
      {
        name: label('Abby Pucker'),
        description: lexical(
          "Abby is a cultural producer who builds initiatives sitting at the nexus of the creative economy and civic engagement, and the founder of Gertie! What is Gertie? Great question! Gertie is a civic and cultural agency that convenes and educates Chicago's culturally curious through in-person gatherings and digital storytelling to develop, amplify, and expand the reach of the city's creative ecosystem. Gertie exemplifies Abby's interest in leveraging the collective power and resources of this next generation of wealth and creative talent to find more sustainable solutions to building a just and equitable creative economy.",
        ),
      },
      { name: label('Chanelle Lacy'), description: null },
      { name: label('Gareth Kaye'),   description: null },
      { name: label('Hannah Foster'), description: null },
    ],
  },
  {
    blockType: 'richText',
    sectionLabel: label('How We Operate'),
    constrainWidth: true,
    body: lexical(
      "Gertie is a for profit organization that operates on a model of reciprocity. We believe that access, both intellectual and physical, to culture shouldn't be determined by wealth or pre-existing connections, so we keep our flagship programs including Chicago Exhibition Week (CXW) and our open hours free to the public. We also believe that sustainable cultural institutions require a more democratic funding model that doesn't concentrate control in the hands of a few major donors. That's where membership comes in. When you become a Gertie member, you're not just getting access to events and experiences. You are also enabling free public programming, supporting working artists, and helping make Chicago a more commercially viable place to be an artist. Crucially, you are directly building relationships with others who are actively supporting artists, other institutions and each others' journeys through navigating the art world.",
    ),
  },
  {
    blockType: 'richText',
    sectionLabel: label('What Makes Us Different'),
    constrainWidth: true,
    body: lexical(
      'Most institutions are either commercial or curatorial. We refuse that binary. Through our two programming arms—Gertie Presents and Gertie Exchange—we\u2019re building a new model where intellectual rigor and commercial activity reinforce each other rather than compete.',
      "Gertie Presents is our in-house exhibition program: ambitious, non-selling shows that give mid-career artists the resources and platform to produce work they couldn't make anywhere else. These are the shows we make because we believe in them—full stop.",
      "Gertie Exchange is our collaborative programming arm: carefully curated partnerships with galleries, institutions, and artists from outside Chicago who want a meaningful presence in our city. Not just a pop-up. A real exchange—of ideas, audiences, and networks. These partnerships are built on shared investment, shared credit, and a genuine commitment to growing the city's cultural ecosystem.",
    ),
  },
]

async function main() {
  // Login
  const auth = await api('POST', '/api/users/login', {
    email: process.env.PAYLOAD_SEED_EMAIL ?? 'agent@bruinooge.net',
    password: process.env.PAYLOAD_SEED_PASSWORD ?? 'Ln11DoX0pFEFK316wQGGuZzt',
  })
  const token: string = auth.token
  console.log(`Login: ${token ? 'OK' : 'FAILED'} — ${auth.user?.email ?? JSON.stringify(auth.errors)}`)
  if (!token) process.exit(1)

  const result = await api('PATCH', `/api/pages/${PAGE_ID}`, {
    title: 'About',
    slug: 'about',
    _status: 'published',
    layout,
  }, token)

  const doc = result.doc
  if (doc?.id) {
    console.log(`Page saved: id=${doc.id} slug=${doc.slug} status=${doc._status}`)
  } else {
    console.error('Error:', JSON.stringify(result.errors ?? result, null, 2))
    process.exit(1)
  }
}

main()
