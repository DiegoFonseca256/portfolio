# 02: StockQuoteAlert alert-zone logic

**What to build:** A pure, framework-free module that reproduces StockQuoteAlert's anti-spam alert rule. Given a sell reference price, a buy reference price and a sequence of price readings, it returns, per reading, the zone (below / inside / above the band), the last alert held, and whether an e-mail fires (and which kind: buy or sell). It is the single source of truth the simulation chart (ticket 06) consumes.

Rule: an alert fires only when the price **enters** a zone outside the band; staying in the same zone fires nothing; returning inside clears the held alert; crossing directly to the other side fires the opposite alert.

**Blocked by:** 01: Walking skeleton

**Status:** ready-for-agent

- [ ] Vitest is set up and runs from one command.
- [ ] The six-reading decision table from the StockQuoteAlert README passes as the primary fixture (inside/no, above/sell, above/no, inside/clears, above/sell, below/buy).
- [ ] A price exactly equal to a reference price counts as inside the band.
- [ ] An empty series returns an empty result.
- [ ] A series that starts outside the band fires on its first reading.
- [ ] Repeated direct crossings (above → below → above) fire sell, buy, sell.
- [ ] The module has no dependency on any UI framework or the DOM.
