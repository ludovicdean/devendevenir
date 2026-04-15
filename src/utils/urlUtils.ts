import type { APIContext } from "astro";

export function getRssUrl(Astro: APIContext) {
    const isDev = import.meta.env.DEV;
    const origin = isDev ? Astro.url.origin : Astro.site;
    const baseUrl = import.meta.env.BASE_URL;
    return new URL('rss.xml', `${origin}${baseUrl}`).href;
}
