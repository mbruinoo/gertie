import { test, expect } from '@playwright/test'

test('admin login page loads', async ({ page }) => {
  await page.goto('/admin')
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
})

test('admin rejects wrong credentials', async ({ page }) => {
  await page.goto('/admin')
  await page.getByLabel('Email').fill('wrong@example.com')
  await page.getByLabel('Password').fill('wrongpassword')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page.getByText(/incorrect|invalid|wrong/i)).toBeVisible()
})

test('editor can log in', async ({ page }) => {
  await page.goto('/admin')
  await page.getByLabel('Email').fill(process.env.PLAYWRIGHT_TEST_EMAIL!)
  await page.getByLabel('Password').fill(process.env.PLAYWRIGHT_TEST_PASSWORD!)
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/admin(?!\/login)/)
})

test('dev admin can log in', async ({ page }) => {
  await page.goto('/admin')
  await page.getByLabel('Email').fill(process.env.PLAYWRIGHT_DEV_ADMIN_EMAIL!)
  await page.getByLabel('Password').fill(process.env.PLAYWRIGHT_DEV_ADMIN_PASSWORD!)
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/\/admin(?!\/login)/)
})
