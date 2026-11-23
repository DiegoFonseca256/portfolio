# 12: Cursor-driven interactions on the home

**What to build:** With a mouse, the home answers the cursor. The headline's letters condense and lighten near it, and graph-paper rules show in a soft circle around it. A Recrutador can also copy Diego's e-mail address in one click. Nothing follows the mouse on touch screens or under reduced motion, and nothing is lost there.

**Blocked by:** 11: Rebuild the design system on shadcn/ui

**Status:** done

- [x] Headline letters near the mouse move along Archivo's width and weight axes. Each letter sits in a box fixed to its resting width, so the lines never reflow.
- [x] Screen readers read the headline as one plain sentence.
- [x] Graph-paper rules (minor every 24px, major every 120px) show only around the cursor, behind the content, and ignore the pointer.
- [x] Cursor effects run only for `(hover: hover) and (pointer: fine)` with no reduced-motion preference (`src/lib/pointer.ts`).
- [x] A copy button next to the e-mail link uses the shadcn Button and Tooltip. A tooltip and a live region say whether the copy worked, and if the clipboard refuses, the address is shown instead.
- [x] e2e (`e2e/interactions.spec.ts`):
  - The headline has the right accessible name.
  - It changes under the mouse without reflowing.
  - It stays still under reduced motion.
  - The copy button puts the address on the clipboard in EN and PT.

## Comments

- 2026-11-23: Diego asked for more interactive, cursor-driven components before ticket 05. The spec's Motion decision now allows motion that answers the cursor.
  - **Tuning:** the strength of the headline effect is set by `REACH` and `NEAR` in `src/components/ReactiveHeadline.tsx`.
  - **Grid:** the grid's colours and sizes are at the top of `src/components/CursorGrid.astro`.
