import { test, expect } from '@playwright/test';

test.describe('Navigation - Basic tests', () => {
  test('should redirect unauthenticated user from protected pages to login', async ({ page }) => {
    const protectedPages = ['/dashboard', '/contacts', '/mailing-lists', '/email-templates', '/campaigns', '/analytics', '/settings'];
    
    for (const pageUrl of protectedPages) {
      await page.goto(pageUrl);
      await expect(page).toHaveURL('/login');
    }
  });

  test('should redirect from root path to login when not authenticated', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('should redirect from non-existent pages to login', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page).toHaveURL('/login');
  });
}); 