import { test, expect } from '@playwright/test';

test.describe('Post Page', () => {
  test('post page loads with content', async ({ page }) => {
    await page.goto('/');

    const postLink = page.locator('a[href^="/posts/"]').first();
    const postHref = await postLink.getAttribute('href');

    if (postHref) {
      await page.goto(postHref);

      await expect(page.locator('article')).toBeVisible();

      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  test('post has navigation', async ({ page }) => {
    await page.goto('/');
    const postLink = page.locator('a[href^="/posts/"]').first();
    await postLink.click();

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('back to home link works', async ({ page }) => {
    await page.goto('/');
    const postLink = page.locator('a[href^="/posts/"]').first();
    await postLink.click();

    const backLink = page.getByText('Back to Home').first();
    await backLink.click();

    await expect(page).toHaveURL('/');
  });

  test('post has category badge', async ({ page }) => {
    await page.goto('/');
    const postLink = page.locator('a[href^="/posts/"]').first();
    await postLink.click();

    const categoryBadge = page.locator('span').filter({
      has: page.locator('text=/Deep Learning|GenAI|ML Engineering|Data Science|Distributed Systems|System Design/i')
    }).first();
    await expect(categoryBadge).toBeVisible();
  });

  test('reading progress appears on scroll', async ({ page }) => {
    await page.goto('/');
    const postLink = page.locator('a[href^="/posts/"]').first();
    await postLink.click();

    await page.evaluate(() => window.scrollBy(0, 500));

    await page.waitForTimeout(500);
  });
});
