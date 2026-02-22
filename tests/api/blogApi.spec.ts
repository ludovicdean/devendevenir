import { expect, test, type APIRequestContext } from "@playwright/test";
import { z } from "astro/zod";
import { APIPublishedArticlesResponseSchema, APIUnpublishedArticlesResponseSchema } from "src/schemas/articles";

test("l'API articles (articles publiés) doit respecter le contrat Zod", async ({ request }) => {
    await testArticlesApi(request, "/api/published.json", APIPublishedArticlesResponseSchema);
});

test("l'API articles (articles non publiés) doit respecter le contrat Zod", async ({ request }) => {
    await testArticlesApi(request, "/api/unpublished.json", APIUnpublishedArticlesResponseSchema);
});

async function testArticlesApi(request: APIRequestContext, url: string, schema: z.ZodTypeAny) {
    const response = await request.get(url);
    const body = await response.json();
    schema.parse(body);
    expect(body.length).toBeGreaterThan(0);
}