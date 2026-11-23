# 06: Interactive alert simulation chart

**What to build:** On the StockQuoteAlert page, a Recrutador watches a scripted price series move across the buy and sell bands and sees exactly when an e-mail alert would fire, including when it is suppressed because the price stayed in the same zone. They can play, pause and step through readings, and see the current zone, the last alert held and the e-mail decision at each step. All decisions come from the ticket 02 module.

**Blocked by:** 02: StockQuoteAlert alert-zone logic; 05: Estudo de caso content model + StockQuoteAlert page

**Status:** done

- [x] The chart is a small interactive island; the rest of the page stays static HTML.
- [x] Every decision shown comes from the alert-zone module; there is no duplicated rule logic in the UI.
- [x] The scripted series demonstrates every row type of the README decision table.
- [x] Play, pause and step controls are keyboard-operable and labelled.
- [x] Each reading shows the zone, the last alert and the e-mail decision, also as text for screen readers.
- [x] The chart renders correctly in both themes and at phone width.
- [x] Under reduced motion, the chart starts paused and is driven by step only.
- [x] e2e: with emulated reduced motion, the chart starts paused and stepping advances the reading and updates the displayed state.

## Comments

- 2026-11-23: Done on branch `11-shadcn-redesign`.
  - **Island:** `src/components/case-study/AlertSimulation.tsx`, mounted in `AlertRuleTable.astro` above the table. Every decision comes from `simulateAlerts`. The component only maps the module's `Reading` fields to labels and to the sentence that explains each one.
  - **Series:** `src/data/alert-demo.ts`, six readings that match the README decision table row for row. The table below the chart is the chart's text alternative and what readers without JavaScript see.
  - **Chart:**
    - An SVG with sell and buy zones and dashed reference lines.
    - The price line draws itself segment by segment.
    - A marker shows each e-mail sent, and a crossed-out envelope shows an alert held back because one was already sent.
    - A legend in HTML sits above the chart, so the labels never collide with the markers.
    - Below 560px the chart switches to a narrow viewBox with larger text.
  - **Controls** (shadcn Button and Slider):
    - Play/Pause, previous and next reading.
    - A reading slider that works with arrows, Home and End.
    - Hovering a column with the mouse jumps to that reading.
    - A live region announces the reading after each user action, but not during autoplay.
  - **Motion:** without reduced motion, the chart plays once the first time it's half in view, then stops at the last reading with "Play again". Under reduced motion there is no Play button: the chart starts at reading 1 and moves only when stepped.
  - **Slider:** the registry Slider got a `thumbProps` prop, so its thumb carries an accessible name and `aria-valuetext`. On phones the thumb is 24px, the WCAG 2.2 target size.
  - **e2e:** `e2e/alert-simulation.spec.ts` covers:
    - Under reduced motion: no autoplay, and stepping updates the zone, e-mail and reason, through reading 6.
    - The slider works with the keyboard.
    - The live region announces each step.
    - The PT version steps too.
    - Without reduced motion, it plays and can be paused.
