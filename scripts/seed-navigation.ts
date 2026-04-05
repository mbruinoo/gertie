// Seeds the Navigation global with the standard nav and CTA links.
// Run with: npx tsx scripts/seed-navigation.ts

const BASE = 'http://localhost:3000'

async function main() {
  const email = process.env.PAYLOAD_EMAIL
  const password = process.env.PAYLOAD_PASSWORD

  if (!email || !password) {
    console.error('Set PAYLOAD_EMAIL and PAYLOAD_PASSWORD env vars')
    process.exit(1)
  }

  // Log in
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const { token } = await loginRes.json()
  if (!token) {
    console.error('Login failed')
    process.exit(1)
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  }

  const body = {
    navLinks: [
      { label: 'About',       url: '/about',       comingSoon: false },
      { label: 'Exhibitions', url: '/exhibitions',  comingSoon: false },
      { label: 'Membership',  url: '/membership',   comingSoon: false },
      { label: 'Hub',         url: '/hub',           comingSoon: false },
      { label: 'CXW 2026',   url: '/cxw-2026',     comingSoon: true  },
    ],
    ctaLinks: [
      { label: 'Become a member', url: '/membership' },
      { label: 'Sign in',         url: 'https://join.gertie.co/' },
    ],
  }

  const res = await fetch(`${BASE}/api/globals/navigation`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Failed:', res.status, text)
    process.exit(1)
  }

  console.log('Navigation global seeded.')
}

main()
