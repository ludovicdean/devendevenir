import { test, expect } from "@playwright/test";
import { commonBeforeEach } from "./utils.ts";

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
});

test.describe.configure({ mode: 'serial' });

test('Les compteurs de tags sur l\'accueil correspondent aux articles sur les pages de tags', async ({ page }) => {
    // await page.goto('https://ludovicdean.github.io/devendevenir/');

    const tagLinks = page.locator('a[href*="/devendevenir/tags/"]');
    const tagsCount = await tagLinks.count();

    expect(tagsCount).toBeGreaterThan(0);

    for (let i = 0; i < tagsCount; i++) {
        const tagLink = tagLinks.nth(i);
        const tagText = (await tagLink.textContent() || '').trim();

        const numberMatches = tagText.match(/\d+/g);
        const expectedCount = numberMatches && numberMatches.length > 0
            ? parseInt(numberMatches[numberMatches.length - 1], 10)
            : 0;

        if (expectedCount === 0) {
            continue;
        }

        const homeUrl = page.url();

        await tagLink.click();
        await expect(page).toHaveURL(/\/devendevenir\/tags\/[^\/]+\/$/);
        const articlesList = page.locator('main > ul > li');
        const articlesCount = await articlesList.count();

        expect(articlesCount).toBe(expectedCount);

        await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });
    }
});
