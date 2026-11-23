# 07: Hipótese Capital page

**What to build:** A Recrutador can read the Hipótese Capital Estudo de caso in English and Portuguese. It shows the pipeline (yfinance/NewsAPI collection → SQL persistence → gpt-oss-120b via Groq analysis → Streamlit/Plotly dashboard) as a diagram, Diego's two real dashboard screenshots, a sample LLM report, the engineering decisions (SQL for history and reuse, retry with exponential backoff, the queue of scheduled analyses), the technologies used, and a link to the repository.

**Blocked by:** 05: Estudo de caso content model + StockQuoteAlert page

**Status:** done

- [x] The page exists at its route in EN and PT, as a content entry of the ticket 05 schema.
- [x] The pipeline diagram is inline SVG, readable in both themes and at phone width, with a text alternative.
- [x] Both screenshots (metrics view, news-with-sentiment view) are copied into the project, optimized through Astro's image pipeline, and have descriptive alt text.
- [x] The sample LLM report is rendered as text and covers the business assessment, indicator interpretation, news sentiment and follow-up questions.
- [x] The copy is drafted from the hipotese-capital README and screenshots, with no invented metrics or outcomes.
- [x] The repository link points to github.com/DiegoFonseca256/hipotese-capital.
- [x] e2e: the page passes an axe scan at desktop and phone widths.

## Comments

- 2026-11-23: Done on branch `11-shadcn-redesign`.
  - **Model:** the spec said Llama 3, but the README and `LLM.py` use gpt-oss-120b on Groq, and a comment in the code says Groq discontinued Llama 3. The page and the spec now say gpt-oss-120b.
  - **Content:** `src/content/case-studies/{en,pt}/hipotese-capital.yaml`, drafted from the README and the code (`main.py`, `LLM.py`, `database.py`, `dashboard.py`). The schema gained:
    - `feature`: the visual piece after the header, either `alert-rule` or `pipeline`. The page no longer checks the slug.
    - A `report` example kind.
    - An optional `lang` on examples, which sets `lang="pt-BR"` on Portuguese output shown on the EN page.
  - **Diagram:** `src/components/case-study/PipelineDiagram.astro`, inline SVG laid out horizontally from 768px and vertically below. The `aria-label` names the steps in order, and the ordered list below explains each one. The steps appear in order once on load, except under reduced motion.
  - **Screenshots:** copied to `src/assets/case-studies/hipotese-capital/` and served as responsive WebP through `astro:assets`, with an "Open full size" link. The news thumbnails are only part of the dashboard screenshot; none is extracted.
  - **Sample report:** the real PETR4 report from 2026-11-17, read-only from Diego's local `hipotese_capital.db`. It covers the business summary, the indicator analysis, five headlines with the AI's sentiment (3 positive, 2 negative) and three questions. It's unedited, in Portuguese.
  - **Queue of scheduled analyses:** the dashboard's "Agendar Nova Análise" writes to `pendentes.txt`, and the next pipeline run processes it.
  - **Global fix:** links in running text are underlined again, since Tailwind's preflight had removed it. Axe flagged the caption links.
  - **Needs Diego's review:** "What I learned", which isn't in the README; the copy tone; the year (2026, from the repository's creation date).
  - **e2e:** `e2e/case-study.spec.ts` covers:
    - Section order and the repository link.
    - The diagram's text alternative and the step order.
    - Both screenshots load, with their alt text.
    - The report's four parts and their `lang`.
