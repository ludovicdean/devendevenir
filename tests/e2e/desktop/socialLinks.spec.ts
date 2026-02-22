import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import { commonBeforeEach } from "../utils";

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, isMobile }) => {
    test.skip(isMobile);
    await commonBeforeEach(page);
});

async function testHeaderLinkDesktop(page: Page, context: BrowserContext, title: string, expectedDomain: string) {
    const test = page.locator(`header a[title="${title}"]`).first();
    await expect(test).toBeVisible({ timeout: 8_000 });

    const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 25_000 }),
        test.click({ force: true, timeout: 10_000 }),
    ]);

    const urlPattern = new RegExp(expectedDomain.replace('.', '\\.'));
    await newPage.waitForURL(urlPattern, {
        timeout: 25_000
    });
    expect(newPage.url()).toContain(expectedDomain);
    await newPage.close();
}


test('Le lien vers Linkedin sur Desktop fonctionne', async ({ page, context }) => {
    await testHeaderLinkDesktop(page, context, 'LinkedIn', 'linkedin.com');
});
test('Le lien vers Github sur Desktop fonctionne', async ({ page, context }) => {
    await testHeaderLinkDesktop(page, context, 'GitHub', 'github.com');
});

test('Le lien vers le feed RSS sur Desktop fonctionne', async ({ page, context }) => {
    await testHeaderLinkDesktop(page, context, 'RSSFeed', 'rss.xml');
});