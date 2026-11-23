import { test, expect } from '@playwright/test';
import { builtRoutes } from './built-site';

/** Every place the site may link out to. Anything else is a mistake. */
const EXTERNAL = new Set([
  'mailto:diego.g.fonseca@gmail.com',
  'https://www.linkedin.com/in/diegogfonseca',
  'https://github.com/DiegoFonseca256',
  'https://github.com/DiegoFonseca256/StockQuoteAlert',
  'https://github.com/DiegoFonseca256/hipotese-capital',
]);

const CV = '/diego-fonseca-cv.pdf';

test('every internal link resolves, fragments included, and every external link is a known profile or repo', async ({ page, request }) => {
  const checked = new Map<string, number>();
  for (const route of builtRoutes()) {
    await page.goto(route);
    const hrefs = await page.locator('a[href]').evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const url = new URL(href);
      if (url.origin !== new URL(page.url()).origin) {
        expect(EXTERNAL.has(href), `${route} links to an unexpected place: ${href}`).toBe(true);
        continue;
      }
      if (!checked.has(url.pathname)) checked.set(url.pathname, (await request.get(url.pathname)).status());
      expect(checked.get(url.pathname), `${route} → ${url.pathname}`).toBe(200);
      if (url.hash) {
        const target = await page.context().newPage();
        await target.goto(url.pathname);
        await expect(target.locator(url.hash), `${route} → ${url.pathname}${url.hash}`).toHaveCount(1);
        await target.close();
      }
    }
  }
});

for (const route of ['/', '/pt/']) {
  test(`the home links to Diego's e-mail, LinkedIn, GitHub and CV (${route})`, async ({ page }) => {
    await page.goto(route);
    const contact = page.locator('#contact');
    await expect(contact.locator('a[href="mailto:diego.g.fonseca@gmail.com"]')).toHaveCount(1);
    await expect(contact.locator('a[href="https://www.linkedin.com/in/diegogfonseca"]')).toHaveCount(1);
    await expect(contact.locator('a[href="https://github.com/DiegoFonseca256"]')).toHaveCount(1);
    await expect(contact.locator(`a[href="${CV}"]`)).toHaveAttribute('download', '');
  });

  test(`the home previews every Estudo de caso and links to its page (${route})`, async ({ page }) => {
    await page.goto(route);
    const work = page.locator('#work');
    for (const name of ['Hipótese Capital', 'StockQuoteAlert']) {
      await expect(work.getByRole('heading', { level: 3, name })).toBeVisible();
    }
    await expect(work.locator('a[href$="/projects/hipotese-capital/"]').first()).toBeVisible();
    await expect(work.locator('a[href$="/projects/stockquotealert/"]').first()).toBeVisible();
  });
}

test('on the English site, the CV download says the CV is in Portuguese', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator(`a[href="${CV}"]`)).toContainText('in Portuguese');
});

test('the CV download returns a PDF', async ({ request }) => {
  const res = await request.get(CV);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/pdf');
  expect((await res.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('the Brasileirão note is an academic project with no link', async ({ page }) => {
  await page.goto('/');
  const note = page.locator('#brasileirao');
  await expect(note).toContainText('70.3%');
  await expect(note).toContainText('ENG4040');
  await expect(note).toContainText("The code isn't public.");
  await expect(note.locator('a')).toHaveCount(0);
  await page.goto('/pt/');
  await expect(page.locator('#brasileirao')).toContainText('70,3%');
});

test('the home shows no photo', async ({ page }) => {
  for (const route of ['/', '/pt/']) {
    await page.goto(route);
    // The only image on the home is the Hipótese Capital dashboard thumbnail, which is decorative.
    const images = await page.locator('main img').evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).currentSrc || (i as HTMLImageElement).src));
    expect(images.every((src) => src.includes('dashboard-')), images.join(', ')).toBe(true);
  }
});
