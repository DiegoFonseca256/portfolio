# Diego Fonseca: portfolio

Personal portfolio site. Static, bilingual (English at `/`, Portuguese at `/pt/`), built with [Astro](https://astro.build) and TypeScript.

## Requirements

- Node.js 22 or later

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

The end-to-end suite builds the site and serves it before running, so it always tests what would be deployed.

## Languages

Every page exists in both languages by construction: pages live under `src/pages/[...locale]/` and are generated once per locale.

Interface copy lives in `src/i18n/ui.ts`. English is the reference dictionary; the Portuguese one must define every key, so a missing translation fails `npm run build`.
