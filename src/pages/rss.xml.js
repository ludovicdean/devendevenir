import { getRssString } from "@astrojs/rss";
import * as utils from "../utils/blogUtils";

export async function GET(context) {
    const articles = await utils.getPosts();

    // ✅ Base URL complète
    const fullBase = new URL(import.meta.env.BASE_URL, context.url.origin).href;

    const rssContent = await getRssString({
        title: "DevEnDevenir",
        description: "Le blog des devs reconvertis",
        site: fullBase,
        items: articles.map((article) => ({
            title: article.data.title,
            description: article.data.description,
            pubDate: article.data.date,
            link: utils.getUrl(article),
        })),
        customData: `<language>fr</language><generator>Astro</generator>`,
    });

    return new Response(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSS - DevEnDevenir</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 md:px-8">
    <div class="max-w-3xl mx-auto">
        <header class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                DevEnDevenir
            </h1>
            <p class="text-xl text-gray-600 font-medium">Le blog des devs reconvertis</p>
        </header>
        
        <div class="space-y-6">
            ${articles.map((article, index) => {
        const link = utils.getUrl(article);
        const date = new Date(article.data.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return `
            <article class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden">
                <div class="p-8">
                    <header>
                        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            <a href="${link}" rel="bookmark">
                                ${article.data.title}
                            </a>
                        </h2>
                        <p class="text-gray-600 leading-relaxed mb-6 line-clamp-3">${article.data.description}</p>
                    </header>
                    <footer class="flex flex-col justify-end sm:flex-row gap-4 items-start sm:items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <time datetime="${article.data.date}" class="font-semibold">Publié le ${date}</time>
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            #${index + 1} sur ${articles.length}
                        </span>
                    </footer>
                </div>
            </article>`;
    }).join('\n')}
        </div>
        
        <footer class="mt-16 text-center text-gray-500 text-sm pt-12 border-t border-gray-200">
            <p>Flux généré par <strong>Astro</strong> • <a href="${fullBase}" class="hover:text-blue-600" rel="home">Site complet</a></p>
        </footer>
    </div>
</body>
</html>`, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}
