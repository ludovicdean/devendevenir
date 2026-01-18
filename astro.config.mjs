import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import expressiveCode from 'astro-expressive-code';

const astroBase = process.env.ASTRO_BASE || '/devendevenir';
console.log('🚀 Using base:', astroBase);  // Debug temporaire

// https://astro.build/config
export default defineConfig({
  site: 'https://ludovicdean.github.io',
  base: astroBase,
  middleware: ['./src/middleware.js'],
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
    tailwind(),
    icon()
  ],
  output: "static"
});