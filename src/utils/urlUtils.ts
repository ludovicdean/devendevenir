export function getRssUrl(Astro: any) {
    const isDev = import.meta.env.DEV;
    const origin = isDev ? Astro.url.origin : Astro.site;
    const baseUrl = import.meta.env.BASE_URL;
    console.log(origin, baseUrl);
    return new URL('rss.xml', `${origin}${baseUrl}`).href;
}
