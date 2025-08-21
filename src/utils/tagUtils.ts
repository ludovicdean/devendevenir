import { getCollection } from "astro:content";
import { getPosts } from "./blogUtils";

export async function getTagsCount() {
    const posts = await getPosts();
    const tagsCollection = await getCollection('tags');

    // Utilise les ids des tags pour le comptage
    const allTagIds = posts
        .map(post => post.data.tags)
        .flat()
        .filter(Boolean);

    const tagCounts = allTagIds.reduce((acc, tagId) => {
        acc[tagId] = (acc[tagId] || 0) + 1;
        return acc;
    }, {});

    const tagsWithCounts = tagsCollection.map(tag => {
        const id = tag.id;
        const name = tag.data.name || id;
        const count = tagCounts[id] || 0;
        return { id, name, count };
    });

    return tagsWithCounts;
}

export async function getTags() {
    return await getCollection('tags');
}