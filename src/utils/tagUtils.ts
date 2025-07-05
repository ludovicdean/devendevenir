import { getPosts } from "./blogUtils";

export async function getTags(){
    const posts = await getPosts();
    
    const allTags = posts.map((post) => post.data.tags).flat();
    
    const tagCounts = allTags.reduce((acc, tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return tagCounts;
}