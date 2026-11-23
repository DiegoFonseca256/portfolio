import type { Simulation } from '@/lib/alert-zones';

/**
 * The scripted price series shown on the StockQuoteAlert page. It uses the
 * references from the README's console example (sell above 45, buy below 40)
 * and opens with the same three readings. It then walks every row type of the
 * README decision table: inside, entering above (sell), staying above (nothing),
 * back inside (clears), above again (sell), straight across to below (buy).
 */
export const alertDemo: Simulation = {
  sellAbove: 45,
  buyBelow: 40,
  prices: [44.8, 45.12, 45.2, 44.35, 45.3, 39.6],
};
