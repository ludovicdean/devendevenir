import { z } from "astro/zod";
import { tableDataSchema } from "./tableData";

export const BlogFrontmatterSchema = z.object({
    title: z.string().default("Article en cours de rédaction"),
    description: z.string().optional(),
    date: z.coerce.date().optional().default(new Date()),
    updatedDate: z.coerce.date().optional(),
    banner: z.string().optional().default("/images/gaelle-marcel-9DZY0mO98xU-unsplash.webp"),
    author: z.string().optional().default("Article en cours de rédaction"),
    authorlink: z.string().optional().default("#"),
    unsplashlink: z.string().optional().default("#"),
    url: z.string().optional(),
    tags: z.array(z.string()).optional().default(["Test"]),
    tableData1: tableDataSchema.optional(),
    tableData2: tableDataSchema.optional(),
    tableData3: tableDataSchema.optional(),
});

export type BlogArticle = z.infer<typeof BlogFrontmatterSchema>;
