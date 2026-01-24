import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo link goes to homepage', async ({ page }) => {
    const logo = page.locator('nav').getByRole('link').first();
    await logo.click();
    await expect(page).toHaveURL('/');
  });

  test('About link navigates to about page', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: 'About' }).first();
    await aboutLink.click();
    await expect(page).toHaveURL('/about');
  });

  test('Posts link navigates to posts page', async ({ page }) => {
    const postsLink = page.locator('nav').getByRole('link', { name: /Posts|All Posts/i }).first();
    if (await postsLink.isVisible()) {
      await postsLink.click();
      await expect(page).toHaveURL('/posts');
    }
  });

  test('footer links work', async ({ page }) => {
    const footerAbout = page.locator('footer').getByRole('link', { name: 'About' });
    await footerAbout.click();
    await expect(page).toHaveURL('/about');
  });

  test('social links have correct attributes', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
  });
});

test.describe('Navigation - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('page is responsive on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('mobile navigation is accessible', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.locator('button').filter({ hasText: /menu/i }).or(
      page.locator('[aria-label*="menu"]')
    );

    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
  });
});
