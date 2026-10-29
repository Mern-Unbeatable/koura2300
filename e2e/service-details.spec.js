const { test, expect } = require('@playwright/test');

test.describe('Service details booking', () => {
  test('opens a lighting service and reaches Preferred Contact Method', async ({ page }) => {
    await page.goto('/lighting');

    await page.getByRole('button', { name: 'Indoor Lighting' }).click();
    await expect(
      page.getByRole('heading', { level: 3, name: 'Ceiling Light Installation' }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'View Ceiling Light Installation' }).click();
    await expect(page).toHaveURL(/\/service\//);
    await expect(
      page.getByRole('heading', { name: 'Ceiling Light Installation' }),
    ).toBeVisible();
    await expect(page.getByRole('radio', { name: /Standard Price/ })).toBeVisible();
    await expect(page.getByRole('radio', { name: /Premium Price/ })).toBeVisible();

    await page.getByRole('button', { name: 'Confirmed Material' }).click();
    await expect(page.getByRole('region', { name: 'Choose your location' })).toBeVisible();
    await page.getByRole('button', { name: 'Apply' }).click();

    await expect(
      page.getByRole('region', { name: 'Preferred Contact Method' }),
    ).toBeVisible();
  });

  test('opens service chat from Preferred Contact Method', async ({ page }) => {
    await page.goto('/lighting');
    await page.getByRole('button', { name: 'Indoor Lighting' }).click();
    await page.getByRole('link', { name: 'View Ceiling Light Installation' }).click();

    await page.getByRole('button', { name: 'Confirmed Material' }).click();
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.getByRole('radio', { name: 'Chat' }).click();

    await expect(page.getByRole('region', { name: 'Service pro chat' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Offer Card' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pay Now' })).toHaveCount(0);
  });
});
