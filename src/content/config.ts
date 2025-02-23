// import { glob } from 'astro/loaders';
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
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		date: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		banner: z.string().optional(),
		author: z.string().optional(),
		authorlink: z.string().optional(),
		unsplashlink: z.string().optional(),
		url: z.string().optional(),
		isArticle: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
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
