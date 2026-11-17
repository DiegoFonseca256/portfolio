# 08: Home sections and contact

**What to build:** A Recrutador sees the complete home page in both languages: the Estudo de caso previews (generated from the content entries), the Brasileirão note, the Experiência and education timeline, skills and languages as grouped text, and a contact section with a one-click e-mail, LinkedIn, GitHub and CV download.

**Blocked by:** 05: Estudo de caso content model + StockQuoteAlert page

**Status:** ready-for-agent

- [ ] The Estudo de caso previews are generated from the content collection; each shows the problem, the stack and the result at a glance and links to its page.
- [ ] The Brasileirão note shows 70.3% accuracy (2014–2019), Random Forest, Logistic Regression and SHAP, is labelled as an academic project (ENG4040) with non-public code, and has no link.
- [ ] The timeline covers Empresa Júnior, the DEE PUC-Rio research (PSR funding), PUC-Rio and Leeds, with dates, role and one or two concrete achievements each, as typed data.
- [ ] Skills are grouped text (languages, data, tools, concepts) including C#/.NET; there is no logo or icon grid.
- [ ] Languages are listed: Portuguese native, English fluent, Spanish intermediate.
- [ ] Contact offers a `mailto:` link, LinkedIn (linkedin.com/in/diegogfonseca), GitHub (github.com/DiegoFonseca256) and a CV PDF download.
- [ ] On the EN site, the CV download is labelled as being in Portuguese.
- [ ] The CV can be swapped by replacing the file alone.
- [ ] There is no phone number and no photo.
- [ ] e2e: all internal links resolve, external links point to the right profiles and repos, and the CV download returns a PDF.
- [ ] e2e: the home page passes an axe scan at desktop and phone widths.
