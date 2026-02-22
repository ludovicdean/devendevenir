import { z } from "astro/zod";
import { BlogFrontmatterSchema } from "./blog";

export const BlogArticleResponseSchema = z.object({
    id: z.string(),
    data: BlogFrontmatterSchema,
    isMax: z.boolean(),
});

export const GroupedArticlesSchema = z.object({
    year: z.number(),
    articles: z.array(BlogArticleResponseSchema),
});

export const APIPublishedArticlesResponseSchema = z.array(GroupedArticlesSchema);

export const APIUnpublishedArticlesResponseSchema = z.array(BlogArticleResponseSchema);
