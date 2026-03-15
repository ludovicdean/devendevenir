import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPosts } from 'src/utils/blogUtils';


export async function GET({ }: APIRoute): Promise<Response> {
    const articles = await getPosts();

    const allTags = await getCollection('tags');
    const tagMap = new Map();
    allTags.forEach(tagEntry => {
        const slug = tagEntry.id;
        tagMap.set(slug, tagEntry.data.name);
    });

    const tagCount = new Map<string, number>();
    articles.forEach(article => {
        const tags = article.data.tags || [];
        tags.forEach(tag => tagCount.set(tag, (tagCount.get(tag) || 0) + 1));
    });

    const totalArticles = articles.length;

    const tagsData = Array.from(tagCount.entries())
        .filter(([tagSlug]) => tagMap.has(tagSlug))
        .map(([tagSlug, count]) => ({
            id: tagSlug,
            name: tagMap.get(tagSlug)!,
            count,
            percentage: Math.round((count / totalArticles) * 100)
        }));

    tagsData.sort((a, b) => b.percentage - a.percentage);

    return new Response(JSON.stringify(tagsData));
}
