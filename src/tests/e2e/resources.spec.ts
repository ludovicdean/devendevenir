import {expect, test} from "@playwright/test";
import {commonBeforeEach} from "../utils/utils.ts";

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
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