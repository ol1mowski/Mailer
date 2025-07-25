import { test, expect } from '@playwright/test';

test.describe('Authentication - Login and Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login page with correct elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Mailer/);
    
    await expect(page.getByRole('heading', { name: 'Mailer Dashboard' })).toBeVisible();
    await expect(page.getByText('Zaloguj się do systemu zarządzania mailami')).toBeVisible();
    
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Hasło')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
    
    await expect(page.getByText('Dane testowe:')).toBeVisible();
    await expect(page.getByText('Email: admin@mailer.com')).toBeVisible();
    await expect(page.getByText('Hasło: password123')).toBeVisible();
  });

  test('should display error for invalid email format', async ({ page }) => {
    await page.getByLabel('Email').fill('nieprawidlowy');
    await page.getByLabel('Hasło').fill('password123');
    
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    
    await expect(page.getByText('Nieprawidłowy format email')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should display error for empty email', async ({ page }) => {
    await page.getByLabel('Hasło').fill('password123');
    
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    
    await expect(page.getByText('Email jest wymagany')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should display error for empty password', async ({ page }) => {
    await page.getByLabel('Email').fill('admin@mailer.com');
    
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    
    await expect(page.getByText('Hasło jest wymagane')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should display error for password too short', async ({ page }) => {
    await page.getByLabel('Email').fill('admin@mailer.com');
    await page.getByLabel('Hasło').fill('123');

    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    
    await expect(page.getByText('Hasło musi mieć minimum 6 znaków')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should show/hide password when clicking eye button', async ({ page }) => {
    await page.getByLabel('Hasło').fill('password123');
    
    await expect(page.getByLabel('Hasło')).toHaveAttribute('type', 'password');
    
    await page.locator('button[type="button"]').filter({ hasText: '' }).first().click();
    
    await expect(page.getByLabel('Hasło')).toHaveAttribute('type', 'text');
    
    await page.locator('button[type="button"]').filter({ hasText: '' }).first().click();
    
    await expect(page.getByLabel('Hasło')).toHaveAttribute('type', 'password');
  });

  test('should clear errors when starting to type', async ({ page }) => {
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    
    await expect(page.getByText('Email jest wymagany')).toBeVisible();
    await expect(page.getByText('Hasło jest wymagane')).toBeVisible();
    
    await page.getByLabel('Email').fill('a');
    
    await expect(page.getByText('Email jest wymagany')).not.toBeVisible();
    
    await page.getByLabel('Hasło').fill('a');
    
    await expect(page.getByText('Hasło jest wymagane')).not.toBeVisible();
  });


}); 