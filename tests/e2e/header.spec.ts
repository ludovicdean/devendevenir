import { test } from "@playwright/test";
import { expect } from "./utils.spec.ts";


// test('le header est visible', async ({ page }) => {
//     // On cible le header qui contient le nom du site pour éviter les conflits avec les devtools Astro
//     const homeLink = page.getByRole('link', { name: 'DevEnDevenir', exact: true });
//     console.log(homeLink);
//     // await expect(homeLink).toBeVisible();
//     await homeLink.click();
// });

test.beforeEach(async ({ page }) => {
    // Augmente timeout navigation + ajoute waitForLoadState
    await page.goto('http://localhost:4321/devendevenir/', {
        waitUntil: 'networkidle',  // Attend fin des requêtes réseau
        timeout: 60_000
    });
});

test('Lien accueil (logo) fonctionne', async ({ page }) => {
    // Remplace ton expect lent par un locator direct + rapide
    await page.locator('#logo').click();
    // Clique + vérifie
    await expect(page).toHaveURL(/devendevenir\/?$/);
});

test('Lien accueil (texte) fonctionne', async ({ page, isMobile }) => {
    // Remplace ton expect lent par un locator direct + rapide
    test.skip(isMobile, 'Ce test ne fonctionne pas sur mobile');

    await page.locator('#accueil').click();
    // Clique + vérifie
    await expect(page).toHaveURL(/devendevenir\/?$/);
});

test('Debug isMobile par project', async ({ page, isMobile }) => {
    const projectName = test.info().project?.name || 'unknown';
    const viewport = page.viewportSize();

    console.log(`Project: ${projectName} isMobile: ${isMobile} Viewport: ${viewport?.width}x${viewport?.height}`);

    // Log visible dans la console + rapport HTML
});
// test('Lien accueil (logo) fonctionne', async ({ page }) => {
//     // Augmente timeout navigation + ajoute waitForLoadState
//     await page.goto('http://localhost:4321/devendevenir/', {
//         waitUntil: 'networkidle',  // Attend fin des requêtes réseau
//         timeout: 60_000
//     });

//     // Remplace ton expect lent par un locator direct + rapide
//     await page.locator('#logo').click();
//     // Clique + vérifie
//     await expect(page).toHaveURL(/devendevenir\/?$/);
// });

// test('Lien accueil (texte) fonctionne', async ({ page }) => {
//     // Remplace ton expect lent par un locator direct + rapide
//     await page.locator('#accueil').click();
//     // Clique + vérifie
//     await expect(page).toHaveURL(/devendevenir\/?$/);
// });

// test('le lien du logo redirige vers la page d\'accueil', async ({ page }) => {
//     await page.goto('/about');

//     // Cliquer sur le logo
//     await page.locator('header img[alt="Logo"]').click();

//     // Vérifier qu'on est bien sur la page d'accueil
//     await expect(page).toHaveURL(/.*\/$/);
// });

// test('le lien "Talks/Podcasts" fonctionne sur desktop', async ({ page, viewport }) => {
//     // Skip ce test sur mobile car le lien est dans un menu caché
//     if (viewport && viewport.width < 768) {
//         test.skip();
//     }

//     await page.goto('/');

//     // Cliquer sur le lien Talks/Podcasts
//     const talksLink = page.locator('header').getByRole('link', { name: 'Talks/Podcasts' });
//     await expect(talksLink).toBeVisible();
//     await talksLink.click();
//     await expect(page).toHaveURL(/.*\/talks-podcasts/);
// });

// test('le lien "À propos" fonctionne sur desktop', async ({ page, viewport }) => {
//     // Skip ce test sur mobile car le lien est dans un menu caché
//     if (viewport && viewport.width < 768) {
//         test.skip();
//     }

//     await page.goto('/');

//     // Cliquer sur le lien À propos
//     const aboutLink = page.locator('header').getByRole('link', { name: 'À propos' });
//     await expect(aboutLink).toBeVisible();
//     await aboutLink.click();
//     await expect(page).toHaveURL(/.*\/about/);
// });

// test('les liens externes ont l\'attribut target="_blank"', async ({ page }) => {
//     await page.goto('/');

//     // Vérifier le lien LinkedIn
//     const linkedinLink = page.locator('header a[title="LinkedIn"]').first();
//     await expect(linkedinLink).toHaveAttribute('target', '_blank');
//     await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ludovic-dean/');

//     // Vérifier le lien GitHub
//     const githubLink = page.locator('header a[title="GitHub"]').first();
//     await expect(githubLink).toHaveAttribute('target', '_blank');
//     await expect(githubLink).toHaveAttribute('href', 'https://github.com/ludovicdean/astro-blog');

//     // Vérifier le lien RSS
//     const rssLink = page.locator('header a[title="RSS Feed"]').first();
//     await expect(rssLink).toHaveAttribute('target', '_blank');
//     await expect(rssLink).toHaveAttribute('href', /.*\/rss\.xml/);
// });