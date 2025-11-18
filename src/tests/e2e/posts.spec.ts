import { test } from '@playwright/test';
import {commonBeforeEach, testExternalLinks, testInternalLinks, testMenuLink, testVisibleLink} from '../utils/utils.ts';

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
});

test('Tous les liens internes des posts fonctionnent', async ({ page }) => {
    await testInternalLinks(page, "post-");
});

test('Tous les liens externes s\'ouvrent dans un nouvel onglet', async ({ page, context }) => {
    await testExternalLinks(page, context);
});
