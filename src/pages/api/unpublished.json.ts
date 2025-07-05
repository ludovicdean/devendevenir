import { getUnpublishedPosts } from 'src/utils/blogUtils';

export async function GET() {
  const blogEntries = await getUnpublishedPosts();

  const frontmatterData = blogEntries
  .map(entry => ({
    id: entry.id,
    data: entry.data,
    isMax: entry.body == undefined ?true: false
  }));

  return new Response(JSON.stringify(frontmatterData));
}