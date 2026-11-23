# 05: Estudo de caso content model + StockQuoteAlert page

**What to build:** A Recrutador can read the StockQuoteAlert Estudo de caso in English and Portuguese: problem → approach → result → learnings, the technologies used (C#/.NET, brapi API, SMTP), B3 market-hours handling and failure resilience, a realistic console output and alert e-mail example, and a link to the GitHub repository. Estudos de caso are typed content entries, so adding a new one is a content change.

**Blocked by:** 04: Design system and themes

**Status:** done

- [x] A typed content schema for an Estudo de caso covers: title, summary, problem, approach, result, learnings, technologies, repository link, and optional media. Invalid entries fail the build.
- [x] The StockQuoteAlert page exists at its route in EN and PT.
- [x] The copy is drafted from the StockQuoteAlert README, with no invented metrics or outcomes.
- [x] The page includes the console-output and alert-e-mail examples.
- [x] The repository link points to github.com/DiegoFonseca256/StockQuoteAlert.
- [x] The page leaves a clearly marked place for the simulation chart (ticket 06).
- [x] e2e: the page passes an axe scan at desktop and phone widths.

## Comments

- 2026-11-23: Done on branch `11-shadcn-redesign`, built on the shadcn/ui direction from tickets 11 and 12.
  - **Content model:** the schema is in `src/content.config.ts`. Each entry is one YAML file per project per language, at `src/content/case-studies/<locale>/<slug>.yaml`. `src/lib/case-studies.ts` fails the build when a slug is missing from a locale. Both checks were run: a missing PT file and a non-numeric `year` each fail the build.
  - **Route:** `/projects/stockquotealert/` and `/pt/projects/stockquotealert/`.
  - **Components:** shadcn Badge (stack), Card (alert e-mail), Table (alert rule) and Button styles (repository link).
  - **Chart place (ticket 06):** the `[data-simulation]` section in `src/components/case-study/AlertRuleTable.astro`. For now it holds a table: the scripted series from `src/data/alert-demo.ts`, run through `simulateAlerts`, covering every row type of the README decision table. Ticket 06 should put the chart above it and keep the table as the chart's text alternative.
  - **Copy:** drafted from the README. Two parts need Diego's review:
    - **What I learned:** the README has no learnings section. The three points are drawn from design choices it describes.
    - **Year:** 2026 comes from the repository's creation date.
  - **e2e:** `e2e/case-study.spec.ts` covers:
    - Section order.
    - The repository link.
    - The table against the README decision table, in EN and PT.
    - The console and e-mail examples.
    
    Axe and the i18n mirror tests pick up the new routes automatically.
- 2026-11-23: Diego dropped the "How I used AI" section as unnecessary. It is gone from the content, the schema, the page and the tests, and spec story 18 is marked dropped.
