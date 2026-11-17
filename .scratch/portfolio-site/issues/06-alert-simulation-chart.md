# 06: Interactive alert simulation chart

**What to build:** On the StockQuoteAlert page, a Recrutador watches a scripted price series move across the buy and sell bands and sees exactly when an e-mail alert would fire, including when it is suppressed because the price stayed in the same zone. They can play, pause and step through readings, and see the current zone, the last alert held and the e-mail decision at each step. All decisions come from the ticket 02 module.

**Blocked by:** 02: StockQuoteAlert alert-zone logic; 05: Estudo de caso content model + StockQuoteAlert page

**Status:** ready-for-agent

- [ ] The chart is a small interactive island; the rest of the page stays static HTML.
- [ ] Every decision shown comes from the alert-zone module; there is no duplicated rule logic in the UI.
- [ ] The scripted series demonstrates every row type of the README decision table.
- [ ] Play, pause and step controls are keyboard-operable and labelled.
- [ ] Each reading shows the zone, the last alert and the e-mail decision, also as text for screen readers.
- [ ] The chart renders correctly in both themes and at phone width.
- [ ] Under reduced motion, the chart starts paused and is driven by step only.
- [ ] e2e: with emulated reduced motion, the chart starts paused and stepping advances the reading and updates the displayed state.
