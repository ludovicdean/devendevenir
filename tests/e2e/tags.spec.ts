import { test, expect } from "@playwright/test";
import { commonBeforeEach } from "./utils.ts";

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
});

test.describe.configure({ mode: 'serial' });

test('Le filtrage par tag sur l\'accueil affiche le bon nombre d\'articles', async ({ page }) => {
    const tagButtons = page.locator('[data-tag-filters] [data-tag-filter-btn]:not([data-tag-id=""])');
    const tagsCount = await tagButtons.count();

    expect(tagsCount).toBeGreaterThan(0);

    for (let i = 0; i < tagsCount; i++) {
        const tagButton = tagButtons.nth(i);
        const tagText = (await tagButton.textContent() || '').trim();
        const numberMatches = tagText.match(/\d+/g);
        const expectedCount = numberMatches && numberMatches.length > 0
            ? parseInt(numberMatches[numberMatches.length - 1], 10)
            : 0;

        if (expectedCount === 0) {
            continue;
        }

        await tagButton.click();

        const yearView = page.locator('[data-year-posts]');
        const tagView = page.locator('[data-tag-posts]');
        await expect(yearView).toBeHidden();
        await expect(tagView).toBeVisible();

        const visibleArticles = tagView.locator('[data-post-tags]:not(.hidden)');
        await expect(visibleArticles).toHaveCount(expectedCount);
    }

    await page.getByTestId('tag-all').click();
    await expect(page.locator('[data-year-posts]')).toBeVisible();
    await expect(page.locator('[data-tag-posts]')).toBeHidden();
});

test('Les pages de tags listent le bon nombre d\'articles', async ({ page }) => {
    const tagButtons = page.locator('[data-tag-filters] [data-tag-filter-btn]:not([data-tag-id=""])');
    const tagsCount = await tagButtons.count();

    for (let i = 0; i < tagsCount; i++) {
        const tagButton = tagButtons.nth(i);
        const tagId = await tagButton.getAttribute('data-tag-id');
        const tagText = (await tagButton.textContent() || '').trim();
        const numberMatches = tagText.match(/\d+/g);
        const expectedCount = numberMatches && numberMatches.length > 0
            ? parseInt(numberMatches[numberMatches.length - 1], 10)
            : 0;

        if (!tagId || expectedCount === 0) {
            continue;
        }

        await page.goto(`/devendevenir/tags/${tagId}/`, { waitUntil: 'domcontentloaded' });
        const articlesList = page.locator('main ul li[data-post-tags], main > ul > li');
        const articlesCount = await articlesList.count();

        expect(articlesCount).toBe(expectedCount);

        await page.goto('/devendevenir/', { waitUntil: 'domcontentloaded' });
    }
});
