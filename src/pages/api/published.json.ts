import { getPosts } from 'src/utils/blogUtils';

export async function GET() {
  const blogEntries = await getPosts();

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

const groupedArticles = Object.entries(articlesByYear).map(([year, articles]) => ({
  year: parseInt(year),
  articles: articles
}));
 
groupedArticles.sort((a, b) => b.year - a.year);
console.log(groupedArticles);
return new Response(JSON.stringify(groupedArticles));
}
