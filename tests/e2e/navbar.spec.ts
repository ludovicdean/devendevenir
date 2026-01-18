import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the base URL
        await page.goto('/');
        await page.screenshot({ path: 'navbar-debug.png' });
    });

    test('Navbar links should be visible on desktop', async ({ page }) => {
        // Only run this test on desktop viewports
        const viewport = page.viewportSize();
        if (viewport && viewport.width >= 768) {
            const navbar = page.locator('#navbar-default');
            await expect(navbar).toBeVisible();

            const talksLink = navbar.locator('text=Talks/Podcasts');
            const aboutLink = navbar.locator('text=À propos');

            await expect(talksLink).toBeVisible();
            await expect(aboutLink).toBeVisible();

            await talksLink.click();
            await expect(page).toHaveURL(/.*talks-podcasts/);
        } else {
            test.skip();
        }
    });

    test('Mobile menu should work on mobile', async ({ page }) => {
        // Only run this test on mobile viewports
        const viewport = page.viewportSize();
        if (viewport && viewport.width < 768) {
            const menuToggle = page.getByTestId('menuToggle');
            const mobileMenu = page.getByTestId('mobileMenu');

            await expect(menuToggle).toBeVisible();
            // mobileMenu should be hidden initially (class 'hidden' or 'opacity-0')
            // Note: Header.astro uses transition-all duration-300 ease-out opacity-0 -translate-y-5 pointer-events-none hidden md:hidden
            await expect(mobileMenu).not.toBeVisible();

            await menuToggle.click();
            // Wait for the active class or visibility
            await expect(mobileMenu).toBeVisible();
            await expect(mobileMenu).toHaveClass(/active/);

            const talksLink = mobileMenu.locator('text=Talks/Podcasts');
            await expect(talksLink).toBeVisible();

            await talksLink.click();
            await expect(page).toHaveURL(/.*talks-podcasts/);
            // Menu should close after clicking a link
            await expect(mobileMenu).not.toBeVisible();
        } else {
            test.skip();
        }
    });

    test('Overlay should close mobile menu', async ({ page }) => {
        const viewport = page.viewportSize();
        if (viewport && viewport.width < 768) {
            const menuToggle = page.getByTestId('menuToggle');
            const mobileMenu = page.getByTestId('mobileMenu');
            const overlay = page.locator('#overlay');

            await menuToggle.click();
            await expect(mobileMenu).toBeVisible();

            // Click the overlay
            await overlay.click({ force: true });
            await expect(mobileMenu).not.toBeVisible();
        } else {
            test.skip();
        }
    });
});
