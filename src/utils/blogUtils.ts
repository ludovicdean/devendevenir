import { getCollection } from "astro:content";
const base = import.meta.env.BASE_URL;

export async function getPosts() {
    const posts = (await getCollection('blog')).filter(post => post.id !== undefined && !post.id.startsWith('_')).sort((a, b) => {
        const dateA = a.data?.date instanceof Date ? a.data.date.valueOf() : 0;
        const dateB = b.data?.date instanceof Date ? b.data.date.valueOf() : 0;
        return dateB - dateA;
    });
    return posts;
}

export async function getUnpublishedPosts() {
    const posts = (await getCollection('blog')).filter(post => post.id !== undefined && post.id.startsWith('_')).sort((a, b) => {
        const dateA = a.data?.date instanceof Date ? a.data.date.valueOf() : 0;
        const dateB = b.data?.date instanceof Date ? b.data.date.valueOf() : 0;
        return dateB - dateA;
    });

    return posts;
}

export function getUrl(post) {
    return post.data.url ?? `${base + "/blog/" + post.id}/`
}

export async function getBlogsByTagId(tagId: string) {
    const posts = await getPosts();
    return posts.filter((post) => !post.id.startsWith('_') && post.data.tags?.includes(tagId));
}

export async function getSimilarPosts(tags: string[], currentTitle: string) {
    const posts = await getPosts();

    const similarPosts = posts.filter(
        (e) => tags.some((t) => e.data.tags?.includes(t)) && e.data.title !== currentTitle,
    ).slice(0, 3);

    return similarPosts;
}
