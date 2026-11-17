# 01: Walking skeleton: Astro, i18n and e2e harness

**What to build:** A Recrutador can open a minimal home page in English at the root and in Portuguese under `/pt/`, showing the headline ("software, data and AI applied to real problems"), the PUC-Rio / internship context line, and contact links (e-mail, LinkedIn, GitHub). The language switch lands on the equivalent page. Diego can run the site locally with one command, and an end-to-end test harness runs against the production build.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Git is initialized in the project folder with a sensible `.gitignore`.
- [ ] The Astro + TypeScript project builds to fully static output with no server runtime.
- [ ] English is served at the root and Portuguese at `/pt/` through Astro's built-in i18n routing.
- [ ] The language switch on any page navigates to the same page in the other language.
- [ ] A missing translation key or page fails the build instead of falling back silently.
- [ ] Playwright runs against the production build served locally.
- [ ] An e2e test checks that every EN route has a PT mirror and vice versa.
- [ ] An e2e test checks that Diego's phone number appears nowhere in the built output.
- [ ] The README explains how to install, run, build and test.
