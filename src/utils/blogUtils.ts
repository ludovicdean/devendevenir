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

export function getPostYear(post: { data: { date?: Date } }): number {
    return post.data.date instanceof Date
        ? post.data.date.getFullYear()
        : new Date().getFullYear();
}

/** Years with published posts, newest first. */
export async function getPostYears(): Promise<number[]> {
    const posts = await getPosts();
    const years = new Set(posts.map(getPostYear));
    return Array.from(years).sort((a, b) => b - a);
}

export async function getPostsByYear(year: number) {
    const posts = await getPosts();
    return posts.filter((post) => getPostYear(post) === year);
}

/** Home for the latest year; `/annees/{year}/` for older years. */
export function getYearUrl(year: number, latestYear: number): string {
    if (year === latestYear) {
        return base.endsWith("/") ? base : `${base}/`;
    }
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    return `${prefix}/annees/${year}/`;
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

export async function getSeriesPosts(seriesName: string) {
    const posts = await getPosts();
    return posts
        .filter((p) => p.data.series?.name === seriesName)
        .sort((a, b) => a.data.series!.part - b.data.series!.part);
}
