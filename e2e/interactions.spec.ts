import { test, expect, type Page } from '@playwright/test';

const HEADLINE = 'Software, data and AI applied to real problems.';

/** What the headline looks like after the mouse rests over its middle. */
async function headlineUnderMouse(page: Page) {
  const headline = page.getByRole('heading', { level: 1, name: HEADLINE });
  await expect(headline).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const before = await headline.screenshot();
  const box = (await headline.boundingBox())!;
  await page.mouse.move(box.x + box.width / 3, box.y + box.height / 2, { steps: 5 });
  await page.waitForTimeout(400);
  const after = await headline.screenshot();
  return { before, after, headline };
}

test('the headline reads as one sentence to assistive technology', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(HEADLINE);
});

test('the headline answers the mouse without moving the page', async ({ page }) => {
  await page.goto('/');
  const { before, after, headline } = await headlineUnderMouse(page);
  expect(after.equals(before), 'the letters near the mouse change').toBe(false);
  const height = (await headline.boundingBox())!.height;
  await page.mouse.move(0, 0);
  expect((await headline.boundingBox())!.height, 'the lines never reflow').toBe(height);
});

test('with reduced motion, nothing follows the mouse', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const { before, after } = await headlineUnderMouse(page);
  expect(after.equals(before)).toBe(true);
});

for (const [route, name, done] of [
  ['/', 'Copy e-mail address', 'E-mail address copied'],
  ['/pt/', 'Copiar endereço de e-mail', 'Endereço de e-mail copiado'],
] as const) {
  test(`the copy button puts the e-mail address on the clipboard (${route})`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(route);
    await page.getByRole('button', { name }).click();
    await expect(page.getByRole('status')).toHaveText(done);
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('diego.g.fonseca@gmail.com');
  });
}
