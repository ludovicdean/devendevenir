import { getCollection } from 'astro:content';
import type { Tag } from 'src/interfaces/Tag';
import { getTagsCount } from 'src/utils/tagUtils';

export async function GET() {
  
  const tagCounts = await getTagsCount();

  const fullTags = await getCollection("tags");

  const tags: Tag[] = Object.entries(tagCounts).map(([name, count]) => {
    const tagInfo = fullTags.find(t => t.data.name === name);
    return {
      id: tagInfo?.id,
      name,
      description: tagInfo ? tagInfo.data.description : "",
      nombreArticles: count
    };
  });

  return new Response(JSON.stringify(tags));
}