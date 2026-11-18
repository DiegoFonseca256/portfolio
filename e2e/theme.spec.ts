import { test, expect, type Page } from '@playwright/test';

/**
 * Whether the page reads as light or dark, judged by what a Recrutador sees:
 * the relative luminance of the page background.
 */
async function appearance(page: Page): Promise<'light' | 'dark'> {
  const luminance = await page.evaluate(() => {
    const probe = document.createElement('canvas').getContext('2d')!;
    probe.fillStyle = getComputedStyle(document.body).backgroundColor;
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b] = Array.from(probe.getImageData(0, 0, 1, 1).data).map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  });
  return luminance > 0.5 ? 'light' : 'dark';
}

for (const scheme of ['light', 'dark'] as const) {
  test(`the theme follows a ${scheme} system preference`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    for (const route of ['/', '/pt/']) {
      await page.goto(route);
      expect(await appearance(page), route).toBe(scheme);
    }
  });
}

const toggleName = { '/': 'Dark theme', '/pt/': 'Tema escuro' };

for (const [route, name] of Object.entries(toggleName)) {
  test(`the toggle overrides the system theme and persists across reloads (${route})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(route);
    const toggle = page.getByRole('button', { name });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await toggle.click();
    expect(await appearance(page)).toBe('dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    expect(await appearance(page)).toBe('dark');
    await expect(page.getByRole('button', { name })).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name }).click();
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    expect(await appearance(page), 'an explicit light choice beats a dark system').toBe('light');
  });
}

test('with storage blocked, the page follows the system theme and the toggle still works', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('blocked', 'SecurityError');
      },
    });
  });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  expect(await appearance(page)).toBe('dark');

  await page.getByRole('button', { name: 'Dark theme' }).click();
  expect(await appearance(page)).toBe('light');
});
