# 04: Design system and light/dark themes

**What to build:** The site adopts the chosen visual direction as a token system (colour, type scale, spacing) in hand-written CSS. A Recrutador sees the site in their system's light or dark theme, can override it with a toggle that persists, and never sees a flash of the wrong theme on load. Keyboard focus is visible, and non-essential motion is off under reduced motion.

**Blocked by:** 03: Visual identity prototype

**Status:** ready-for-agent

- [ ] Colour, typography and spacing come from CSS custom properties; there is no Tailwind or UI kit.
- [ ] The theme defaults to the system preference.
- [ ] A manual toggle overrides the system preference and persists across reloads; a failure to read storage still renders correctly.
- [ ] There is no flash of the wrong theme on first paint.
- [ ] Keyboard focus is visible on every interactive element.
- [ ] `prefers-reduced-motion` disables non-essential motion.
- [ ] e2e: the theme follows the emulated system preference, and the toggle overrides and persists it.
- [ ] e2e: the home page passes an axe scan at desktop and phone widths, in both themes.
- [ ] There is no horizontal scroll at 360px width.
