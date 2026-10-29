const { test, expect } = require('@playwright/test');
const { CATALOG_PAGES } = require('./helpers');

test.describe('Service catalog pages', () => {
  for (const catalog of CATALOG_PAGES) {
    test(`${catalog.path} shows its hero heading`, async ({ page }) => {
      await page.goto(catalog.path);
      await expect(page.getByRole('heading', { name: catalog.heading })).toBeVisible();
    });
  }
});
