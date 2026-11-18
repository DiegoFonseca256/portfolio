import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const viewports = {
  desktop: { width: 1280, height: 800 },
  phone: { width: 360, height: 740 },
};

for (const route of ['/', '/pt/']) {
  for (const [device, viewport] of Object.entries(viewports)) {
    for (const scheme of ['light', 'dark'] as const) {
      test(`${route} passes an axe scan on ${device} in the ${scheme} theme`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(route);
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
          .analyze();
        expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }

  test(`${route} has no horizontal scroll at 360px`, async ({ page }) => {
    await page.setViewportSize(viewports.phone);
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
