# 03: Visual identity prototype

**What to build:** Diego can flip between 2–3 structurally different variants of the home page (different layout, hierarchy, typography pairing and palette, not just recolours) on one route, switchable via `?variant=` and a floating bottom bar, and pick the visual direction for the site. The direction stays within the agreed brief (editorial base + real-project data as the featured element) and avoids the generic AI tells listed in the spec.

**Blocked by:** 01: Walking skeleton

**Status:** ready-for-agent

- [ ] 2–3 variants render the real home content (headline, Estudo de caso previews, Experiência, contact) on a single prototype route, clearly named as a prototype.
- [ ] A floating bar with ← / → buttons and arrow-key support cycles variants and updates `?variant=` so a variant is reload-stable and shareable.
- [ ] Arrow keys are not intercepted while an input, textarea or contenteditable is focused.
- [ ] The switcher is excluded from production builds.
- [ ] Each variant shows its name in the switcher label.
- [ ] Diego picks a variant (or a combination); the winner and the reasons are recorded in the spec's Further Notes. This criterion needs Diego.
- [ ] The full prototype is committed to a throwaway branch; main keeps only the recorded decision.
