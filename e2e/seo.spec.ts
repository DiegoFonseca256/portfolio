import { test, expect, type Page } from '@playwright/test';
import { builtRoutes } from './built-site';

/** The local path for an absolute URL on the site's (provisional) domain. */
const local = (href: string) => new URL(href).pathname;

const meta = (page: Page, selector: string) => page.locator(selector).first().getAttribute('content');

test('every page has its own non-empty title and a description', async ({ page }) => {
  const titles = new Set<string>();
  for (const route of builtRoutes()) {
    await page.goto(route);
    const title = (await page.title()).trim();
    expect(title, route).not.toBe('');
    expect(titles.has(title), `${route} repeats the title "${title}"`).toBe(false);
    titles.add(title);
    expect((await meta(page, 'meta[name="description"]'))?.trim(), route).toBeTruthy();
  }
});

test('hreflang alternates link every page to its mirror and back, and resolve', async ({ page, request }) => {
  for (const route of builtRoutes()) {
    await page.goto(route);
    const alternates = Object.fromEntries(
      await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
        links.map((l) => [l.getAttribute('hreflang')!, (l as HTMLLinkElement).href]),
      ),
    );
    expect(Object.keys(alternates).sort(), route).toEqual(['en', 'pt-BR', 'x-default']);
    expect(alternates['x-default'], route).toBe(alternates['en']);

    const lang = await page.locator('html').getAttribute('lang');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(alternates[lang!], `${route} lists itself under its own language`).toBe(canonical);
    expect(local(canonical!), `${route} canonical`).toBe(route);

    for (const href of Object.values(alternates)) {
      expect((await request.get(local(href))).status(), `${route} → ${href}`).toBe(200);
    }
    // The mirror points back here.
    const mirror = lang === 'en' ? alternates['pt-BR']! : alternates['en']!;
    const back = await page.context().newPage();
    await back.goto(local(mirror));
    await expect(back.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute('href', canonical!);
    await back.close();
  }
});

test('every page has Open Graph and Twitter card metadata with a preview image that resolves', async ({ page, request }) => {
  for (const route of builtRoutes()) {
    await page.goto(route);
    expect(await meta(page, 'meta[property="og:title"]'), route).toBe(await page.title());
    expect(await meta(page, 'meta[property="og:description"]'), route).toBe(await meta(page, 'meta[name="description"]'));
    expect(await meta(page, 'meta[property="og:url"]'), route).toBe(await page.locator('link[rel="canonical"]').getAttribute('href'));
    expect(await meta(page, 'meta[name="twitter:card"]'), route).toBe('summary_large_image');

    const image = (await meta(page, 'meta[property="og:image"]'))!;
    expect(await meta(page, 'meta[name="twitter:image"]'), route).toBe(image);
    const res = await request.get(local(image));
    expect(res.status(), `${route} → ${image}`).toBe(200);
    expect(res.headers()['content-type'], image).toContain('image/png');
  }
});

test('the sitemap lists every page in both languages', async ({ request }) => {
  expect((await request.get('/sitemap-index.xml')).status()).toBe(200);
  const xml = await (await request.get('/sitemap-0.xml')).text();
  const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => local(m[1]!)).sort();
  expect(listed).toEqual(builtRoutes().sort());
  expect(listed.some((r) => r.startsWith('/pt/'))).toBe(true);
});
