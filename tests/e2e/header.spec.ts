import { test } from '@playwright/test';
import * as utils from './utils/utils.ts';

test.beforeEach(async ({ page }) => {
    await utils.commonBeforeEach(page);
});

test('Lien Talks/Podcasts fonctionne', async ({ page }) => {
    await utils.testMenuLink(page, 'Talks/Podcasts', /talks-podcasts/, 'Et à part ça ?');
});

test('Lien A propos fonctionne', async ({ page }) => {
    await utils.testMenuLink(page, 'À propos', /about/, 'À propos');
});
test('Lien Accueil', async ({ page }) => {
    await utils.testVisibleLink(page, /Dev.*En.*Devenir/i, /\/devendevenir\/?$/, 'blog');
});
