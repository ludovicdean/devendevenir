import { getCollection } from 'astro:content';

export interface Tag{
  name: string;
  description: string;
  nombreArticles: number;
}

export async function GET() {
  const posts = (await getCollection("blog")).filter(post => !post.id.startsWith('_'));
  const fullTags = (await getCollection('tags'));

  const allTags = posts.map((post) => post.data.tags).flat();
  
  const tagCounts = allTags.reduce((acc, tag: string) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tags: Tag[] = Object.entries(tagCounts).map(([name, count]) => {
    const tagInfo = fullTags.find(t => t.data.name === name);
    console.log(tagInfo);
    return {
      name,
      description: tagInfo ? tagInfo.data.description : "",
      nombreArticles: count
    };
  });

  return new Response(JSON.stringify(tags));}