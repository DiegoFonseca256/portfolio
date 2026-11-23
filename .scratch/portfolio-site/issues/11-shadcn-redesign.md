# 11: Rebuild the design system on shadcn/ui

**What to build:** The site moves from hand-written CSS tokens to Tailwind CSS v4 and shadcn/ui, with a new visual direction started from scratch ("Chart paper", see the spec's Further Notes). It replaces the Sidebar shell from ticket 04. Everything a Recrutador could observe in ticket 04 still holds: system theme, a toggle that persists, no flash of the wrong theme, visible focus, reduced motion, and no horizontal scroll at 360px.

**Blocked by:** 04: Design system and light/dark themes

**Status:** done

- [x] Tailwind v4 and the React integration are set up in Astro. `components.json` is configured so `npx shadcn add <component>` drops components into `src/components/ui/`.
- [x] The shadcn theme variables carry the new palette in light and dark, with each colour written once with `light-dark()`.
- [x] shadcn's `dark:` variant follows the same rule as the theme: an explicit `data-theme` wins, otherwise the system preference.
- [x] The theme toggle is the shadcn Toggle, as a React island. It stays hidden until it hydrates, so it can't be pressed before it works.
- [x] The language switch and the contact links use the shadcn button styles on plain links, so they ship no JavaScript.
- [x] The existing e2e suite passes unchanged: theme, i18n, axe at 1280px and 360px in both themes, no horizontal scroll, and privacy.

## Comments

- 2026-11-23: Done on branch `11-shadcn-redesign`.
  - **Components:** Button, Toggle and Separator, taken from the shadcn/ui v4 registry.
  - **Fonts:** Instrument Serif, Instrument Sans and Fragment Mono are replaced by Archivo with its width axis.
  - **Copy:** the `identity.role` line became `home.location`.
  - **Layout:** the Sidebar `identity` slot is now a `header` slot in `Base.astro`. Ticket 08 should put its section nav there.
