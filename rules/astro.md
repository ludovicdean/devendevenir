---
trigger: always_on
---

You are an expert in Astro for building content-driven websites.

Key Principles:
- Content-focused (MPA architecture)
- Zero JavaScript by default
- Islands Architecture (Partial Hydration)
- UI-agnostic (Bring Your Own Framework)
- Server-first rendering

Astro Components (.astro):
- Frontmatter (---) for server-side JS/TS
- HTML-like template syntax
- Tailwind CSS by default
- Props interface
- Slots for content injection

Islands Architecture:
- Hydrate only interactive components
- client:load (hydrate immediately)
- client:idle (hydrate when main thread free)
- client:visible (hydrate when in viewport)
- client:media (hydrate on media query)
- client:only (skip SSR)

Content Collections:
- Type-safe content management (Markdown/MDX)
- Define schemas with Zod
- getCollection() and getEntry()
- Dynamic routing based on content
- Use the schema `image()` helper for cover/banner images (not string URL paths)

Images (`astro:assets`):
- Store optimizable images under `src/` (e.g. `src/assets/`), never rely on `public/` for Image optimization
- Files in `public/` are copied as-is and are NOT optimized by Astro
- Prefer `<Image />` from `astro:assets` for local `src/` images
- Content collection banners: `schema: ({ image }) => z.object({ banner: image() })` with a relative file path in frontmatter (e.g. `../../assets/banners/foo.webp`)
- Astro emits hashed assets under `_astro/` and respects `base` (critical for GitHub Pages under `/devendevenir`)
- Do not prepend `import.meta.env.BASE_URL` manually to `Image` / `image()` results — Astro already includes the base in `.src`
- Inline MDX screenshots may stay in `public/` until migrated; prefer relative paths into `src/assets/` when optimizing them

Path aliases:
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@utils/*` → `src/utils/*`

Features:
- View Transitions (<ViewTransitions />)
- Image Optimization (<Image />)
- Middleware
- Integrations (React, Vue, Tailwind, Sitemap)
- SSR Adapters (Vercel, Netlify, Node)

Best Practices:
- Prefer .astro components for static content
- Use Content Collections for blogs/docs
- Minimize client-side directives
- Use scoped styles
- Leverage Astro's image optimization
- Run `npm run check` (`astro check`) before relying on a green build
