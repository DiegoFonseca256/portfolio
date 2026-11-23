import { useEffect, useMemo, useRef, useState } from 'react';
import { Mail, MailX, Pause, Play, RotateCcw, StepBack, StepForward } from 'lucide-react';
import { simulateAlerts, type Reading, type Simulation } from '@/lib/alert-zones';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import type { UiKey } from '@/i18n/ui';

/** The interface strings this island needs; the page passes them in its locale. */
export const SIM_KEYS = [
  'sim.description',
  'sim.controls',
  'sim.play',
  'sim.pause',
  'sim.replay',
  'sim.previous',
  'sim.next',
  'sim.readingOf',
  'sim.slider',
  'sim.sellLine',
  'sim.buyLine',
  'sim.legendSent',
  'sim.legendHeld',
  'rule.price',
  'rule.zone',
  'rule.lastAlert',
  'rule.email',
  'rule.none',
  'zone.below',
  'zone.inside',
  'zone.above',
  'alert.buy',
  'alert.sell',
  'email.none',
  'email.buy',
  'email.sell',
  'reason.sent.sell',
  'reason.sent.buy',
  'reason.crossed.buy',
  'reason.crossed.sell',
  'reason.held.sell',
  'reason.held.buy',
  'reason.cleared',
  'reason.inside',
] as const satisfies readonly UiKey[];
export type SimLabels = Record<(typeof SIM_KEYS)[number], string>;

/** Time between readings while playing. */
const STEP_MS = 1500;
/** Below this container width the chart switches to its narrow viewBox, so labels stay readable. */
const NARROW_BELOW = 560;
const SIZE = { wide: { w: 720, h: 320, pad: 44 }, narrow: { w: 360, h: 300, pad: 26 } };
const MARGIN = { top: 16, right: 12, bottom: 36, left: 12 };

/** Why this reading did or didn't send an e-mail, read off the rule module's output. */
function reasonKey(r: Reading): (typeof SIM_KEYS)[number] {
  if (r.email && r.lastAlert && r.lastAlert !== r.email) return `reason.crossed.${r.email}`;
  if (r.email) return `reason.sent.${r.email}`;
  if (r.zone !== 'inside' && r.lastAlert) return `reason.held.${r.lastAlert}`;
  return r.lastAlert ? 'reason.cleared' : 'reason.inside';
}

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

interface Props {
  simulation: Simulation;
  labels: SimLabels;
  /** BCP 47 tag for number formatting. */
  lang: string;
}

/**
 * StockQuoteAlert's alert rule, animated: a scripted price series moves across
 * the sell and buy references, and each reading shows its zone, the alert held
 * before it and whether an e-mail goes out. Every decision comes from
 * `simulateAlerts`; this component only draws it.
 *
 * Without JavaScript it shows the whole series. Once interactive it starts at
 * the first reading and plays when scrolled into view, except under reduced
 * motion, where it stays paused and moves only when stepped.
 */
export default function AlertSimulation({ simulation, labels, lang }: Props) {
  const readings = useMemo(() => simulateAlerts(simulation), [simulation]);
  const last = readings.length - 1;
  const price = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'BRL' }), [lang]);

  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [interactive, setInteractive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [index, setIndex] = useState(last);
  const [playing, setPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) setPlaying(false);
    };
    syncMotion();
    motion.addEventListener('change', syncMotion);
    setIndex(0);
    setInteractive(true);

    const element = root.current!;
    const resize = new ResizeObserver(([entry]) => setNarrow(entry!.contentRect.width < NARROW_BELOW));
    resize.observe(element);
    // Play once, the first time the chart is mostly in view.
    const view = new IntersectionObserver(
      ([entry]) => {
        if (!entry!.isIntersecting || started.current || motion.matches) return;
        started.current = true;
        setPlaying(true);
      },
      { threshold: 0.5 },
    );
    view.observe(element);
    return () => {
      motion.removeEventListener('change', syncMotion);
      resize.disconnect();
      view.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setIndex((i) => Math.min(i + 1, last)), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, last]);

  const current = readings[index]!;
  const readingOf = fill(labels['sim.readingOf'], { n: index + 1, total: readings.length });
  const emailText = current.email ? labels[`email.${current.email}`] : labels['email.none'];
  const reason = labels[reasonKey(current)];

  /** Moves to a reading because the Recrutador asked to: stops playback and announces it. */
  const goTo = (next: number) => {
    const i = Math.max(0, Math.min(last, next));
    const r = readings[i]!;
    started.current = true;
    setPlaying(false);
    setIndex(i);
    setAnnouncement(
      [
        fill(labels['sim.readingOf'], { n: i + 1, total: readings.length }),
        price.format(r.price),
        labels[`zone.${r.zone}`],
        `${labels['rule.email']}: ${r.email ? labels[`email.${r.email}`] : labels['email.none']}`,
        labels[reasonKey(r)],
      ].join('. '),
    );
  };

  const togglePlay = () => {
    started.current = true;
    if (playing) return setPlaying(false);
    if (index >= last) setIndex(0);
    setPlaying(true);
  };

  // Geometry.
  const { w, h, pad } = narrow ? SIZE.narrow : SIZE.wide;
  const innerW = w - MARGIN.left - MARGIN.right;
  const innerH = h - MARGIN.top - MARGIN.bottom;
  const prices = readings.map((r) => r.price);
  const hi = Math.max(...prices, simulation.sellAbove) + 1.6;
  const lo = Math.min(...prices, simulation.buyBelow) - 2;
  const x = (i: number) => MARGIN.left + pad + (i * (innerW - 2 * pad)) / Math.max(1, last);
  const y = (p: number) => MARGIN.top + ((hi - p) / (hi - lo)) * innerH;
  const ySell = y(simulation.sellAbove);
  const yBuy = y(simulation.buyBelow);
  const bottom = MARGIN.top + innerH;
  const column = (innerW - 2 * pad) / Math.max(1, last);
  const labelText = narrow ? 'text-[14px]' : 'text-[12px]';

  return (
    <div ref={root} className="mt-8">
      <div className="rounded-lg border bg-card p-2 sm:p-4">
        <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5 px-2 pt-1 text-sm" aria-hidden="true">
          <li className="flex items-center gap-2 text-sell">
            <svg width="22" height="8" className="shrink-0"><line x1="0" x2="22" y1="4" y2="4" strokeDasharray="5 4" className="stroke-sell" strokeWidth={1.5} /></svg>
            {fill(labels['sim.sellLine'], { price: price.format(simulation.sellAbove) })}
          </li>
          <li className="flex items-center gap-2 text-buy">
            <svg width="22" height="8" className="shrink-0"><line x1="0" x2="22" y1="4" y2="4" strokeDasharray="5 4" className="stroke-buy" strokeWidth={1.5} /></svg>
            {fill(labels['sim.buyLine'], { price: price.format(simulation.buyBelow) })}
          </li>
          <li className="flex items-center gap-2">
            <Mail className="size-4 shrink-0" />
            {labels['sim.legendSent']}
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <MailX className="size-4 shrink-0" />
            {labels['sim.legendHeld']}
          </li>
        </ul>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={labels['sim.description']}
          className="block h-auto w-full overflow-visible font-sans tabular-nums"
        >
          {/* Zones and references. */}
          <rect x={MARGIN.left} y={MARGIN.top} width={innerW} height={ySell - MARGIN.top} className="fill-sell/10" />
          <rect x={MARGIN.left} y={yBuy} width={innerW} height={bottom - yBuy} className="fill-buy/10" />
          <line x1={MARGIN.left} x2={MARGIN.left + innerW} y1={ySell} y2={ySell} strokeDasharray="5 4" className="stroke-sell" />
          <line x1={MARGIN.left} x2={MARGIN.left + innerW} y1={yBuy} y2={yBuy} strokeDasharray="5 4" className="stroke-buy" />

          {/* The current reading. */}
          <line
            x1={x(index)}
            x2={x(index)}
            y1={MARGIN.top}
            y2={bottom}
            strokeDasharray="2 4"
            className="stroke-foreground/40 transition-all duration-300"
          />

          {/* The price line, drawn segment by segment up to the current reading. */}
          {readings.slice(1).map((r, k) => {
            const i = k + 1;
            return (
              <line
                key={i}
                x1={x(i - 1)}
                y1={y(readings[i - 1]!.price)}
                x2={x(i)}
                y2={y(r.price)}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={i <= index ? 0 : 1}
                strokeWidth={2.5}
                strokeLinecap="round"
                className="stroke-link transition-[stroke-dashoffset] duration-500 ease-out"
              />
            );
          })}

          {readings.map((r, i) => {
            if (i > index) return null;
            const isCurrent = i === index;
            const suppressed = !r.email && r.zone !== 'inside';
            const markerY = y(r.price) + (r.zone === 'below' ? 26 : -26);
            return (
              <g key={i}>
                <circle
                  cx={x(i)}
                  cy={y(r.price)}
                  r={isCurrent ? 6.5 : 4.5}
                  strokeWidth={2.5}
                  className={cn('stroke-link transition-all duration-300', isCurrent ? 'fill-link' : 'fill-card')}
                />
                {r.email && (
                  <g>
                    <circle cx={x(i)} cy={markerY} r={12} className={r.email === 'sell' ? 'fill-sell' : 'fill-buy'} />
                    <Mail x={x(i) - 7} y={markerY - 7} width={14} height={14} className="stroke-background" />
                  </g>
                )}
                {suppressed && (
                  <g>
                    <circle cx={x(i)} cy={markerY} r={12} strokeWidth={1.5} className="fill-card stroke-muted-foreground" />
                    <MailX x={x(i) - 7} y={markerY - 7} width={14} height={14} className="stroke-muted-foreground" />
                  </g>
                )}
              </g>
            );
          })}

          {/* Reading numbers. */}
          {readings.map((_, i) => (
            <text
              key={i}
              x={x(i)}
              y={h - 12}
              textAnchor="middle"
              className={cn(labelText, i === index ? 'fill-foreground font-semibold' : 'fill-muted-foreground')}
            >
              {i + 1}
            </text>
          ))}

          {/* Hovering a reading's column jumps to it. */}
          {interactive &&
            readings.map((_, i) => (
              <rect
                key={i}
                x={x(i) - column / 2}
                y={MARGIN.top}
                width={column}
                height={h - MARGIN.top}
                fill="transparent"
                className="cursor-crosshair"
                onPointerEnter={(event) => event.pointerType === 'mouse' && i !== index && goTo(i)}
                onClick={() => goTo(i)}
              />
            ))}
        </svg>
      </div>

      <div role="group" aria-label={labels['sim.controls']} className="mt-4 flex flex-wrap items-center gap-2" hidden={!interactive}>
        {!reduced && (
          <Button type="button" variant="default" size="sm" onClick={togglePlay}>
            {playing ? <Pause aria-hidden="true" /> : index >= last ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
            {playing ? labels['sim.pause'] : index >= last ? labels['sim.replay'] : labels['sim.play']}
          </Button>
        )}
        <Button type="button" variant="outline" size="icon-sm" className="text-foreground" aria-label={labels['sim.previous']} disabled={index === 0} onClick={() => goTo(index - 1)}>
          <StepBack aria-hidden="true" />
        </Button>
        <Button type="button" variant="outline" size="icon-sm" className="text-foreground" aria-label={labels['sim.next']} disabled={index === last} onClick={() => goTo(index + 1)}>
          <StepForward aria-hidden="true" />
        </Button>
        <Slider
          className="min-w-32 flex-1 sm:mx-2"
          min={0}
          max={last}
          step={1}
          value={[index]}
          onValueChange={([value]) => value !== undefined && value !== index && goTo(value)}
          // 24px on touch-size screens: the WCAG 2.2 minimum target size.
          thumbProps={{ 'aria-label': labels['sim.slider'], 'aria-valuetext': readingOf, className: 'size-6 sm:size-4' }}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-8" data-reading-state>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div className="col-span-2">
            <dt className="sr-only">{labels['sim.slider']}</dt>
            <dd className="text-base font-semibold">{readingOf}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{labels['rule.price']}</dt>
            <dd className="font-medium tabular-nums">{price.format(current.price)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{labels['rule.zone']}</dt>
            <dd className="font-medium">{labels[`zone.${current.zone}`]}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{labels['rule.lastAlert']}</dt>
            <dd className="font-medium">{current.lastAlert ? labels[`alert.${current.lastAlert}`] : labels['rule.none']}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{labels['rule.email']}</dt>
            <dd className={cn('font-semibold', current.email === 'sell' && 'text-sell', current.email === 'buy' && 'text-buy')}>{emailText}</dd>
          </div>
        </dl>
        <p className="self-center text-lg leading-snug text-balance">{reason}</p>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
