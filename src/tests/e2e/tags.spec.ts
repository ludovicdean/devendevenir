import {expect, test} from "@playwright/test";
import {testInternalLinks} from "../utils/utils.ts";

test('Tous les liens des tags fonctionnent', async ({ page }) => {
    await testInternalLinks(page, "tag-");
});

test('les compteurs de tags correspondent au nombre de posts sur leur page', async ({ page }) => {

    await page.goto('');

    const categoriesLocator = page.locator('[data-test-id^="tag-"] a');
    const categoriesCount = await categoriesLocator.count();

    console.log(`→ Nombre de catégories trouvées : ${categoriesCount}`);
    expect(categoriesCount, "Aucune catégorie trouvée sur la page d'accueil").toBeGreaterThan(0);

    for (let i = 0; i < categoriesCount; i++) {
        const categoryLink = categoriesLocator.nth(i);

        const countLocator = categoryLink.locator('[data-test-id^="count-"]');
        const countText = (await countLocator.innerText()).trim();
        const displayedCount = parseInt(countText.replace(/\D/g, ''), 10) || 0;

        console.log(`\n=== Catégorie #${i + 1} ===`);
        console.log(`Compteur affiché sur la home : ${displayedCount}`);

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle' }),
            categoryLink.click()
        ]);

        const postsLocator = page.locator('[data-test-id^="post-"]');
        await expect(postsLocator.first()).toBeVisible({ timeout: 5000 });
        const actualCount = await postsLocator.count();

        console.log(`Nombre de posts réellement affichés : ${actualCount}`);

        expect(
            actualCount,
            `Le compteur affiché (${displayedCount}) ne correspond pas au nombre réel de posts (${actualCount})`
        ).toBe(displayedCount);

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle' }),
            page.goBack()
        ]);

        await expect(categoriesLocator.first()).toBeVisible({ timeout: 5000 });
    }
});
