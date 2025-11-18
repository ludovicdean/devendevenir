import type {BrowserContext, Page} from "@playwright/test";
import { expect } from '@playwright/test';

export async function commonBeforeEach(page: Page) {
    await page.goto('');
    await expect(page).toHaveTitle(/Dev En Devenir/);
    await expect(page.getByText('Le blog écrit par un développeur pour les développeurs !')).toBeVisible();
}

export async function openMenuIfNeeded(page: Page) {
    const burger = page.locator('#menuToggle'); // adapte le sélecteur
    if (await burger.isVisible()) {
        await burger.click();
    }
}

export async function testMenuLink(page: Page, linkName: string, urlPattern: RegExp, expectedText: string) {
    await openMenuIfNeeded(page);

    const link = page.getByRole('link', { name: linkName }).first();
    await link.click();
    await expect(page).toHaveURL(urlPattern);
    await expect(page.locator('body')).toContainText(expectedText);
}

export async function testVisibleLink(page: Page, linkName: string, urlPattern: RegExp, expectedText: string) {
    const link = page.getByRole('link', { name: linkName }).first();
    await link.click();
    await expect(page).toHaveURL(urlPattern);
    await expect(page.locator('body')).toContainText(expectedText);
}

export async function testInternalLinks(page: Page, selectorPrefix: string) {
    await page.goto('');

    const links = page.locator(`[data-test-id^="${selectorPrefix}"] a`);
    const count = await links.count();

    for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        if (!href) continue;

        await link.click();
        await page.waitForLoadState('domcontentloaded');

        if (href.startsWith('/')) {
            const url = new URL(page.url());
            expect(url.pathname).toBe(href);
        } else {
            expect(page.url()).toContain(href);
        }

        await page.goto('');
        await page.waitForLoadState('domcontentloaded');
    }
}

export async function testExternalLinks(
    page: Page,
    context: BrowserContext,
    selector = 'main a[target="_blank"]'
) {
    await page.goto('');

    const links = page.locator(selector);
    const count = await links.count();

    for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        if (!href) continue;

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            link.click(),
        ]);
        await newPage.waitForLoadState();

        expect(newPage.url()).toBe(href);
        await newPage.close();
    }
}