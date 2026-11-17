# 05: Estudo de caso content model + StockQuoteAlert page

**What to build:** A Recrutador can read the StockQuoteAlert Estudo de caso in English and Portuguese: problem → approach → result → learnings, the technologies used (C#/.NET, brapi API, SMTP), B3 market-hours handling and failure resilience, a realistic console output and alert e-mail example, a short "How I used AI" section, and a link to the GitHub repository. Estudos de caso are typed content entries, so adding a new one is a content change.

**Blocked by:** 04: Design system and themes

**Status:** ready-for-agent

- [ ] A typed content schema for an Estudo de caso covers: title, summary, problem, approach, result, learnings, technologies, repository link, optional media and an optional AI-usage section. Invalid entries fail the build.
- [ ] The StockQuoteAlert page exists at its route in EN and PT.
- [ ] The copy is drafted from the StockQuoteAlert README, with no invented metrics or outcomes.
- [ ] The page includes the console-output and alert-e-mail examples.
- [ ] The "How I used AI" section reflects the README's AI-usage section.
- [ ] The repository link points to github.com/DiegoFonseca256/StockQuoteAlert.
- [ ] The page leaves a clearly marked place for the simulation chart (ticket 06).
- [ ] e2e: the page passes an axe scan at desktop and phone widths.
