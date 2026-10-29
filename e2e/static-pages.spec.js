const { test, expect } = require('@playwright/test');

test.describe('Static pages', () => {
  test('About Us page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  });

  test('Contact page loads with form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('Services page loads top-rated list', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { name: 'Top-rated services' })).toBeVisible();
  });

  test('Login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome back.' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i }).first()).toBeVisible();
  });

  test('Orders page loads for guests', async ({ page }) => {
    await page.goto('/orders');
    await expect(page.getByRole('heading', { name: 'My Orders' })).toBeVisible();
  });

  test('protected account route redirects guests to login', async ({ page }) => {
    await page.goto('/account');
    await expect(page).toHaveURL(/\/login/);
  });
});
