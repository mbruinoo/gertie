/**
 * scripts/seed-membership-page.ts
 *
 * Seeds the Membership page content via the Payload REST API.
 * Run with: pnpm tsx scripts/seed-membership-page.ts
 */

const BASE = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

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

// Lexical richText helpers
const t = (text: string, format = 0) => ({
  type: 'text', text, format, style: '', mode: 'normal', detail: 0, version: 1,
})
const bold = (text: string) => t(text, 1)
const para = (...children: any[]) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
  textFormat: 0, textStyle: '',
  children,
})
const richText = (...paragraphs: any[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: paragraphs },
})

const curiousPerks = [
  'Invitations to member-only previews, talks, and receptions',
  'Early access and discounted tickets to Gertie hub programming and performances',
  'Member pricing on select ticketed events',
  'Priority registration for workshops and limited-capacity programs',
  'Access to the Gertie newsletter with editorial content, research dispatches, and program announcements before the public',
  '50% off select ticketed hub programming',
  'A direct line to everything we\u2019re making\u2014and why',
]

const curatedPerks = [
  'Everything in Curious tier of membership',
  'First access to upcoming trip announcements\u2014with priority booking before public release to Gertie\u2019s curated travel experiences and research trips',
  'Access to quarterly Curated programming, such as private collection visits, studio visits, and off-program experiences unavailable to the general public',
  'Complimentary tickets to all Gertie hub programming and performances',
  'Invitations to intimate dinners, conversations, and gatherings with artists, curators, and collectors',
  'A dedicated member experience at Chicago Exhibition Weekend (CXW) with curated itinerary support',
  'First access to upcoming trip announcements\u2014with priority booking before public release',
  'Ability to vote on Gertie commissions and editions',
]

const layout = [
  {
    blockType: 'membershipOptions',
    cards: [
      {
        cardType: 'Community Membership',
        tagline: 'For those who want to stay connected, go deeper, and support Gertie\u2019s public mission.',
        tierName: 'Curious',
        price: '$600/year or $55/month',
        ctaLabel: 'Join Gertie Curious',
        ctaUrl: 'https://join.gertie.co/',
        ctaStyle: 'filled',
        perks: curiousPerks.map((text) => ({ text })),
      },
      {
        cardType: 'Immersive Membership',
        tagline: 'For those who want to travel, explore, and experience art and culture with genuine intention.',
        tierName: 'Curated',
        price: 'By invitation',
        ctaLabel: 'Inquire',
        ctaUrl: 'https://join.gertie.co/',
        ctaStyle: 'outline',
        perks: curatedPerks.map((text) => ({ text })),
      },
    ],
  },
  {
    blockType: 'richText',
    sectionLabel: richText(
      para(bold('Curious')),
      para(t('Curious members are the connective tissue of the Gertie community. You are who we make things for.')),
    ),
    body: richText(
      para(t('Curious membership is for people who care about what\u2019s happening in Chicago\u2019s cultural landscape\u2014and want to be part of shaping it. You\u2019ll get early access to programs, behind-the-scenes insight into what we\u2019re building, and the satisfaction of knowing your membership directly funds free public programming for the whole city.')),
    ),
    constrainWidth: true,
  },
  {
    blockType: 'memberEvents',
    subtitle: 'Interested in our member events?',
    ctaLabel: 'Learn more',
    ctaUrl: '#',
  },
  {
    blockType: 'richText',
    sectionLabel: richText(
      para(bold('Curated')),
      para(t('Curated membership is intentionally small. We keep it that way so the experiences stay genuine.')),
    ),
    body: richText(
      para(t('Curated membership is for those who might be ready to graduate from a place of curiosity to a place of action and possibly transaction. This tier is built around engaging with others who are actively seeking out relationships with gallerists and artists to find opportunities to either buy work or get engaged in institutions that support that work. As a Curated member, you\u2019ll have premier access to join Gertie\u2019s research trips and curated travel experiences\u2014small-group journeys to art fairs, biennials, private collections, studios, and destinations chosen for their cultural and intellectual richness. These aren\u2019t tours. They\u2019re the kinds of trips Gertie\u2019s founders take when they\u2019re doing research, opened up to a small group of people who want in.')),
      para(t('We\u2019ve been to Mexico City. We\u2019ve been to Chicago\u2019s most interesting private collections. We\u2019re going to Marfa. Detroit is next. Iceland is on the horizon. Every experience is shaped by genuine curiosity, not a packaged itinerary.')),
    ),
    constrainWidth: true,
  },
  {
    blockType: 'curatedExperiences',
    ctaLabel: 'Learn more',
    ctaUrl: '#',
    upcomingItems: [
      { title: 'Chicago Collection Visit', note: '(Late June)' },
      { title: 'Detroit, Michigan' },
      { title: 'Reykjavik, Iceland' },
      { title: 'Bruce Goff Ford House + Edith Farnsworth House Daytrip' },
    ],
    disclaimer: '*Trips fill quickly. Curated members receive priority access before experiences are listed publicly.',
    experiences: [
      {
        date: 'April 2026',
        title: 'EXPO Chicago',
        body: 'Lorem ipsum dolor sit amet. Subscribing members get access to EarlyWork\u2019s paid monthly newsletter with our picks of the most exciting things to explore in the art world and other creative industries, along with two in-person gatherings per month, exclusive works from emerging artists, early access to available works from partner galleries.',
      },
      {
        date: 'May 2026',
        title: 'Marfa',
        body: 'Lorem ipsum dolor sit amet. Subscribing members get access to EarlyWork\u2019s paid monthly newsletter with our picks of the most exciting things to explore in the art world and other creative industries, along with two in-person gatherings per month, exclusive works from emerging artists, early access to available works from partner galleries.',
      },
    ],
  },
]

async function main() {
  // Login
  const auth = await api('POST', '/api/users/login', {
    email: 'test@bruinooge.net',
    password: 'vvwDEsWqLeim9onPDi7XCnXz',
  })
  const token: string = auth.token
  console.log(`Login: ${token ? 'OK' : 'FAILED'} — ${auth.user?.email ?? JSON.stringify(auth.errors)}`)
  if (!token) process.exit(1)

  // Check if membership page exists
  const existing = await api('GET', '/api/pages?where[slug][equals]=membership&limit=1', undefined, token)
  const existingDoc = existing?.docs?.[0]

  if (existingDoc) {
    console.log(`Found existing membership page (id=${existingDoc.id}), deleting...`)
    const del = await api('DELETE', `/api/pages/${existingDoc.id}`, undefined, token)
    console.log(`Deleted: ${JSON.stringify(del?.message ?? del?.errors ?? 'ok')}`)
  }

  // Create the membership page
  const result = await api('POST', '/api/pages', {
    title: 'Membership',
    slug: 'membership',
    hideHeroRule: true,
    _status: 'published',
    layout,
  }, token)

  const doc = result.doc
  if (doc?.id) {
    console.log(`Page created: id=${doc.id} slug=${doc.slug} status=${doc._status}`)
  } else {
    console.error('Error:', JSON.stringify(result.errors ?? result, null, 2))
    process.exit(1)
  }
}

main()
