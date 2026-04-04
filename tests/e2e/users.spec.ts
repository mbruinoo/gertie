import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

// Helpers to get auth tokens via the Payload REST API
async function getToken(request: any, email: string, password: string): Promise<string> {
  const res = await request.post(`${BASE}/api/users/login`, {
    data: { email, password },
  })
  const body = await res.json()
  return body.token
}

// ─── User lifecycle (must run in order) ───────────────────────────────────────

test.describe.serial('user lifecycle — dev creates, user logs in, dev deletes', () => {
  const testEmail = `playwright-test-${Date.now()}@example.com`
  const testPassword = 'TestPassword123!'
  let createdUserId: string

  test('dev can create a new user via API', async ({ request }) => {
    const token = await getToken(
      request,
      process.env.PLAYWRIGHT_DEV_ADMIN_EMAIL!,
      process.env.PLAYWRIGHT_DEV_ADMIN_PASSWORD!,
    )

    const res = await request.post(`${BASE}/api/users`, {
      headers: { Authorization: `JWT ${token}` },
      data: { email: testEmail, password: testPassword, role: 'editor' },
    })
    expect(res.status()).toBe(201)
    const body = await res.json()
    createdUserId = body.doc.id
    expect(createdUserId).toBeTruthy()
  })

  test('newly created user can log in', async ({ page }) => {
    await page.goto('/admin')
    await page.getByLabel('Email').fill(testEmail)
    await page.getByLabel('Password').fill(testPassword)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL(/\/admin(?!\/login)/)
  })

  test('dev can delete the user via API', async ({ request }) => {
    const token = await getToken(
      request,
      process.env.PLAYWRIGHT_DEV_ADMIN_EMAIL!,
      process.env.PLAYWRIGHT_DEV_ADMIN_PASSWORD!,
    )

    const res = await request.delete(`${BASE}/api/users/${createdUserId}`, {
      headers: { Authorization: `JWT ${token}` },
    })
    expect(res.status()).toBe(200)
  })

  test('deleted user cannot log in', async ({ page }) => {
    await page.goto('/admin')
    await page.getByLabel('Email').fill(testEmail)
    await page.getByLabel('Password').fill(testPassword)
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText(/incorrect|invalid|wrong/i)).toBeVisible()
  })
})

// ─── Access control ───────────────────────────────────────────────────────────

test.describe('access control — user creation', () => {
  test('editor cannot create a user via API', async ({ request }) => {
    const token = await getToken(
      request,
      process.env.PLAYWRIGHT_TEST_EMAIL!,
      process.env.PLAYWRIGHT_TEST_PASSWORD!,
    )

    const res = await request.post(`${BASE}/api/users`, {
      headers: { Authorization: `JWT ${token}` },
      data: { email: 'shouldfail@example.com', password: 'Whatever123!', role: 'editor' },
    })
    expect(res.status()).toBe(403)
  })
})

test.describe('access control — user deletion', () => {
  let tempUserId: string

  test.beforeAll(async ({ request }) => {
    // Create a throwaway user as dev to have something to try to delete
    const token = await getToken(
      request,
      process.env.PLAYWRIGHT_DEV_ADMIN_EMAIL!,
      process.env.PLAYWRIGHT_DEV_ADMIN_PASSWORD!,
    )
    const res = await request.post(`${BASE}/api/users`, {
      headers: { Authorization: `JWT ${token}` },
      data: {
        email: `delete-target-${Date.now()}@example.com`,
        password: 'TestPassword123!',
        role: 'editor',
      },
    })
    const body = await res.json()
    tempUserId = body.doc.id
  })

  test.afterAll(async ({ request }) => {
    // Clean up via dev regardless of test outcome
    const token = await getToken(
      request,
      process.env.PLAYWRIGHT_DEV_ADMIN_EMAIL!,
      process.env.PLAYWRIGHT_DEV_ADMIN_PASSWORD!,
    )
    await request.delete(`${BASE}/api/users/${tempUserId}`, {
      headers: { Authorization: `JWT ${token}` },
    })
  })

  test('editor cannot delete a user via API', async ({ request }) => {
    const token = await getToken(
      request,
      process.env.PLAYWRIGHT_TEST_EMAIL!,
      process.env.PLAYWRIGHT_TEST_PASSWORD!,
    )

    const res = await request.delete(`${BASE}/api/users/${tempUserId}`, {
      headers: { Authorization: `JWT ${token}` },
    })
    expect(res.status()).toBe(403)
  })
})
