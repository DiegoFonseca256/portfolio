# 10: Launch

**What to build:** The site is live on a `.vercel.app` subdomain, deployed automatically from the public `portfolio` GitHub repository, with cookieless analytics, a full green test run, and copy Diego has reviewed.

**Blocked by:** 09: SEO and sharing

**Status:** ready-for-human

- [x] Vercel Web Analytics is enabled, with no cookies and no consent banner.
- [x] The README is final: the stack, running locally, testing, and how to add a new Estudo de caso.
- [x] The full e2e suite and the axe scans pass at desktop and phone widths, in both themes and both languages.
- [ ] Diego reviews the tone of all copy in EN and PT, and his changes are applied. This criterion needs Diego.
- [ ] Diego creates the public `portfolio` GitHub repository and connects it to Vercel, guided step by step; pushing to main deploys automatically. This criterion needs Diego.
- [ ] The live URL is recorded in the spec.

## Comments

- 2026-11-23: The agent's part is done on branch `11-shadcn-redesign`. What's left needs Diego.
  - **Analytics:** `@vercel/analytics` (`<Analytics />` in `Base.astro`). It's cookieless, so there's no banner. It only reports once **Analytics is enabled in the Vercel project** (Diego, step 5 below).
  - **README:** rewritten as final: stack, running locally, testing, where things live, adding an Estudo de caso, updating the CV, adding a component, deploy.
  - **`package.json`:** `engines.node >=22`, which Vercel uses to pick the Node version.
  - **Test run:** 6 unit tests and 52 e2e tests pass against the production build. The e2e run includes axe at 1280px and 360px, in both themes and both languages.
  - **Still to do (Diego):**
    1. Approve committing the work and merging it to `main`. Nothing is committed yet, at Diego's request.
    2. Create the public `portfolio` repository on GitHub.
    3. Push `main`.
    4. Import the repository on Vercel.
    5. Enable Analytics on Vercel.
    6. Send the live URL, so `site` in `astro.config.mjs` and the spec can be updated.
    7. Review the copy in EN and PT.
