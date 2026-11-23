# Diego Fonseca: portfolio

My portfolio site: a static, bilingual site (English at `/`, Portuguese at `/pt/`) that presents my work through two in-depth case studies, Hipótese Capital and StockQuoteAlert. Each one is built around a visual piece made from the project's real logic. The repository doubles as a code sample.

## Stack

- **[Astro](https://astro.build)** and TypeScript, built to a fully static site. There's no backend.
- **[Tailwind CSS](https://tailwindcss.com) v4** with **[shadcn/ui](https://ui.shadcn.com)** components and a custom theme. The components are React; Astro renders them to static HTML, and only interactive islands ship JavaScript: the theme toggle, the cursor-driven headline, the copy-e-mail button and the alert simulation.
- **Content:** typed content collections for the case studies and typed data for the rest of the home, each in both languages.
- **Tests:** [Vitest](https://vitest.dev) for the alert-rule logic, and [Playwright](https://playwright.dev) with [axe](https://github.com/dequelabs/axe-core) for the built site.
- **Hosting:** [Vercel](https://vercel.com), with cookieless Vercel Web Analytics.

## Requirements

- Node.js 22 or later.

## Run it

```sh
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # type-check, then build the static site into dist/
npm run preview    # serve the production build
```

## Test it

```sh
npm test                        # unit tests (Vitest)
npx playwright install chromium # once, to get the test browser
npm run test:e2e                # end-to-end tests against the production build
```

The end-to-end suite builds the site and serves it before running, so it always tests what would be deployed. Stop `npm run dev` first: Playwright reuses whatever answers on port 4321. The suite covers:

- **Both languages:** every page has a mirror, and the language switch lands on the equivalent page.
- **Theme:** the system theme is followed, and the toggle overrides it and persists.
- **Accessibility:** axe scans at desktop and phone widths, in both themes, plus no horizontal scroll at 360px.
- **Interactions:** the cursor headline, the copy button and the alert simulation, with and without reduced motion.
- **Links:** internal links and fragments resolve, and external links go only to known profiles and repos.
- **CV:** the download is a real PDF.
- **SEO:** titles, descriptions, hreflang, Open Graph and the sitemap.
- **Privacy:** the phone number appears nowhere in the built site.

## Where things live

| What | Where |
|---|---|
| Pages | `src/pages/[...locale]/`, generated once per locale |
| Interface copy, EN and PT | `src/i18n/ui.ts` |
| Case studies | `src/content/case-studies/<locale>/<slug>.yaml`, schema in `src/content.config.ts` |
| Experiência, Brasileirão note, skills | `src/data/` |
| Alert rule (StockQuoteAlert) | `src/lib/alert-zones.ts`, with unit tests beside it |
| Theme: colours, font, radius | `src/styles/global.css` |
| shadcn/ui components | `src/components/ui/` |
| CV | `public/diego-fonseca-cv.pdf` |
| Link-preview images | `public/og-en.png`, `public/og-pt.png` |

English is the reference everywhere. Every Portuguese string and every localized data field must exist, so a missing translation fails `npm run build`.

## Add an Estudo de caso

1. Create `src/content/case-studies/en/<slug>.yaml` and `src/content/case-studies/pt/<slug>.yaml`, following one of the existing entries. The schema in `src/content.config.ts` lists every field and which are optional:
   - `order` and `preview` control the home preview.
   - `feature` picks the visual piece after the page header.
   - Inline `code` in backticks is rendered as code.
2. Put any screenshots in `src/assets/case-studies/<slug>/` and reference them from `media`. They're optimized at build time.
3. Run `npm run build`. A missing language version, or a field that doesn't match the schema, fails the build with the reason.

The page appears at `/projects/<slug>/` and `/pt/projects/<slug>/`, and its preview joins the home.

## Update the CV

Replace `public/diego-fonseca-cv.pdf` with the new file, keeping the name. Nothing else changes. The English site labels the CV as being in Portuguese (`contact.cv` in `src/i18n/ui.ts`), so update that label if the new CV is in English.

## Add a component

```sh
npx shadcn@latest add <component>
```

`components.json` points the CLI at `src/components/ui/` and the theme in `src/styles/global.css`.

## Deploy

The site is live at **https://diegofonseca.vercel.app**. Vercel builds and deploys every push to `main`, detecting the Astro project on its own. There's no Vercel configuration file.

- **Site address:** `site` in `astro.config.mjs`. Canonical links, hreflang, Open Graph tags and the sitemap all derive from it, so update it if the address changes.
- **Analytics:** Vercel Web Analytics, enabled in the project's Analytics tab on Vercel. It sets no cookies, so the site needs no consent banner.
- **Link-preview images:** regenerate them with `npm run og` after changing the home headline or the palette, then commit the PNGs.
