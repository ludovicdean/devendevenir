import type { Page, BrowserContext } from '@playwright/test';
import { expect } from '@playwright/test';

export async function commonBeforeEach(page: Page) {
    await page.goto('http://localhost:4321/devendevenir/');
    await expect(page).toHaveTitle(/Dev En Devenir/);
    await expect(page.getByText('Le blog écrit par un développeur pour les développeurs !')).toBeVisible();
}

export async function testInternalLinks(page: Page, selectorPrefix: string) {
    const allLinks = page.locator(`[data-test-id^="${selectorPrefix}"]`);

    const linkData = await allLinks.evaluateAll<{ href: string; index: number }[]>((elements) =>
        elements
            .map((el, index) => ({
                href: el.getAttribute('href') || '',
                index,
            }))
            .filter(({ href }) =>
                href &&
                !href.startsWith('http')
            )
    );

    for (const { href, index } of linkData) {
        await allLinks.nth(index).click({ timeout: 10_000 });

        await page.waitForLoadState('domcontentloaded', { timeout: 15_000 });

        if (href.startsWith('/')) {
            const url = new URL(page.url());
            expect(url.pathname).toBe(href);
        } else {
            expect(page.url()).toContain(href);
        }

        // Retour robuste
        const backResponse = await page.goBack({ waitUntil: 'domcontentloaded', timeout: 15_000 });
        if (!backResponse) {
            await page.goto('/', { waitUntil: 'domcontentloaded' });
        }
    }
}


export async function testExternalLinks(
    page: Page,
    context: BrowserContext,
    selector: string
) {
    const links = page.locator(selector);
    const count = await links.count();

    for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        if (!href) continue;

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            link.click({ timeout: 10_000 }),
        ]);

        try {
            await newPage.waitForLoadState('domcontentloaded', { timeout: 15_000 });
        } catch {
            await newPage.waitForURL(href, { timeout: 15_000 });
        }

        expect(newPage.url()).toContain(new URL(href).hostname);

        await newPage.close();
    }
}

export async function openMobileMenu(page: Page) {
    const burger = page.locator('#menuToggle, [data-testid="menuToggle"], button[aria-label*="menu"]');
    if (await burger.isVisible({ timeout: 2_000 })) {
        await burger.click({ force: true, timeout: 5_000 });
        await expect(page.locator('#mobileMenu')).toBeVisible({ timeout: 5_000 });
    }
}
