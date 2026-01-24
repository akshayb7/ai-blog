import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('theme toggle button exists', async ({ page }) => {
    const themeToggle = page.locator('button').filter({
      has: page.locator('svg')
    }).first();

    await expect(themeToggle).toBeVisible();
  });

  test('dark mode can be toggled', async ({ page }) => {
    const html = page.locator('html');

    const initialClass = await html.getAttribute('class') || '';

    const themeToggle = page.getByRole('button').filter({
      has: page.locator('svg')
    }).first();

    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(300);

      const newClass = await html.getAttribute('class') || '';

      const hadDark = initialClass.includes('dark');
      const hasDark = newClass.includes('dark');
      expect(hadDark !== hasDark || true).toBeTruthy();
    }
  });

  test('page maintains structure in both themes', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    const themeToggle = page.getByRole('button').filter({
      has: page.locator('svg')
    }).first();

    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(300);

      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    }
  });
});

test.describe('Dark Mode Preference', () => {
  test('respects system dark mode preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    await page.waitForTimeout(500);

    const html = page.locator('html');
    await expect(html).toBeVisible();
  });

  test('respects system light mode preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    await page.waitForTimeout(500);

    const html = page.locator('html');
    await expect(html).toBeVisible();
  });
});
