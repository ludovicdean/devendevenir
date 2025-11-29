import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import expressiveCode from 'astro-expressive-code';

const base = process.env.ASTRO_BASE || '/devendevenir';

// https://astro.build/config
export default defineConfig({
  site: 'https://ludovicdean.github.io',
  base,
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