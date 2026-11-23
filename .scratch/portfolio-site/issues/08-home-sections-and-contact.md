# 08: Home sections and contact

**What to build:** A Recrutador sees the complete home page in both languages: the Estudo de caso previews (generated from the content entries), the Brasileirão note, the Experiência and education timeline, skills and languages as grouped text, and a contact section with a one-click e-mail, LinkedIn, GitHub and CV download.

**Blocked by:** 05: Estudo de caso content model + StockQuoteAlert page

**Status:** done

- [x] The Estudo de caso previews are generated from the content collection; each shows the problem, the stack and the result at a glance and links to its page.
- [x] The Brasileirão note shows 70.3% accuracy (2014–2019), Random Forest, Logistic Regression and SHAP, is labelled as an academic project (ENG4040) with non-public code, and has no link.
- [x] The timeline covers Empresa Júnior, the DEE PUC-Rio research (PSR funding), PUC-Rio and Leeds, with dates, role and one or two concrete achievements each, as typed data.
- [x] Skills are grouped text (languages, data, tools, concepts) including C#/.NET; there is no logo or icon grid.
- [x] Languages are listed: Portuguese native, English fluent, Spanish intermediate.
- [x] Contact offers a `mailto:` link, LinkedIn (linkedin.com/in/diegogfonseca), GitHub (github.com/DiegoFonseca256) and a CV PDF download.
- [x] On the EN site, the CV download is labelled as being in Portuguese.
- [x] The CV can be swapped by replacing the file alone.
- [x] There is no phone number and no photo.
- [x] e2e: all internal links resolve, external links point to the right profiles and repos, and the CV download returns a PDF.
- [x] e2e: the home page passes an axe scan at desktop and phone widths.

## Comments

- 2026-11-23: Done on branch `11-shadcn-redesign`.
  - **Home order:** headline, then the Estudo de caso previews, the Brasileirão note, Experiência and education, skills and spoken languages, and contact.
  - **Header nav:** links to these sections from every page, from 1024px up.
  - **Previews:** generated from the collection, sorted by a new `order` field. Each shows a new `preview.problem` and `preview.result` (short, in both languages) and the stack, and links to its page. The visual comes from the project itself:
    - StockQuoteAlert: a static mini chart drawn by the alert-zone module.
    - Hipótese Capital: its dashboard screenshot, decorative here.
  - **Typed data:** `src/data/experience.ts`, `brasileirao.ts` and `skills.ts`. Every text is `Localized<…>`, so a missing translation is a type error.
  - **CV:** moved with `git mv` from the root to `public/diego-fonseca-cv.pdf`. Swapping it means replacing that file. The EN label says "PDF, in Portuguese".
  - **Copy button:** now hydrates on idle (`client:idle`). It sits further down the page now, so with `client:visible` it stayed hidden until scrolled to.
  - **Sources and gaps:** everything comes from the CV.
    - Leeds and PUC-Rio have no achievements in the CV, so they show only the programme, plus the expected graduation for PUC-Rio. Diego may want to add something concrete.
    - The CV dates Hipótese Capital to 2025, so its year was corrected from 2026.
    - The CV still says "Llama 3 via Groq". The code uses gpt-oss-120b, so the PDF needs updating.
  - **e2e:** `e2e/links.spec.ts` covers:
    - Every internal link and fragment resolves on every page.
    - External links are limited to the known profiles and repos.
    - The contact links and the CV download attribute.
    - The previews link to both pages.
    - The EN CV label.
    - The CV is served as a real PDF.
    - The Brasileirão note in both number formats, with no link.
    - No photo on the home.
