import { getCollection } from "astro:content";

// version articles groupés par année
export async function GET() {
  const blogEntries = await getCollection('blog');
  const frontmatterData = blogEntries.sort((a, b) => a.data.date!.valueOf() - b.data.date!.valueOf())
  .map(entry => ({
    id: entry.id,
    data: entry.data,
    year: entry.data.date?.getFullYear()
  }));

  const yearSortedData = Object.groupBy(frontmatterData, ({ year }) => year);
  console.log(yearSortedData);
  return new Response(JSON.stringify(yearSortedData));
}