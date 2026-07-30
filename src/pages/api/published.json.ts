import type { CollectionEntry } from "astro:content";
import { getPosts } from "@utils/blogUtils";

type PublishedArticle = {
  id: string;
  data: CollectionEntry<"blog">["data"];
  isMax: boolean;
};

export async function GET() {
  const blogEntries = await getPosts();

  const articlesByYear = blogEntries.reduce<Record<number, PublishedArticle[]>>((acc, entry) => {
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

  return new Response(JSON.stringify(groupedArticles));
}
