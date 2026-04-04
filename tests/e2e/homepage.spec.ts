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
