import { test, expect } from '@playwright/test'

// ── Text integrity ──────────────────────────────────────────────────────────
// These tests guard against human-written content being accidentally overwritten
// or hallucinated during development. Do not "fix" failing assertions by changing
// the expected strings — investigate why the page content changed instead.

test.describe('Homepage text integrity', () => {
  test('masthead heading is exactly "Gertie"', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1.masthead-heading')).toHaveText('Gertie')
  })

  test('masthead tagline contains canonical platform description', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h2.masthead-tagline')).toContainText(
      'platform for the creation and experience of contemporary art'
    )
  })

  test('about section paragraph text is present and unmodified', async ({ page }) => {
    await page.goto('/')
    const about = page.locator('section.about-section h3')
    await expect(about).toContainText(
      'Gertie is a platform for contemporary art and performance in Chicago'
    )
    await expect(about).toContainText(
      'close the distance between ambitious art and curious people'
    )
    await expect(about).toContainText(
      'connect Chicago to the world and the world to Chicago'
    )
  })

  test('"Learn more about Gertie" link points to /about', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('a.arrow-link')
    await expect(link).toContainText('Learn more about Gertie')
    await expect(link).toHaveAttribute('href', '/about')
  })
})

// ── Media import tracking ───────────────────────────────────────────────────
// Verifies that every file logged in CONTENT-IMPORTING.md actually exists in
// Payload's media store. Add a row here whenever a new import is logged.
// This also acts as a redirect safety net: if a file URL changes, this test
// breaks and forces you to add a redirect before merging.

const importedMedia = [
  { filename: 'over-my-head-2025-installation.jpg', context: 'Masthead photo A' },
  { filename: 'elvis-lives-2025.jpg',               context: 'Masthead photo B' },
  { filename: 'gertie-dinner.jpg',                  context: 'Masthead photo C' },
]

test.describe('Media import tracking', () => {
  for (const { filename, context } of importedMedia) {
    test(`${context} (${filename}) is accessible`, async ({ request }) => {
      const res = await request.get(`/api/media/file/${filename}`)
      expect(res.status(), `Missing or moved: ${filename}`).toBe(200)
    })
  }
})
