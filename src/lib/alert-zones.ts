/**
 * StockQuoteAlert's anti-spam alert rule, reproduced for the site's simulation.
 *
 * Each reading falls below, inside or above the band. An e-mail fires only when
 * the price enters a zone outside the band; staying there fires nothing, and
 * coming back inside clears the held alert. The band is closed: a price equal to
 * a reference price is inside it.
 */

export type Zone = 'below' | 'inside' | 'above';
export type Alert = 'buy' | 'sell';

export interface Reading {
  price: number;
  zone: Zone;
  /** The alert held before this reading, as in the README's "Último alerta" column. */
  lastAlert: Alert | null;
  /** The e-mail this reading sends, if any. */
  email: Alert | null;
}

export interface Simulation {
  /** Sell reference price: readings above it are in the sell zone. */
  sellAbove: number;
  /** Buy reference price: readings below it are in the buy zone. */
  buyBelow: number;
  prices: readonly number[];
}

function zoneOf(price: number, { sellAbove, buyBelow }: Simulation): Zone {
  if (price > sellAbove) return 'above';
  if (price < buyBelow) return 'below';
  return 'inside';
}

const alertFor: Record<Zone, Alert | null> = { above: 'sell', below: 'buy', inside: null };

export function simulateAlerts(simulation: Simulation): Reading[] {
  let held: Alert | null = null;
  return simulation.prices.map((price) => {
    const zone = zoneOf(price, simulation);
    const wanted = alertFor[zone];
    const email = wanted !== null && wanted !== held ? wanted : null;
    const reading: Reading = { price, zone, lastAlert: held, email };
    held = wanted;
    return reading;
  });
}
