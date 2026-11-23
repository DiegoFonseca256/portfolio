/**
 * Renders the Open Graph images (1200×630), one per locale, into public/:
 * og-en.png and og-pt.png. The copy comes from src/i18n/ui.ts, so the cards
 * always match the home headline. Run with `npm run og` after changing that
 * copy or the palette, and commit the PNGs.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { t } from '../src/i18n/ui.ts';

const root = new URL('..', import.meta.url);
const font = readFileSync(new URL('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2', root)).toString('base64');

// The scripted StockQuoteAlert series (src/data/alert-demo.ts), as a decorative price line.
const prices = [44.8, 45.12, 45.2, 44.35, 45.3, 39.6];
const line = prices
  .map((p, i) => `${i ? 'L' : 'M'}${i * 64} ${((46.8 - p) / 8.7) * 150}`)
  .join(' ');

const card = (locale: 'en' | 'pt') => {
  const tr = t(locale);
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<style>
  @font-face { font-family: Archivo; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 64px 72px;
    display: flex; flex-direction: column; justify-content: space-between;
    font-family: Archivo; color: #10241f; background-color: #edf1ec;
    background-image:
      linear-gradient(to right, rgb(35 71 198 / 0.16) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(35 71 198 / 0.16) 1px, transparent 1px),
      linear-gradient(to right, rgb(35 71 198 / 0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(35 71 198 / 0.07) 1px, transparent 1px);
    background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
    position: relative;
  }
  .name { font-size: 34px; font-weight: 700; font-stretch: 125%; letter-spacing: -0.01em; }
  h1 { font-size: 78px; line-height: 0.98; font-weight: 800; font-stretch: 125%; letter-spacing: -0.02em; max-width: 15ch; }
  .context { font-size: 28px; line-height: 1.3; max-width: 34ch; color: #4f625c; }
  svg { position: absolute; right: 72px; bottom: 64px; overflow: visible; }
</style>
</head>
<body>
  <p class="name">Diego Fonseca</p>
  <h1>${tr('home.headline')}</h1>
  <p class="context">${tr('home.context')}</p>
  <svg width="320" height="150" viewBox="0 0 320 150" aria-hidden="true">
    <path d="${line}" fill="none" stroke="#2347c6" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="64" cy="${((46.8 - 45.12) / 8.7) * 150 - 26}" r="11" fill="#b42318"/>
    <circle cx="256" cy="${((46.8 - 45.3) / 8.7) * 150 - 26}" r="11" fill="#b42318"/>
    <circle cx="320" cy="${((46.8 - 39.6) / 8.7) * 150 + 26}" r="11" fill="#13724a"/>
  </svg>
</body>
</html>`;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const locale of ['en', 'pt'] as const) {
  await page.setContent(card(locale));
  await page.evaluate(() => document.fonts.ready);
  const path = fileURLToPath(new URL(`public/og-${locale}.png`, root));
  await page.screenshot({ path });
  console.log(`wrote ${path}`);
}
await browser.close();
