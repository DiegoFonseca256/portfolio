import { useEffect, useRef } from 'react';
import { watchCursorEffects } from '@/lib/pointer';

/** How far from the cursor (px) a letter starts to react. */
const REACH = 180;
/** At rest: the expanded, heavy setting the headline is designed in. */
const REST = { wdth: 125, wght: 800 };
/** Right under the cursor: condensed and light. Both only make a letter narrower. */
const NEAR = { wdth: 78, wght: 450 };

const setting = (t: number) =>
  `'wdth' ${REST.wdth + (NEAR.wdth - REST.wdth) * t}, 'wght' ${REST.wght + (NEAR.wght - REST.wght) * t}`;

/**
 * The home headline. Letters near the mouse condense and lighten along
 * Archivo's width and weight axes, so the type itself answers the cursor.
 *
 * Every letter sits in a box fixed to its resting width, and the effect only
 * ever narrows a letter, so the lines never reflow. Screen readers get the plain
 * sentence; the per-letter spans are hidden from them.
 */
export default function ReactiveHeadline({ text, id, className }: { text: string; id: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    const letters = Array.from(heading.querySelectorAll<HTMLSpanElement>('[data-letter]'));
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    let detachPointer = () => {};

    const reset = () => {
      cancelAnimationFrame(frame);
      for (const letter of letters) letter.style.fontVariationSettings = '';
    };

    // Pin each letter's box to its resting width, so narrowing it moves nothing else.
    // Transitions are off while measuring, so a letter mid-animation measures at rest.
    const pinWidths = () => {
      for (const letter of letters) {
        letter.style.transition = 'none';
        letter.style.width = '';
      }
      reset();
      const widths = letters.map((letter) => letter.getBoundingClientRect().width);
      letters.forEach((letter, i) => {
        letter.style.width = `${widths[i]}px`;
        letter.style.transition = '';
      });
      schedule();
    };

    const paint = () => {
      frame = 0;
      for (const letter of letters) {
        let t = 0;
        if (pointer) {
          const box = letter.getBoundingClientRect();
          const distance = Math.hypot(box.left + box.width / 2 - pointer.x, box.top + box.height / 2 - pointer.y);
          t = Math.max(0, 1 - distance / REACH);
        }
        // Always an explicit setting with both axes, so the transition can interpolate.
        letter.style.fontVariationSettings = setting(t * t * (3 - 2 * t));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    const stopWatching = watchCursorEffects((allowed) => {
      detachPointer();
      if (!allowed) {
        pointer = null;
        reset();
        // Unpinned, the letters follow the font size again as the window resizes.
        for (const letter of letters) letter.style.width = '';
        detachPointer = () => {};
        return;
      }
      document.fonts.ready.then(pinWidths);
      window.addEventListener('resize', pinWidths);
      document.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      detachPointer = () => {
        window.removeEventListener('resize', pinWidths);
        document.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => {
      stopWatching();
      detachPointer();
      reset();
    };
  }, []);

  const words = text.split(' ');
  return (
    <h1 ref={ref} id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, c) => (
                <span key={c} data-letter className="inline-block text-center transition-[font-variation-settings] duration-150 ease-out">
                  {char}
                </span>
              ))}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </h1>
  );
}
