import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import expressiveCode from 'astro-expressive-code';
import mermaid from 'astro-mermaid';

const astroBase = process.env.ASTRO_BASE || '/devendevenir';

const pagefindIgnorePlugin = {
  name: 'pagefind-ignore',
  hooks: {
    postprocessRenderedBlock: ({ renderData }) => {
      renderData.blockAst.properties['data-pagefind-ignore'] = '';
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://ludovicdean.github.io',
  base: astroBase,
  middleware: ['./src/middleware.js'],
  integrations: [
    mermaid({
      theme: 'neutral',
      autoTheme: true
    }),
    expressiveCode({
      plugins: [pagefindIgnorePlugin],
      themes: ['github-dark', 'github-light'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `html.${theme.type === 'dark' ? 'dark' : 'light'}`,
    }),
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
    pagefind(),
  ],
  output: "static"
});