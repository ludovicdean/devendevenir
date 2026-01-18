import { test, expect, type Locator } from '@playwright/test';

const mobileProjects = ['iPhone12', 'Pixel5'];

let desktopMenu: Locator;
let mobileMenu: Locator;
let projectName: string;

test.beforeEach(async ({ page }, testInfo) => {
    desktopMenu = page.locator('[data-test-id="desktopMenu"]');
    mobileMenu = page.locator('[data-test-id="mobileMenu"]');
    projectName = testInfo.project.name;
});

test('vérifie menus mobile/desktop selon device/project.current', async ({ page }, testInfo) => {
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

test('Vérifie que les ressources critiques sont chargées et la navigation fonctionne', async ({ page }, testInfo) => {
    const loadedResources = new Set<string>();
    const failedResources = new Set<string>();

    await page.route('**/*.{css,js,woff,woff2,ttf,eot,otf}', route => {
        const url = route.request().url();
        route.continue().then(() => loadedResources.add(url)).catch(() => failedResources.add(url));
    });

    await page.goto('');

    expect(loadedResources.size).toBeGreaterThan(0);

    console.log(`===${testInfo.project.name}===`)
    console.log(`Nombre de ressources chargées : ${loadedResources.size}`);
    console.log(`Nombre de ressources non chargées : ${loadedResources.size}`);

    test.info().annotations.push({ type: 'note', description: `Ressources chargées: ${loadedResources.size}, échouées: ${failedResources.size}` });
});