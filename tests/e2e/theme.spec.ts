import { test, expect } from '@playwright/test';
import { openMobileMenu, commonBeforeEach } from './utils';

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
});

test('Sélecteur de thème desktop', async ({ page, isMobile }) => {
    test.skip(isMobile);

    const html = page.locator('html');
    const themeToggle = page.locator('#desktopMenu').getByTestId('theme-toggle');

    const initialIsDark = await html.evaluate(el => el.classList.contains('dark'));

    await themeToggle.click();
    await page.waitForTimeout(1000);

    const isDarkAfter = await html.evaluate(el => el.classList.contains('dark'));

    expect(isDarkAfter).not.toBe(initialIsDark);

    const expectedTheme = isDarkAfter ? 'dark' : 'light';
    const storageTheme = await page.evaluate(() => localStorage.getItem('theme'));

    expect(storageTheme).toBe(expectedTheme);

    await page.reload();
    const reloadedIsDark = await html.evaluate(el => el.classList.contains('dark'));

    expect(reloadedIsDark).toBe(isDarkAfter);
});



test('Sélecteur de thème mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile);

    await openMobileMenu(page);

    const html = page.locator('html');
    const themeToggle = page.locator('#mobileMenu').getByTestId('theme-toggle');

    const initialIsDark = await html.evaluate(el => el.classList.contains('dark'));

    await themeToggle.click();
    await page.waitForTimeout(1000);

    const isDarkAfter = await html.evaluate(el => el.classList.contains('dark'));
    expect(isDarkAfter).not.toBe(initialIsDark);

    const expectedTheme = isDarkAfter ? 'dark' : 'light';
    const storageTheme = await page.evaluate(() => localStorage.getItem('theme'));

    expect(storageTheme).toBe(expectedTheme);

    await page.reload();
    const reloadedIsDark = await html.evaluate(el => el.classList.contains('dark'));

    expect(reloadedIsDark).toBe(isDarkAfter);
});
