import { getCollection, type CollectionEntry } from "astro:content";
import { getPosts } from "@utils/blogUtils";
import type { TagCountSchema } from "@schemas/tagscount";
import { z } from "astro/zod";

type TagWithCount = z.infer<typeof TagCountSchema>;

export async function getTagsCount(): Promise<TagWithCount[]> {
    const posts = await getPosts();
    const tagsCollection = await getCollection('tags');

    // Utilise les ids des tags pour le comptage
    const allTagIds = posts
        .map(post => post.data.tags)
        .flat()
        .filter((tag): tag is string => Boolean(tag));

    const tagCounts = allTagIds.reduce((acc: Record<string, number>, tagId: string) => {
        acc[tagId] = (acc[tagId] || 0) + 1;
        return acc;
    }, {});

    const tagsWithCounts: TagWithCount[] = tagsCollection.map(tag => {
        const id = tag.id;
        const name = tag.data.name || id;
        const description = tag.data.description || "";
        const count = tagCounts[id] || 0;
        return { id, name, description, count };
    });

    return tagsWithCounts;
}
