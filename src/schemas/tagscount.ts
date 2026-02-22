import { z } from "astro/zod";

export const TagCountSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    count: z.number(),
});

export const TagsWithCountsResponseSchema = z.array(TagCountSchema);
