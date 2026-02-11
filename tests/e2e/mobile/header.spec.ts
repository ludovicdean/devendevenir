import { expect, test } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!isMobile);

    await page.goto('http://localhost:4321/devendevenir/', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
    });
});

async function openMobileMenu(page: Page) {
    const burger = page.locator('#menuToggle, [data-testid="menuToggle"], button[aria-label*="menu"]');
    if (await burger.isVisible({ timeout: 2_000 })) {
        await burger.click({ force: true, timeout: 5_000 });
        await expect(page.locator('#mobileMenu')).toBeVisible({ timeout: 5_000 });
    }
}

// ✅ Fonction utilitaire : clique sur un lien du menu mobile (même onglet)
async function clickMobileHeaderLink(page: Page, dataTestId: string, expectedPathRegex: RegExp) {
    const link: Locator = page.getByTestId(dataTestId);
    await expect(link).toBeVisible({ timeout: 8_000 });
    await link.click({ timeout: 10_000 });
    await expect(page).toHaveURL(expectedPathRegex);
}

// ✅ Test logo (home) : déjà OK
test('Lien accueil (logo) fonctionne', async ({ page }) => {
    // Ici tu es déjà sur la home + menu ouvert
    await page.locator('#logo').click();
    await expect(page).toHaveURL(/devendevenir\/?$/);
});

// ✅ Lien A propos (menu mobile)
test('Lien A propos fonctionne', async ({ page }) => {
    await openMobileMenu(page);
    await clickMobileHeaderLink(page, 'a-propos-mobile', /devendevenir\/about\/?$/);
});

// ✅ Lien Talks/Podcasts (menu mobile)
test('Lien Talks/Podcasts fonctionne', async ({ page }) => {
    await openMobileMenu(page);
    await clickMobileHeaderLink(page, 'talks-podcasts-mobile', /devendevenir\/talks-podcasts\/?$/);
});
