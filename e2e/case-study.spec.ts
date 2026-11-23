import { test, expect } from '@playwright/test';

const pages = [
  {
    route: '/projects/stockquotealert/',
    sections: ['Problem', 'Approach', 'Result', 'What I learned'],
    repo: 'View the code on GitHub',
    rows: {
      zone: ['Inside the band', 'Above the band', 'Above the band', 'Inside the band', 'Above the band', 'Below the band'],
      lastAlert: ['None', 'None', 'Sell', 'Sell', 'None', 'Sell'],
      email: ['No', 'Yes, sell', 'No', 'No', 'Yes, sell', 'Yes, buy'],
    },
  },
  {
    route: '/pt/projects/stockquotealert/',
    sections: ['Problema', 'Abordagem', 'Resultado', 'O que aprendi'],
    repo: 'Ver o código no GitHub',
    rows: {
      zone: ['Dentro da faixa', 'Acima da faixa', 'Acima da faixa', 'Dentro da faixa', 'Acima da faixa', 'Abaixo da faixa'],
      lastAlert: ['Nenhum', 'Nenhum', 'Venda', 'Venda', 'Nenhum', 'Venda'],
      email: ['Não', 'Sim, venda', 'Não', 'Não', 'Sim, venda', 'Sim, compra'],
    },
  },
];

for (const p of pages) {
  test(`the StockQuoteAlert Estudo de caso tells problem, approach, result and learnings, in that order (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('StockQuoteAlert');
    const headings = await page.getByRole('heading', { level: 2 }).allTextContents();
    const positions = p.sections.map((name) => headings.indexOf(name));
    expect(positions.every((pos) => pos >= 0), `sections present: ${headings.join(' | ')}`).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  test(`the StockQuoteAlert page links to its repository (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    const links = page.getByRole('link', { name: p.repo });
    await expect(links.first()).toHaveAttribute('href', 'https://github.com/DiegoFonseca256/StockQuoteAlert');
  });

  test(`the alert-rule table matches the README decision table (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    const rows = page.getByRole('table').getByRole('row');
    // Header row + six readings.
    await expect(rows).toHaveCount(7);
    const column = async (index: number) =>
      (await rows.locator(`td:nth-child(${index})`).allTextContents()).map((s) => s.trim());
    expect(await column(3)).toEqual(p.rows.zone);
    expect(await column(4)).toEqual(p.rows.lastAlert);
    expect(await column(5)).toEqual(p.rows.email);
  });
}

test('the StockQuoteAlert page shows the console output and the alert e-mail', async ({ page }) => {
  await page.goto('/projects/stockquotealert/');
  await expect(page.getByText('Monitorando PETR4: venda acima de 45, compra abaixo de 40.')).toBeVisible();
  await expect(page.getByText('[VENDA] PETR4 a R$ 45,12', { exact: true })).toBeVisible();
});

const hipotese = [
  {
    route: '/projects/hipotese-capital/',
    sections: ['From raw data to a report', 'Problem', 'Approach', 'Result', 'What I learned', 'Screenshots', 'What it produces'],
    diagram: /^From raw data to a report: 1\. Collect .*2\. Store .*3\. Analyse .*4\. Show/,
    steps: ['1. Collect', '2. Store', '3. Analyse', '4. Show'],
    repo: 'View the code on GitHub',
    shots: [/^The Hipótese Capital dashboard for PETR4/, /^The news section of the dashboard/],
    reportLang: 'pt-BR',
  },
  {
    route: '/pt/projects/hipotese-capital/',
    sections: ['Do dado bruto ao relatório', 'Problema', 'Abordagem', 'Resultado', 'O que aprendi', 'Capturas de tela', 'O que ele produz'],
    diagram: /^Do dado bruto ao relatório: 1\. Coletar .*2\. Guardar .*3\. Analisar .*4\. Mostrar/,
    steps: ['1. Coletar', '2. Guardar', '3. Analisar', '4. Mostrar'],
    repo: 'Ver o código no GitHub',
    shots: [/^O dashboard da Hipótese Capital para a PETR4/, /^A seção de notícias do dashboard/],
    reportLang: null,
  },
];

for (const p of hipotese) {
  test(`the Hipótese Capital Estudo de caso has its sections in order (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hipótese Capital');
    const headings = await page.getByRole('heading', { level: 2 }).allTextContents();
    expect(headings).toEqual(p.sections);
    await expect(page.getByRole('link', { name: p.repo }).first()).toHaveAttribute('href', 'https://github.com/DiegoFonseca256/hipotese-capital');
  });

  test(`the pipeline diagram has a text alternative and explains each step in order (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    await expect(page.getByRole('img', { name: p.diagram })).toBeVisible();
    const steps = await page.locator('section', { has: page.getByRole('heading', { level: 2, name: p.sections[0]! }) }).getByRole('heading', { level: 3 }).allTextContents();
    expect(steps.map((s) => s.replace(/\s+/g, ' ').trim())).toEqual(p.steps);
  });

  test(`both dashboard screenshots load with descriptive alt text (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    for (const name of p.shots) {
      const img = page.getByRole('img', { name });
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
    }
  });

  test(`the sample report covers the business, the indicators, the news sentiment and the questions (${p.route})`, async ({ page }) => {
    await page.goto(p.route);
    for (const name of ['Resumo do negócio', 'Análise dos indicadores', 'Notícias classificadas pela IA', 'Perguntas para investigar']) {
      await expect(page.getByRole('heading', { level: 3, name })).toBeVisible();
    }
    await expect(page.getByText('Positiva', { exact: true })).toHaveCount(3);
    await expect(page.getByText('Negativa', { exact: true })).toHaveCount(2);
    const report = page.locator('figure', { has: page.getByRole('heading', { name: 'Resumo do negócio' }) });
    if (p.reportLang) await expect(report).toHaveAttribute('lang', p.reportLang);
    else await expect(report).not.toHaveAttribute('lang', /.+/);
  });
}
