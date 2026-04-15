import { z } from "astro/zod";

export const TagCountSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    count: z.number(),
});

export const TagsWithCountsResponseSchema = z.array(TagCountSchema);
export type TagCount = z.infer<typeof TagCountSchema>;
export type TagsWithCountsResponse = z.infer<typeof TagsWithCountsResponseSchema>;