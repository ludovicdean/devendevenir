import { test, expect } from "@playwright/test";
import { TagsWithCountsResponseSchema } from "../../src/schemas/tagscount";

test("l'API des tags doit renvoyer le bon format JSON", async ({ request }) => {
  const response = await request.get("/api/tags.json");
  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  const validation = TagsWithCountsResponseSchema.safeParse(body);
  expect(validation.success).toBe(true);
});
