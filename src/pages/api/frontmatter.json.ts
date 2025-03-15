import { getCollection } from 'astro:content';

export async function GET() {
  const blogEntries = await getCollection('blog');
  // const frontmatterData = blogEntries.map(entry => entry.data);
  const frontmatterData = blogEntries.sort((a, b) => b.data.date?.valueOf() - a.data.date?.valueOf())
  .map(entry => ({
    id: entry.id,
    data: entry.data,
isMax: entry.body == undefined ?true: false
  }));
  console.log(frontmatterData);
  return new Response(JSON.stringify(frontmatterData));
}
