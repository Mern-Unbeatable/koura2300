const { test, expect } = require('@playwright/test');

test.describe('Landing smoke', () => {
  test('home page loads and shows core sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Logoipsum/i);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Top-rated services' })).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Professional solutions for every corner of your home',
      }),
    ).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('opens landing chat from the navbar Chat button', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Chat' }).first().click();

    await expect(
      page.getByRole('region', { name: 'Handyman assistant chat' }),
    ).toBeVisible();
  });
});
