# 04: Design system and light/dark themes

**What to build:** The site adopts the chosen visual direction as a token system (colour, type scale, spacing) in hand-written CSS. A Recrutador sees the site in their system's light or dark theme, can override it with a toggle that persists, and never sees a flash of the wrong theme on load. Keyboard focus is visible, and non-essential motion is off under reduced motion.

**Blocked by:** 03: Visual identity prototype

**Status:** done

- [x] Colour, typography and spacing come from CSS custom properties; there is no Tailwind or UI kit.
- [x] The theme defaults to the system preference.
- [x] A manual toggle overrides the system preference and persists across reloads; a failure to read storage still renders correctly.
- [x] There is no flash of the wrong theme on first paint.
- [x] Keyboard focus is visible on every interactive element.
- [x] `prefers-reduced-motion` disables non-essential motion.
- [x] e2e: the theme follows the emulated system preference, and the toggle overrides and persists it.
- [x] e2e: the home page passes an axe scan at desktop and phone widths, in both themes.
- [x] There is no horizontal scroll at 360px width.

## Comments

- 2026-11-18: Done on branch `04-design-system-and-themes`.
  - **Tokens:** `src/styles/tokens.css` holds colour, type and spacing; `src/styles/base.css` holds the base styles, focus ring and reduced motion. Each colour is written once with `light-dark()`, and `data-theme` on `<html>` pins `color-scheme` when the toggle is used.
  - **Light theme:** derived from the dark palette. Every text colour is at least 4.5:1 against the background, and the light chart line is `#B67C0B` (3.3:1). Diego can adjust it.
  - **Layout:** `Base.astro` is the Sidebar shell. It holds the identity column (name, role, language switch, theme toggle) and has a named `identity` slot for ticket 08 to add the headline, nav and contact.
  - **Fonts:** self-hosted with Fontsource (Instrument Serif, Instrument Sans, Fragment Mono).
  - **e2e:** `e2e/theme.spec.ts` covers system preference, the toggle and persistence, and blocked storage. `e2e/accessibility.spec.ts` runs axe at 1280px and 360px in both themes on EN and PT, and checks there is no horizontal scroll at 360px.
