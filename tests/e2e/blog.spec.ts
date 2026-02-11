import { test } from '@playwright/test';
import { commonBeforeEach, testExternalLinks, testInternalLinks } from './utils.ts';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
});

test('Tous les liens internes des posts fonctionnent', async ({ page }) => {
    await testInternalLinks(page, "post-");
});

test('Tous les liens externes fonctionnent', async ({ page, context }) => {
    await testExternalLinks(page, context, "main a[target=\"_blank\"]");
});

