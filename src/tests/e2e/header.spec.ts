import {expect, type Locator, test} from '@playwright/test';
import {commonBeforeEach, testMenuLink, testVisibleLink} from '../utils/utils.ts';

const mobileProjects = ['iPhone12', 'Pixel5'];

let desktopMenu: Locator;
let mobileMenu: Locator;
let projectName: string;

test.beforeEach(async ({ page }, testInfo) => {
    await commonBeforeEach(page);
    desktopMenu = page.locator('[data-test-id="desktopMenu"]');
    mobileMenu = page.locator('[data-test-id="mobileMenu"]');
    projectName = testInfo.project.name;
});

test('Lien Talks/Podcasts fonctionne', async ({ page }) => {
    await testMenuLink(page, 'Talks/Podcasts', /talks-podcasts/, 'Et à part ça ?');
});

test('Lien A propos fonctionne', async ({ page }) => {
    await testMenuLink(page, 'À propos', /about/, 'À propos');
});
test('Lien Accueil', async ({ page }) => {
    await testVisibleLink(page, 'DevEnDevenir', /\/?$/, 'blog');
});

test('Affichage du menu', async ({ page }, testInfo) => {
    await page.goto('');

    const isMobile = mobileProjects.includes(projectName);

    if (isMobile) {
        await page.locator('[data-test-id="menuToggle"]').click();

        const backgroundColor = await mobileMenu.evaluate((el) =>
            window.getComputedStyle(el).backgroundColor
        );

        expect(backgroundColor).toBe('rgba(0, 0, 0, 0)');

        await expect(mobileMenu).toBeVisible();

        await expect(desktopMenu).not.toBeVisible();
    } else {
        await expect(desktopMenu).toBeVisible();
        await expect(mobileMenu).not.toBeVisible();
    }
});