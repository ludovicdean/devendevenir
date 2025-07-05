import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://ludovic.dean.github.io',
  base: '/devendevenir',
  middleware: ['./src/middleware.js'],
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
  ],
  output: "static"
});