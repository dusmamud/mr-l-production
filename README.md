# Mr. L Production — Make Ideas Move

Creative studio website built with **Next.js 16.4.6** (App Router), **React 19.3**, **Tailwind CSS 4.3**, **Framer Motion 14** and **lucide-react 1.74**. Mobile-first, static by default, verified at 390px and 1440px with Playwright (0 overflow, 0 console errors).

## Pages (29 routes)

- `/` — Hero, marquee, About teaser with animated counters, Services, Selected Projects, Process, CTA
- `/about` — Story, values, stats, process
- `/services` + `/services/[slug]` — 3 services with deliverables and related work
- `/portfolio` + `/portfolio/[slug]` — 6 projects, category filter, results
- `/blog` + `/blog/[slug]` — 6 articles with JSON-LD `BlogPosting`
- `/contact` — Validated form (client-side confirmation for now, no backend), FAQ accordion
- `/sitemap.xml`, `/robots.txt`, `404` page, skip-to-content link, `ProfessionalService` JSON-LD

## Design

Warm cream `#F7F2EA`, ink `#16130F`, flame orange `#FF5A00`. Archivo (display) + Inter (body) via `next/font/google`. All 9 images are AI-generated into `public/images/` in the same palette. Logo is a hand-drawn SVG (`public/favicon.svg`, `src/components/Logo.tsx`).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (Turbopack)
npm start       # serve the production build
```

## Verify (Playwright harness)

```bash
# from ~/workspace/tools/ff-check (playwright lives there)
node mrl-check.mjs http://127.0.0.1:3100 ~/workspace/mr-l-production/.screenshots
```

## Deploy

Static export (`output: "export"` in `next.config.ts`, `images.unoptimized: true`) so the site deploys to Cloudflare Pages by direct upload — `wrangler pages deploy out/`, like Dus's other sites. GitHub Actions workflow `.github/workflows/deploy.yml` builds and deploys on every push to `main` (needs repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`; the workflow creates the Pages project `mr-l-production` if missing). The public URL in metadata/sitemap is `https://mr-l-production.pages.dev` — update `src/data/site.ts` (`SITE.url`) if the real domain differs.

## Notes / gotchas

- **lucide-react 1.x removed all brand icons** (Twitter, Youtube, Linkedin, Instagram). Social icons in `src/components/Footer.tsx` are inline SVGs.
- **Next.js 16 Cache Components rejects `new Date()` during prerender.** The footer year is a static constant (`SITE.year` in `src/data/site.ts`), not computed at render.
- Contact form has no backend yet — it validates and confirms on screen. Wire it to an email/form service before launch.
- Contact email/phone/socials in `src/data/site.ts` are placeholders — replace with real values before launch.
