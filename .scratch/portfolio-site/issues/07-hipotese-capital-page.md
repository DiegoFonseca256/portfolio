# 07: Hipótese Capital page

**What to build:** A Recrutador can read the Hipótese Capital Estudo de caso in English and Portuguese. It shows the pipeline (yfinance/NewsAPI collection → SQL persistence → Llama 3 via Groq analysis → Streamlit/Plotly dashboard) as a diagram, Diego's two real dashboard screenshots, a sample LLM report, the engineering decisions (SQL for history and reuse, retry with exponential backoff, the queue of scheduled analyses), the technologies used, and a link to the repository.

**Blocked by:** 05: Estudo de caso content model + StockQuoteAlert page

**Status:** ready-for-agent

- [ ] The page exists at its route in EN and PT, as a content entry of the ticket 05 schema.
- [ ] The pipeline diagram is inline SVG, readable in both themes and at phone width, with a text alternative.
- [ ] Both screenshots (metrics view, news-with-sentiment view) are copied into the project, optimized through Astro's image pipeline, and have descriptive alt text.
- [ ] The sample LLM report is rendered as text and covers the business assessment, indicator interpretation, news sentiment and follow-up questions.
- [ ] The copy is drafted from the hipotese-capital README and screenshots, with no invented metrics or outcomes.
- [ ] The repository link points to github.com/DiegoFonseca256/hipotese-capital.
- [ ] e2e: the page passes an axe scan at desktop and phone widths.
