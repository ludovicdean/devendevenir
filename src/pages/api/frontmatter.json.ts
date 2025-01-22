import { getCollection } from 'astro:content';

export async function GET() {
  const blogEntries = await getCollection('blog');
  const frontmatterData = blogEntries.map(entry => entry.data);
  return new Response(JSON.stringify(frontmatterData));
}
