import { expect, test } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { openMobileMenu } from '../utils';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!isMobile);

    await page.goto('http://localhost:4321/devendevenir/');
});

async function clickMobileHeaderLink(page: Page, dataTestId: string, expectedPathRegex: RegExp) {
    const link: Locator = page.getByTestId(dataTestId);
    await expect(link).toBeVisible({ timeout: 8_000 });
    await link.click({ timeout: 10_000 });
    await expect(page).toHaveURL(expectedPathRegex);
}

test('Lien accueil (logo) fonctionne', async ({ page }) => {
    await page.locator('#logo').click();
    await expect(page).toHaveURL(/devendevenir\/?$/);
});

test('Lien A propos fonctionne', async ({ page }) => {
    await openMobileMenu(page);
    await clickMobileHeaderLink(page, 'a-propos-mobile', /devendevenir\/about\/?$/);
});

test('Lien Talks/Podcasts fonctionne', async ({ page }) => {
    await openMobileMenu(page);
    await clickMobileHeaderLink(page, 'talks-podcasts-mobile', /devendevenir\/talks-podcasts\/?$/);
});
