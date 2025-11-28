import { getTagsCount } from 'src/utils/tagUtils';

export async function GET() {
  const tagsWithCounts = await getTagsCount();

  return new Response(JSON.stringify(tagsWithCounts));
}