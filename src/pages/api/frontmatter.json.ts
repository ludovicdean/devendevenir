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
// import { getCollection } from 'astro:content';

// export async function GET() {
//   const blogEntries = await getCollection('blog');
//   // const frontmatterData = blogEntries.map(entry => entry.data);
// //   const frontmatterData = blogEntries.sort((a, b) => b.data.date?.valueOf() - a.data.date?.valueOf())
// //   .map(entry => ({
// //     id: entry.id,
// //     data: entry.data,
// // isMax: entry.body == undefined ?true: false
// //   }));
// //   console.log(frontmatterData);
// //   return new Response(JSON.stringify(frontmatterData));
// // 1. Grouper les articles par année
// const articlesByYear = blogEntries.reduce((acc, entry) => {
//   if (entry.data.date) { // Vérifier si entry.data.date est défini
//     const year = entry.data.date.getFullYear(); // Extraire l'année
//     if (!acc[year]) {
//       acc[year] = []; // Initialiser un tableau pour l'année si elle n'existe pas
//     }
//     acc[year].push({
//       id: entry.id,
//       data: entry.data, // Ne pas inclure data ici, on triera plus tard
//       isMax: entry.body == undefined ? true : false
//     });
//   }
//   return acc;
// }, {});

// // 2. Trier les articles de chaque année par date (du plus récent au plus ancien)
// for (const year in articlesByYear) {
//   articlesByYear[year].sort((a, b) => {
//     // Vérifier si la date est définie avant de comparer
//     if (a.data?.date && b.data?.date) {
//       return b.data.date.valueOf() - a.data.date.valueOf();
//     } else {
//       return 0; // Gérer le cas où la date est indéfinie
//     }
//   });
// }

// // 3. Convertir l'objet en tableau (optionnel, mais peut être utile pour l'affichage)
// const groupedArticles = Object.entries(articlesByYear).map(([year, articles]) => ({
//   year: parseInt(year),
//   articles: articles
// }));
 
// // 4. Trier les années du plus récent au plus ancien (optionnel)
// groupedArticles.sort((a, b) => b.year - a.year);


// console.log(groupedArticles);
// return new Response(JSON.stringify(groupedArticles));
// }

// export interface yearArticles {
// year: number;
// articles: any[];
// }
