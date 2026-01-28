import rss from "@astrojs/rss";
import * as utils from "../utils/blogUtils";

export async function GET(context) {
    const articles = await utils.getPosts();

    return rss({
        title: "DevEnDevenir",
        description: "Le blog des devs reconvertis",
        site: context.site,
        items: articles.map((article) => ({
            title: article.data.title,
            description: article.data.description,
            pubDate: article.data.date,
            link: utils.getUrl(article),
        })),
        customData: `<language>fr</language><generator>Astro</generator>`,
        stylesheet: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/rss.xsl`,
    });
}

