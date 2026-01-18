import { test } from '@playwright/test';
import * as utils from './utils/utils.ts';

test.beforeEach(async ({ page }) => {
    await utils.commonBeforeEach(page);
});

test('Tous les liens internes des posts fonctionnent', async ({ page }) => {
    await utils.testInternalLinks(page, "post-");
});

test('Tous les liens externes s\'ouvrent dans un nouvel onglet', async ({ page, context }) => {
    await utils.testExternalLinks(page, context);
});
