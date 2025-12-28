import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const tableDataSchema = z.object({
	headers: z.array(z.string()),
	rows: z.array(z.array(z.union([z.string(), z.number()])))
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/blog" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().default(""),
		description: z.string().optional(),
		// Transform string to Date object
		date: z.coerce.date().optional().default(new Date()),
		updatedDate: z.coerce.date().optional(),
		banner: z.string().optional().default("/images/gaelle-marcel-9DZY0mO98xU-unsplash.webp"),
		author: z.string().optional().default(""),
		authorlink: z.string().optional().default("#"),
		unsplashlink: z.string().optional().default("#"),
		url: z.string().optional(),
		tags: z.array(z.string()).optional().default(["Test"]),
		tableData1: tableDataSchema.optional(),
		tableData2: tableDataSchema.optional(),
		tableData3: tableDataSchema.optional(),
	}),
});

const tags = defineCollection({
	loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/tags" }),
	schema: z.object({
		name: z.string(),
		description: z.string()
	})
})

export const collections = { blog, tags };
