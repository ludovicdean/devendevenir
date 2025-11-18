import { test } from '@playwright/test';
import {commonBeforeEach, testMenuLink, testVisibleLink} from '../utils/utils.ts';

test.beforeEach(async ({ page }) => {
    await commonBeforeEach(page);
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
