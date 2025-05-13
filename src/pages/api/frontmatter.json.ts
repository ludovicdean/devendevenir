import { getCollection } from 'astro:content';

export async function GET() {
  const blogEntries = await getCollection('blog');
  const articlesByYear = blogEntries.reduce((acc, entry) => {
  if (entry.data.date) {
    const year = entry.data.date.getFullYear();
    if (!acc[year]) {
      acc[year] = []; 
    }
    acc[year].push({
      id: entry.id,
      data: entry.data,
      isMax: entry.body == undefined ? true : false
    });
  }
  return acc;
}, {});

for (const year in articlesByYear) {
  articlesByYear[year].sort((a, b) => {
    if (a.data?.date && b.data?.date) {
      return b.data.date.valueOf() - a.data.date.valueOf();
    } else {
      return 0; 
    }
  });
}

const groupedArticles = Object.entries(articlesByYear).map(([year, articles]) => ({
  year: parseInt(year),
  articles: articles
}));
 
groupedArticles.sort((a, b) => b.year - a.year);

return new Response(JSON.stringify(groupedArticles));
}
