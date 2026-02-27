import { test, expect, type Page, type BrowserContext, type Locator } from "@playwright/test";

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!isMobile);
    await page.goto('/devendevenir/');
});

async function testHeaderLinkMobile(page: Page, context: BrowserContext, title: string, endUrl: string) {
    let link: Locator | null = null;

    const burgerSelectors = ['#menuToggle', '[data-testid="menuToggle"]', 'button[aria-label*="menu"]', '.hamburger'];
    let burgerClicked = false;

    for (const selector of burgerSelectors) {
        const burger = page.locator(selector);
        if (await burger.count() > 0) {
            if (await burger.isVisible({ timeout: 2_000 })) {
                await burger.scrollIntoViewIfNeeded({ timeout: 3_000 });
                await burger.click({ force: true, timeout: 5_000 });
                burgerClicked = true;
                break;
            }
        }
    }

    link = page.locator(`#mobileMenu a[title="${title}"], nav a[title="${title}"]`).first();

    await expect(link).toBeVisible({ timeout: 8_000 });

    const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 20_000 }),
        link.click({ force: true, timeout: 10_000 }),
    ]);

    await newPage.waitForLoadState('domcontentloaded', { timeout: 20_000 });
    expect(newPage.url()).toContain(endUrl);
    await newPage.close();
}

test('Le lien vers Linkedin sur Mobile fonctionne', async ({ page, context }) => {
    await testHeaderLinkMobile(page, context, 'LinkedIn', 'linkedin.com');
});

test('Le lien vers le feed RSS sur Mobile fonctionne', async ({ page, context }) => {
    await testHeaderLinkMobile(page, context, 'RSSFeed', 'rss.xml');
});

test('Le lien vers Github sur Mobile fonctionne', async ({ page, context }) => {
    await testHeaderLinkMobile(page, context, 'GitHub', 'github.com');
});

test('le menu mobile s’ouvre et se ferme', async ({ page, browserName }) => {
    const burger = page.locator('#menuToggle');
    const mobileMenu = page.locator('#mobileMenu');
    const overlay = page.locator('#overlay');

    await expect(mobileMenu).toBeHidden({ timeout: 3_000 });
    await expect(overlay).toBeHidden({ timeout: 3_000 });

    await burger.click();

    const timeout = browserName === 'webkit' ? 8_000 : 3_000;
    await page.waitForTimeout(400);

    await expect(mobileMenu).toBeVisible({ timeout });
    await expect(overlay).toBeVisible({ timeout });

    await overlay.click({
        force: true,
        position: { x: 10, y: 10 },
        timeout: 10_000
    });

    await page.waitForTimeout(400);
    await expect(mobileMenu).toBeHidden({ timeout });
    await expect(overlay).toBeHidden({ timeout });
});