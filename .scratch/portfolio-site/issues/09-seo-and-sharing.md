# 09: SEO and sharing

**What to build:** When a Recrutador shares any page link, it shows a proper title, description and preview image in chat or e-mail. Search engines see the EN and PT versions as alternates of each other.

**Blocked by:** 06: Interactive alert simulation chart; 07: Hipótese Capital page; 08: Home sections and contact

**Status:** done

- [x] Every page has its own title and description in each language.
- [x] `hreflang` alternates link every EN page to its PT mirror and back.
- [x] There is an Open Graph and Twitter card image consistent with the visual identity, plus per-page OG metadata.
- [x] A sitemap covering both languages is generated at build.
- [x] e2e: every page has a non-empty title, a description and hreflang alternates that resolve.

## Comments

- 2026-11-23: Done on branch `11-shadcn-redesign`.
  - **Provisional domain:** `site` in `astro.config.mjs` is `https://diego-fonseca.vercel.app`, a placeholder until the Vercel project exists (ticket 10). Canonical URLs, hreflang, Open Graph URLs and the sitemap all derive from it, so changing that one line is enough.
  - **Head (`Base.astro`):** canonical; hreflang `en`, `pt-BR` and `x-default` (the EN page); `og:*` (type `website` for the home, `article` for Estudos de caso; locale and its alternate; the image with its size and alt); and a `summary_large_image` Twitter card.
  - **Titles:** each page has its own title in each language. The home is "Diego Fonseca: software, data and AI" or "…dados e IA". An Estudo de caso is "{title}: case study by Diego Fonseca" or "…: estudo de caso de Diego Fonseca", so EN and PT never share a title.
  - **Preview images:** `public/og-en.png` and `public/og-pt.png`, 1200×630, in the Chart paper style: graph paper, the name, the headline and the alert price line. `npm run og` (`scripts/og-image.ts`, run by Node's type stripping) renders them with Playwright from the copy in `src/i18n/ui.ts`. Re-run it after changing the headline or the palette.
  - **Sitemap:** `@astrojs/sitemap` with i18n, so each URL lists its EN and PT alternates.
  - **e2e:** `e2e/seo.spec.ts` covers:
    - Every page has a title, unique across the site, and a description.
    - hreflang alternates resolve, each page points to itself and its mirror points back, and x-default is the EN page.
    - OG and Twitter metadata match the page, and the image resolves as a PNG.
    - The sitemap lists every built route.
