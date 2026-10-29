const { test, expect } = require('@playwright/test');

test.describe('Site navigation', () => {
  test('footer company links open About and Services', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();

    await page.goto('/');
    await page.getByRole('contentinfo').getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services/);
    await expect(page.getByRole('heading', { name: 'Top-rated services' })).toBeVisible();
  });

  test('category dropdown opens Lighting catalog', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('combobox', { name: 'Service category' }).first().selectOption('/lighting');

    await expect(page).toHaveURL(/\/lighting/);
    await expect(
      page.getByRole('heading', { name: 'Professional Lighting Services' }),
    ).toBeVisible();
  });

  test('header Login opens login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('banner').getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: 'Welcome back.' })).toBeVisible();
  });

  test('View all top-rated services opens /services', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('region', { name: 'Top-rated services' })
      .getByRole('link', { name: 'View all' })
      .click();
    await expect(page).toHaveURL(/\/services/);
  });
});
