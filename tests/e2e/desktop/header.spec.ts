import { expect, test } from "@playwright/test";
import { commonBeforeEach } from "../utils";

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, isMobile }) => {
    test.skip(isMobile);
    await commonBeforeEach(page);
});

test('Lien accueil (texte) fonctionne', async ({ page }) => {
    await page.locator('#accueil').click();
    await expect(page).toHaveURL(/devendevenir\/?$/);
});

test('Lien accueil (logo) fonctionne', async ({ page }) => {
    await page.locator('#logo').click();
    await expect(page).toHaveURL(/devendevenir\/?$/);
});

test('Lien A propos fonctionne', async ({ page }) => {
    const test = page.getByTestId('a-propos-desktop');
    await test.click();
    await expect(page).toHaveURL(/devendevenir\/about/);
});

test('Lien Talks/Podcasts fonctionne', async ({ page }) => {
    await page.getByTestId('talks-podcasts-desktop').click();
    await expect(page).toHaveURL(/devendevenir\/talks-podcasts/);
});
