import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Gertie/)
})

test('homepage renders Gertie wordmark', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Gertie', level: 1 })).toBeVisible()
})

test('homepage renders nav links', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'About', exact: true }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Exhibitions', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Membership', exact: true })).toBeVisible()
})

test('homepage renders Upcoming ticker', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Upcoming', { exact: true })).toBeVisible()
})

test('homepage renders About section', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('About Gertie', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /Learn more about Gertie/ })).toBeVisible()
})

test('homepage renders footer', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Instagram' })).toBeVisible()
})

test('homepage footer has Klaviyo embed div', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.klaviyo-form-Tq34Wp')).toBeAttached()
})

test('nav links come from CMS (Navigation global)', async ({ page }) => {
  await page.goto('/')
  // These links are now CMS-driven — if they disappear the global was cleared
  await expect(page.getByRole('link', { name: 'About', exact: true }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Exhibitions', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Membership', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Hub', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Become a member', exact: true })).toBeVisible()
})
