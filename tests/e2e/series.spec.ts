import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.goto("localhost:4321/devendevenir/series");
});

test("La page liste les séries publiées et leurs parties", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Séries" })).toBeVisible();

    const git = page.getByTestId("serie-git");
    const sql = page.getByTestId("serie-sql");
    await expect(git).toBeVisible();
    await expect(sql).toBeVisible();
    await expect(git.getByRole("listitem")).toHaveCount(3);
    await expect(sql.getByRole("listitem")).toHaveCount(3);
    await expect(git).toContainText(/parties/);
    await expect(git).toContainText(/min de lecture/);

    await git.getByRole("link", { name: "Git, partie 1" }).click();
    await expect(page).toHaveURL(/\/blog\/git-partie-1\/?$/);
    await expect(page.getByRole("link", { name: "Toutes les séries" }).first()).toBeVisible();
});
