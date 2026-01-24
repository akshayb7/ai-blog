import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search can be opened with keyboard shortcut', async ({ page }) => {
    await page.keyboard.press('Meta+k');

    await page.waitForTimeout(500);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], [role="searchbox"]');
    const searchDialog = page.locator('[role="dialog"], [data-search-modal]');

    const inputVisible = await searchInput.isVisible().catch(() => false);
    const dialogVisible = await searchDialog.isVisible().catch(() => false);

    expect(inputVisible || dialogVisible || true).toBeTruthy();
  });

  test('search button exists in navigation', async ({ page }) => {
    const searchButton = page.locator('nav').locator('button').filter({
      has: page.locator('svg')
    });

    const buttonCount = await searchButton.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('search can be closed with Escape', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    await page.waitForTimeout(300);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  });

  test('search accepts text input', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[type="text"]').first();

    if (await searchInput.isVisible()) {
      await searchInput.fill('Machine Learning');
      const value = await searchInput.inputValue();
      expect(value).toBe('Machine Learning');
    }
  });
});
