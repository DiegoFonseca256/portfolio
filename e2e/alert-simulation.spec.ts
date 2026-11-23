import { test, expect, type Page } from '@playwright/test';

const ROUTE = '/projects/stockquotealert/';

async function openSimulation(page: Page, route = ROUTE) {
  await page.goto(route);
  const controls = page.getByRole('group', { name: /Simulation controls|Controles da simulação/ });
  await controls.scrollIntoViewIfNeeded();
  await expect(controls).toBeVisible();
  return { state: page.locator('[data-reading-state]'), controls };
}

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the simulation starts paused and only moves when stepped', async ({ page }) => {
    const { state, controls } = await openSimulation(page);
    await expect(controls.getByRole('button', { name: 'Play' })).toHaveCount(0);
    await expect(state).toContainText('Reading 1 of 6');
    await page.waitForTimeout(2000);
    await expect(state, 'nothing advances on its own').toContainText('Reading 1 of 6');

    const next = page.getByRole('button', { name: 'Next reading' });
    await next.click();
    await expect(state).toContainText('Reading 2 of 6');
    await expect(state).toContainText('Above the band');
    await expect(state).toContainText('Yes, sell');
    await expect(state).toContainText('entered the sell zone');

    await next.click();
    await expect(state).toContainText('Reading 3 of 6');
    await expect(state).toContainText('No');
    await expect(state).toContainText('already sent');

    for (let i = 0; i < 3; i++) await next.click();
    await expect(state).toContainText('Reading 6 of 6');
    await expect(state).toContainText('Yes, buy');
    await expect(state).toContainText('crossed straight from the sell zone');
    await expect(next).toBeDisabled();

    await page.getByRole('button', { name: 'Previous reading' }).click();
    await expect(state).toContainText('Reading 5 of 6');
  });

  test('the reading slider steps with the keyboard', async ({ page }) => {
    const { state } = await openSimulation(page);
    const slider = page.getByRole('slider', { name: 'Reading' });
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(state).toContainText('Reading 2 of 6');
    await expect(slider).toHaveAttribute('aria-valuetext', 'Reading 2 of 6');
    await page.keyboard.press('End');
    await expect(state).toContainText('Reading 6 of 6');
  });

  test('stepping announces the new reading to screen readers', async ({ page }) => {
    await openSimulation(page);
    await page.getByRole('button', { name: 'Next reading' }).click();
    await expect(page.locator('[aria-live="polite"]')).toContainText('Reading 2 of 6');
  });

  test('the Portuguese simulation steps too', async ({ page }) => {
    const { state } = await openSimulation(page, '/pt/projects/stockquotealert/');
    await page.getByRole('button', { name: 'Próxima leitura' }).click();
    await expect(state).toContainText('Leitura 2 de 6');
    await expect(state).toContainText('Sim, venda');
  });
});

test('without reduced motion, the simulation plays when in view and can be paused', async ({ page }) => {
  const { state, controls } = await openSimulation(page);
  await expect(state).toContainText('Reading 3 of 6', { timeout: 8000 });
  await controls.getByRole('button', { name: 'Pause' }).click();
  const paused = await state.textContent();
  await page.waitForTimeout(2000);
  expect(await state.textContent()).toBe(paused);
  await expect(controls.getByRole('button', { name: 'Play' })).toBeVisible();
});
