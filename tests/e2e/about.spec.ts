import { test, expect } from '@playwright/test'

// ── About page structure ─────────────────────────────────────────────────────

test.describe('About page', () => {
  test('loads and has correct title', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/Gertie/)
    await expect(page.locator('h1.page-hero-title')).toHaveText('About')
  })

  test('renders all four section labels', async ({ page }) => {
    await page.goto('/about')
    const labels = page.locator('.page-section-label')
    await expect(labels.filter({ hasText: 'About Gertie' })).toBeVisible()
    await expect(labels.filter({ hasText: 'Our Team' })).toBeVisible()
    await expect(labels.filter({ hasText: 'How We Operate' })).toBeVisible()
    await expect(labels.filter({ hasText: 'What Makes Us Different' })).toBeVisible()
  })

  test('renders all four team members', async ({ page }) => {
    await page.goto('/about')
    const accordion = page.locator('.team-accordion')
    await expect(accordion).toContainText('Abby Pucker')
    await expect(accordion).toContainText('Chanelle Lacy')
    await expect(accordion).toContainText('Gareth Kaye')
    await expect(accordion).toContainText('Hannah Foster')
  })

  test('first accordion item starts open', async ({ page }) => {
    await page.goto('/about')
    const firstItem = page.locator('.team-accordion-item').first()
    await expect(firstItem).toHaveAttribute('open')
  })

  test('clicking a closed accordion item opens it', async ({ page }) => {
    await page.goto('/about')
    const secondItem = page.locator('.team-accordion-item').nth(1)
    await expect(secondItem).not.toHaveAttribute('open')
    await secondItem.locator('summary').click()
    await expect(secondItem).toHaveAttribute('open')
  })

  test('nav is present and shows nav links', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('link', { name: 'Exhibitions', exact: true }).first()).toBeVisible()
  })

  test('footer is present', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('link', { name: 'Instagram' })).toBeVisible()
  })

  test('Klaviyo embed div is present in footer', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('.klaviyo-form-Tq34Wp')).toBeAttached()
  })
})

// ── About page text integrity ────────────────────────────────────────────────
// Guard against accidental overwrites or hallucination of human-written content.
// Do not "fix" failures by updating these strings — investigate why they changed.

test.describe('About page text integrity', () => {
  test('About Gertie body contains canonical description', async ({ page }) => {
    await page.goto('/about')
    const body = page.locator('.page-section-body').first()
    await expect(body).toContainText('platform for contemporary art and performance in Chicago')
    await expect(body).toContainText('close the distance between ambitious art and curious people')
    await expect(body).toContainText('connect Chicago to the world and the world to Chicago')
  })

  test('Abby Pucker bio contains canonical text', async ({ page }) => {
    await page.goto('/about')
    // Open Abby's accordion item (first, starts open)
    const firstItem = page.locator('.team-accordion-item').first()
    await expect(firstItem).toContainText('cultural producer')
    await expect(firstItem).toContainText('founder of Gertie')
  })

  test('How We Operate body contains canonical text', async ({ page }) => {
    await page.goto('/about')
    const sections = page.locator('.page-section-body')
    const howWeOperate = sections.nth(2)
    await expect(howWeOperate).toContainText('model of reciprocity')
    await expect(howWeOperate).toContainText('Chicago Exhibition Week')
  })

  test('What Makes Us Different body contains canonical text', async ({ page }) => {
    await page.goto('/about')
    const sections = page.locator('.page-section-body')
    const diff = sections.nth(3)
    await expect(diff).toContainText('Gertie Presents')
    await expect(diff).toContainText('Gertie Exchange')
  })
})
