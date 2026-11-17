import { test, expect } from '@playwright/test';
import { builtRoutes } from './built-site';

function ptMirror(route: string): string {
  return route === '/' ? '/pt/' : `/pt${route}`;
}

function enMirror(route: string): string {
  return route.replace(/^\/pt/, '') || '/';
}

const isPt = (r: string) => r.startsWith('/pt/');

test('every English route has a Portuguese mirror and vice versa', async ({ request }) => {
  const routes = builtRoutes();
  const en = routes.filter((r) => !isPt(r));
  const pt = routes.filter(isPt);

  expect(en).toContain('/');
  expect(pt.length).toBe(en.length);

  for (const route of en) {
    const res = await request.get(ptMirror(route));
    expect(res.status(), `missing PT mirror for ${route}`).toBe(200);
  }
  for (const route of pt) {
    const res = await request.get(enMirror(route));
    expect(res.status(), `missing EN mirror for ${route}`).toBe(200);
  }
});

test('the language switch lands on the same page in the other language', async ({ page }) => {
  for (const route of builtRoutes()) {
    const expected = isPt(route) ? enMirror(route) : ptMirror(route);
    await page.goto(route);
    await page.locator('[data-lang-switch]').click();
    await expect(page, `switch from ${route}`).toHaveURL((url) => url.pathname.replace(/\/?$/, '/') === expected.replace(/\/?$/, '/'));
  }
});

test('each language version declares its own language', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/pt/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});
