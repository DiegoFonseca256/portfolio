/**
 * Effects that follow the mouse run only for a precise pointer that can hover,
 * and never under reduced motion. On touch screens, with a keyboard, or with
 * "reduce motion" on, the page stays still and loses nothing.
 */
export const CURSOR_EFFECTS_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Calls `onChange` now and whenever cursor effects become allowed or not; returns a cleanup. */
export function watchCursorEffects(onChange: (allowed: boolean) => void): () => void {
  const media = matchMedia(CURSOR_EFFECTS_QUERY);
  const listener = () => onChange(media.matches);
  media.addEventListener('change', listener);
  listener();
  return () => media.removeEventListener('change', listener);
}
