# Spec: Diego Fonseca portfolio site

Status: ready-for-agent

## Problem Statement

Diego is a Computer Engineering student at PUC-Rio looking for a software development internship. Today all he can show a **Recrutador** is a PDF CV in Portuguese and an uncurated GitHub profile. The PDF doesn't show how he thinks or solves problems. The GitHub mixes course assignments with his serious projects. And typical student portfolios all look like the same AI-generated template: gradient hero, technology logo grid, glass cards, animation on every section. A portfolio like that would make Diego blend into the crowd instead of standing out.

## Solution

A static, bilingual site (English by default, Portuguese mirrored) with its own visual identity, in an editorial + real-data direction. The site presents Diego as someone who applies **software, data and AI to real problems**. Its core is two in-depth **Estudos de caso**, Hipótese Capital and StockQuoteAlert, each with a visual piece built from the project's real logic instead of generic screenshots or illustrations. Around them sit a compact note on the Brasileirão project, a timeline of **Experiência** and education, skills as text, and direct contact (e-mail, LinkedIn, GitHub and CV download). The site is hosted on Vercel (`.vercel.app` subdomain) and its code lives in a public repository, which doubles as a code sample.

## User Stories

1. As a Recrutador, I want to understand in under 10 seconds who Diego is and what he's looking for, so that I can decide whether to keep reading.
2. As a Recrutador, I want the headline to say what kind of work Diego does (software, dados e IA aplicados a problemas reais), so that I can map him to the role I'm hiring for.
3. As a Recrutador, I want to see right below the headline that Diego studies Computer Engineering at PUC-Rio and is looking for a software development internship, so that I know he fits the vacancy.
4. As a Recrutador, I want to reach the two Estudos de caso from the home page without scrolling through filler, so that I see real work quickly.
5. As a Recrutador, I want each Estudo de caso preview on the home page to show the problem, the stack and the result in one glance, so that I can choose which one to open.
6. As a Recrutador, I want a dedicated page for Hipótese Capital, structured as problema → abordagem → resultado → aprendizado, so that I can judge how Diego thinks.
7. As a Recrutador, I want to see the Hipótese Capital pipeline (coleta via yfinance e NewsAPI → persistência SQL → análise por LLM gpt-oss-120b via Groq → dashboard Streamlit/Plotly) as a diagram, so that I understand the architecture without reading code.
8. As a Recrutador, I want to see real screenshots of the Hipótese Capital dashboard (indicadores fundamentalistas, cards de notícias com sentimento classificado pela IA), so that I trust the project actually runs.
9. As a Recrutador, I want to see an example of the report the LLM generates (avaliação do negócio, interpretação dos indicadores, sentimento das notícias, perguntas para investigação), so that I understand what the AI part actually does.
10. As a Recrutador, I want to understand the design choices behind Hipótese Capital (por que SQL para histórico e reuso, por que retry com backoff exponencial na chamada da LLM, a fila de análises agendadas), so that I see engineering judgment, not just tutorials.
11. As a Recrutador, I want a link to the Hipótese Capital repository on GitHub, so that I can read the code.
12. As a Recrutador, I want a dedicated page for StockQuoteAlert, structured as problema → abordagem → resultado → aprendizado, so that I can judge a project in a different language (C#/.NET).
13. As a Recrutador, I want an interactive chart that shows a price moving across the buy and sell bands and marks exactly when an e-mail alert would fire, so that I understand the anti-spam alert rule in seconds.
14. As a Recrutador, I want to be able to play, pause and step through the StockQuoteAlert simulation, so that I can inspect the moments the rule decides to send or not send.
15. As a Recrutador, I want the simulation to show the current zone, the last alert sent and whether an e-mail fires at each reading, so that the state behind the rule is visible.
16. As a Recrutador, I want to see that StockQuoteAlert respects B3 market hours (seg. a sex., 10h às 18h, horário de Brasília) and keeps running through API or e-mail failures, so that I see Diego thinks about real-world operation.
17. As a Recrutador, I want to see a realistic example of the console output and the alert e-mail StockQuoteAlert produces, so that I understand the user experience of the tool.
18. ~~As a Recrutador, I want a short "Como usei IA" section on the StockQuoteAlert page.~~ Dropped by Diego on 2026-11-23: not needed.
19. As a Recrutador, I want a link to the StockQuoteAlert repository on GitHub, so that I can read the code.
20. As a Recrutador, I want to see the Brasileirão project as a compact note with its headline number (70,3% de acurácia prevendo a classificação final, 2014–2019) and techniques (Random Forest, Regressão Logística, SHAP), so that I see ML experience without a broken link.
21. As a Recrutador, I want the Brasileirão note to state clearly that it's an academic project (ENG4040) with non-public code, so that I don't go looking for a repository that doesn't exist.
22. As a Recrutador, I want a timeline of Experiência and formação (Empresa Júnior, pesquisa no DEE PUC-Rio com financiamento PSR, PUC-Rio, intercâmbio em Leeds), so that I understand Diego's trajectory at a glance.
23. As a Recrutador, I want each Experiência entry to show dates, role and one or two concrete achievements, so that I can compare him to other candidates.
24. As a Recrutador, I want the skills listed as grouped text (linguagens, dados, ferramentas, conceitos), including C#/.NET, so that I can check required skills quickly.
25. As a Recrutador, I want each Estudo de caso to list the technologies it used, so that I see skills in context rather than as claims.
26. As a Recrutador, I want Diego's languages (Português nativo, Inglês fluente, Espanhol intermediário) visible, so that I know whether he can work in an international team.
27. As a Recrutador, I want to contact Diego by e-mail in one click, so that I don't have to copy anything.
28. As a Recrutador, I want links to Diego's LinkedIn and GitHub, so that I can check his profiles.
29. As a Recrutador, I want to download Diego's CV as a PDF, so that I can attach it to the hiring process.
30. As a Recrutador reading the English site, I want the CV download to say clearly that the CV is in Portuguese, so that I'm not surprised when I open it.
31. As a Recrutador, I want the site in English by default, so that I can read it regardless of my native language.
32. As a Recrutador who speaks Portuguese, I want to switch to Portuguese and land on the same page I was reading, so that I don't lose my place.
33. As a Recrutador, I want every page available in both languages with the same content, so that neither version feels like a second-class translation.
34. As a Recrutador, I want the site to follow my system's light or dark theme, so that it's comfortable to read.
35. As a Recrutador, I want a toggle to switch themes manually, so that I can override my system setting.
36. As a Recrutador with "reduce motion" enabled, I want all non-essential animation turned off, so that the site doesn't make me uncomfortable.
37. As a Recrutador with "reduce motion" enabled, I want the StockQuoteAlert simulation to still be usable by stepping manually, so that I don't lose the explanation.
38. As a Recrutador on my phone, I want the site to read well at phone width with no horizontal scrolling, so that I can review Diego between meetings.
39. As a Recrutador using a keyboard or screen reader, I want visible focus, semantic headings and text alternatives for the diagrams, charts and screenshots, so that I can navigate and understand everything.
40. As a Recrutador, I want the pages to load almost instantly, so that I don't give up before reading.
41. As a Recrutador sharing a link with a colleague, I want each page to have a proper title, description and social preview, so that the link looks trustworthy in chat or e-mail.
42. As a Recrutador, I want the site to look designed for Diego specifically and not like a generic AI template, so that I remember him.
43. As Diego, I don't want my phone number or a photo of my face on the site, so that I keep my personal data private.
44. As Diego, I want to replace the CV PDF (e.g. with an English version later) without touching code, so that keeping the site current is easy.
45. As Diego, I want all site copy in both languages kept in one predictable place per page, so that I can review and edit the tone myself.
46. As Diego, I want every push to the main branch to deploy automatically to Vercel, so that updating the site takes no manual step.
47. As Diego, I want privacy-friendly analytics without cookies or consent banners, so that I can see whether visits rise after each application.
48. As Diego, I want the site's source code in a public repository with a clear README, so that the portfolio itself works as a code sample.
49. As Diego, I want to add a third Estudo de caso later by following the same structure, so that the site grows with my work.

## Implementation Decisions

- **Stack:** Astro with TypeScript, producing a fully static site, with no backend and no server runtime. Styling is Tailwind CSS v4 with shadcn/ui components (React, server-rendered to static HTML; JavaScript ships only for interactive islands). The theme is custom, so the site does not wear the default shadcn look.
- **Visual direction:** editorial base (strong typography, generous whitespace, numbers from the real projects as the featured element) plus data visualizations built from the projects' real logic. The typeface pairing, palette and layout came out of a UI prototype: the "Chart paper" direction (see Further Notes), which replaced the earlier "Sidebar" prototype. Avoid the generic AI tells: gradient heroes, logo grids, identical rounded cards, scroll-triggered fade-ins on every section, one accented word in the headline, all-caps eyebrows.
- **Information architecture:**
  - Home: headline → the two Estudo de caso previews → Brasileirão note → Experiência and formação timeline → skills and languages → contact and CV download.
  - One page per Estudo de caso: Hipótese Capital and StockQuoteAlert.
  - No separate About or Contact pages.
- **Internationalization:** English at the root and Portuguese under `/pt/`, mirroring every route, using Astro's built-in i18n routing. The language switch keeps the visitor on the equivalent page. Each piece of copy exists in both languages; a missing translation is a build-time error, not a silent fallback.
- **Content model:** Estudos de caso live as content entries (one per project per language) with a typed schema: title, summary, problem, approach, result, learnings, technologies, repository link, and optional media. Experiência entries and the Brasileirão note are structured data, also typed. This makes adding a third Estudo de caso a content change, not a code change.
- **Alert-zone simulation (StockQuoteAlert):** a pure, framework-free logic module, separate from the chart rendering, that mirrors the real project's rule. Its interface takes a sell reference price, a buy reference price and a sequence of price readings, and returns, per reading, the zone (below / inside / above the band), the last alert held, and whether an e-mail fires (and which kind: compra or venda). The rule:
  - An alert fires only when the price **enters** a zone outside the band.
  - Staying in the same zone fires nothing.
  - Returning inside the band clears the held alert.
  - Crossing directly from one side to the other fires the opposite alert.
  - The behaviour must match the decision table in the StockQuoteAlert README:

    | Reading | Zone   | Last alert | E-mail?    |
    |---------|--------|------------|------------|
    | 1       | inside | —          | no         |
    | 2       | above  | —          | yes (sell) |
    | 3       | above  | sell       | no         |
    | 4       | inside | sell       | no (clears)|
    | 5       | above  | —          | yes (sell) |
    | 6       | below  | sell       | yes (buy)  |

  The chart component (a small interactive island) consumes this module, animates a scripted price series across the bands, and offers play, pause and step controls. With reduced motion, it starts paused and is driven by step only.
- **Hipótese Capital visuals:**
  - A static, accessible pipeline diagram: yfinance/NewsAPI → SQL (SQLite) → gpt-oss-120b via Groq → Streamlit dashboard, drawn as inline SVG that adapts to both themes.
  - Diego's two real dashboard screenshots, optimized through Astro's image pipeline with descriptive alt text.
  - A sample LLM report rendered as text.
- **Theming:** light and dark themes via CSS custom properties, defaulting to the system preference, with a persistent manual toggle. No flash of the wrong theme on load.
- **Motion:** only where it explains something (the alert simulation, the pipeline diagram reveal, the theme change). Motion that answers the cursor is also allowed (the headline and the graph-paper grid, ticket 12), only for a precise pointer that can hover. No scroll-triggered section animations. Everything non-essential is disabled under `prefers-reduced-motion`.
- **Contact and privacy:**
  - Shown: an e-mail `mailto:` link, LinkedIn (linkedin.com/in/diegogfonseca), GitHub (github.com/DiegoFonseca256) and a CV PDF download.
  - Not shown: phone number and photo.
  - The CV is a static asset that can be swapped by replacing the file. On the English site it's labelled as being in Portuguese.
- **Skills content:** grouped text lists, with C#/.NET added to what the CV lists, because StockQuoteAlert uses it. No logo or icon grid.
- **SEO and sharing:** per-page title and description in each language, `hreflang` alternates between EN and PT, an Open Graph image, a sitemap.
- **Hosting:** Vercel on a `.vercel.app` subdomain, deployed automatically from a public GitHub repository named `portfolio`. Vercel Web Analytics is on (cookieless). Diego creates the GitHub repository and connects Vercel himself, since both use his accounts.
- **Repository:** git initialized in the project folder. The README describes the stack, how to run it locally and how to add an Estudo de caso.

## Testing Decisions

- **What a good test is:** it exercises behaviour that a Recrutador or Diego can observe (rendered pages, links, toggles, downloads, the simulation's decisions) and never internal structure (component names, CSS classes, internal state shape). A test should survive a full visual redesign as long as the behaviour is unchanged.
- **Seam 1: end-to-end tests on the built site.** Playwright runs against the production build served locally. It checks:
  - Every EN route has a PT mirror and vice versa, and the language switch lands on the equivalent page.
  - Every internal link resolves and the external links (GitHub repos, LinkedIn) point to the right places.
  - The CV download returns a PDF.
  - The theme follows the emulated system preference and the toggle overrides and persists it.
  - Under emulated reduced motion, the simulation starts paused and can be stepped.
  - The phone number appears nowhere in the built output.
  - Pages pass an automated accessibility scan (axe) at desktop and phone widths.
- **Seam 2: unit tests for the alert-zone module.** Run with Vitest against the pure logic module. They check:
  - The six-reading README decision table, as the primary fixture.
  - Edge cases: a price exactly equal to a reference price counts as inside the band, consistent with the real project's "está dentro do intervalo"; an empty series; a series that starts outside the band; repeated direct crossings above → below → above.
- **Prior art:** none in this repo, since it's a fresh project. The README decision table from the StockQuoteAlert repository is the reference fixture for seam 2.
- **Not tested automatically:** visual design quality, copy tone and translation quality. Diego reviews these manually.

## Out of Scope

- Any backend: contact form, CMS, blog, admin panel, database.
- A "chat with my CV" LLM chatbot.
- A custom domain (the site may move to one later; nothing in this spec should prevent that).
- An English version of the CV PDF (Diego provides it later; the site only needs to swap the file).
- A photo of Diego and his phone number.
- Case-study pages for other repositories (FinTrack, databricks-medallion-pipeline, deploy-credito, etc.).
- A link or page for the Brasileirão project beyond the compact note.
- Live data in the visualizations (no calls to brapi, yfinance or any API at runtime; the simulation uses a scripted series).
- Creating the GitHub repository and connecting Vercel (Diego does both with his accounts).

## Further Notes

- **Live URL:** https://diegofonseca.vercel.app, from the public repository github.com/DiegoFonseca256/portfolio. Recorded on 2026-11-23, in ticket 10.
- **Decided: visual identity is "Chart paper", built on shadcn/ui, chosen by Diego on 2026-11-23.** It replaces the "Sidebar" direction (prototype C2, chosen on 2026-11-18). The Sidebar prototype is still on the `prototype/visual-identity` branch. Diego asked to rebuild the site with shadcn/ui and to start the visual direction from scratch rather than reskin Sidebar. Ticket 11 did the migration.
  - **Stack consequence:** styling is Tailwind CSS v4 with the shadcn/ui theme variables in `src/styles/global.css`. Components come from the shadcn/ui v4 registry into `src/components/ui/`. They're React, rendered to static HTML unless an island needs JavaScript.
  - **Palette (light / dark):**
    - Paper background `#EDF1EC` / `#0D1A17`, pine ink `#10241F` / `#E3ECE7`, muted `#4F625C` / `#93A69F`.
    - Cobalt `#2347C6` / `#9DB2FF` for links and the focus ring.
    - Sell red `#B42318` / `#F0716B` and buy green `#13724A` / `#4CC98E`, used only in data.
  - **Type:** one family, Archivo, self-hosted with its width axis. The headline and the wordmark are set expanded (width 125) and heavy. Everything else is at normal width.
  - **Layout:**
    - A sticky header holds the name (as the home link), the language switch and the theme toggle. It has a `header` slot for section nav.
    - A single left-aligned content column, up to 64rem (`max-w-5xl`).
    - The home opens on the expanded headline. That headline is the one bold element on the page, and everything around it stays quiet.
  - **Still applies from the prototype:** phones get a narrower chart viewBox so its labels stay readable.
- **Source assets:**
  - Diego's CV PDF, served at `/diego-fonseca-cv.pdf` from `public/`. It was moved there from the project root in ticket 08.
  - Two screenshots of the Hipótese Capital Streamlit dashboard (metrics page and news-with-sentiment page), saved in Diego's Windows screenshots folder as `HipoteseCapital.png` and `HipoteseCapital2.png`. Copy them into the project.
  - The two repositories' READMEs (github.com/DiegoFonseca256/hipotese-capital and github.com/DiegoFonseca256/StockQuoteAlert) are the factual source for the Estudos de caso.
- **Hipótese Capital model:** the project uses gpt-oss-120b on Groq, not Llama 3. The README, the code (`LLM.py`) and a comment there say Groq discontinued Llama 3. Corrected on 2026-11-23, during ticket 07.
- **Hipótese Capital sample report:** the report on the page is the real PETR4 report from the run of 2026-11-17, the same run as the screenshots. It was read from Diego's local `hipotese_capital.db` and is shown unedited, in Portuguese.
- **Third-party images:** the second Hipótese Capital screenshot shows news thumbnails from third-party outlets (InfoMoney, Suno). This is acceptable as a screenshot of the tool. Don't extract or reuse those images on their own.
- **Copy:** the agent drafts all copy in both languages from the CV and the READMEs. Diego reviews the tone before launch. Keep the vocabulary consistent with `GLOSSARY.md` (Recrutador, Estudo de caso, Experiência).
- **Accuracy:** do not invent metrics, users or outcomes the sources don't state. Where a result is qualitative, say so plainly.
