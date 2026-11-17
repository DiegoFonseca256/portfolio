import { describe, it, expect } from 'vitest';
import { simulateAlerts } from './alert-zones';

// Band from the StockQuoteAlert README example: sell above 45, buy below 40.
const band = { sellAbove: 45, buyBelow: 40 };

describe('simulateAlerts', () => {
  it('follows the decision table from the StockQuoteAlert README', () => {
    const readings = simulateAlerts({ ...band, prices: [44.8, 45.12, 45.2, 44, 46, 39] });

    expect(readings.map(({ zone, lastAlert, email }) => ({ zone, lastAlert, email }))).toEqual([
      { zone: 'inside', lastAlert: null, email: null },
      { zone: 'above', lastAlert: null, email: 'sell' },
      { zone: 'above', lastAlert: 'sell', email: null },
      { zone: 'inside', lastAlert: 'sell', email: null },
      { zone: 'above', lastAlert: null, email: 'sell' },
      { zone: 'below', lastAlert: 'sell', email: 'buy' },
    ]);
  });

  it('treats a price equal to a reference price as inside the band', () => {
    const readings = simulateAlerts({ ...band, prices: [45, 40] });

    expect(readings.map((r) => r.zone)).toEqual(['inside', 'inside']);
    expect(readings.map((r) => r.email)).toEqual([null, null]);
  });

  it('returns no readings for an empty series', () => {
    expect(simulateAlerts({ ...band, prices: [] })).toEqual([]);
  });

  it('fires on the first reading when the series starts outside the band', () => {
    const [first] = simulateAlerts({ ...band, prices: [38] });

    expect(first).toEqual({ price: 38, zone: 'below', lastAlert: null, email: 'buy' });
  });

  it('fires the opposite alert on every direct crossing', () => {
    const readings = simulateAlerts({ ...band, prices: [46, 39, 47] });

    expect(readings.map((r) => r.email)).toEqual(['sell', 'buy', 'sell']);
  });

  it('keeps the price of each reading', () => {
    const readings = simulateAlerts({ ...band, prices: [41.5, 45.01] });

    expect(readings.map((r) => r.price)).toEqual([41.5, 45.01]);
  });
});
