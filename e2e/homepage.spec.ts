import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Akshay's Expedition Logs/);
  });

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("Akshay's Expedition Logs");
  });

  test('navigation is present', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('category badges are visible', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByText('Deep Learning').first()).toBeVisible();
    await expect(main.getByText('GenAI').first()).toBeVisible();
  });

  test('post cards are rendered', async ({ page }) => {
    const postCards = page.locator('article, [data-testid="post-card"]').or(
      page.locator('a[href^="/posts/"]')
    );
    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('footer is present', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('clicking category navigates to category page', async ({ page }) => {
    const deepLearningLink = page.getByRole('link', { name: /Deep Learning/i }).first();
    await deepLearningLink.click();
    await expect(page).toHaveURL(/\/category\/deep-learning/);
  });
});
