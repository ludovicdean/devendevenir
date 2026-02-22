import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { BlogFrontmatterSchema } from 'src/schemas/blog';
import { tagSchema } from 'src/schemas/tag';

const blog = defineCollection({
	loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/blog" }),
	schema: BlogFrontmatterSchema,
});

const tags = defineCollection({
	loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/tags" }),
	schema: tagSchema,
})

export const collections = { blog, tags };
