import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Running text: one string per paragraph. Inline `code` in backticks is rendered as code. */
const paragraphs = z.array(z.string().min(1)).min(1);

/** A titled point inside a section, e.g. one design decision in the approach. */
const point = z.object({ title: z.string().min(1), text: z.string().min(1) });

/**
 * The language an example is written in, when it differs from the page's (a
 * program that prints Portuguese, shown on the English page). It sets `lang`
 * on the example, so screen readers pronounce it right.
 */
const exampleLang = z.enum(['en', 'pt']).optional();

/** One section of a generated report: paragraphs, a list, or classified headlines. */
const reportSection = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).optional(),
  items: z.array(z.string().min(1)).optional(),
  news: z
    .array(
      z.object({
        headline: z.string().min(1),
        source: z.string().min(1),
        date: z.iso.date(),
        sentiment: z.enum(['positive', 'negative', 'neutral']),
        /** The sentiment as the report itself words it, e.g. "Positiva". */
        label: z.string().min(1),
      }),
    )
    .optional(),
});

/** Examples of what the project produces, shown as they would appear to its user. */
const example = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('console'),
    lang: exampleLang,
    caption: z.string().min(1),
    /** The terminal output, verbatim. */
    output: z.string().min(1),
  }),
  z.object({
    kind: z.literal('email'),
    lang: exampleLang,
    caption: z.string().min(1),
    subject: z.string().min(1),
    body: paragraphs,
  }),
  z.object({
    kind: z.literal('report'),
    lang: exampleLang,
    caption: z.string().min(1),
    heading: z.string().min(1),
    sections: z.array(reportSection).min(1),
  }),
]);

/** The visual piece built from the project's real logic, shown right after the page header. */
const feature = z.discriminatedUnion('kind', [
  /** StockQuoteAlert's alert rule: the simulation and its table (copy lives in the interface strings). */
  z.object({ kind: z.literal('alert-rule') }),
  /** A left-to-right pipeline diagram, with each step explained below it. */
  z.object({
    kind: z.literal('pipeline'),
    heading: z.string().min(1),
    intro: z.string().min(1),
    steps: z
      .array(z.object({ title: z.string().min(1), tools: z.array(z.string().min(1)).min(1), text: z.string().min(1) }))
      .min(2)
      .max(5),
  }),
]);

/**
 * Estudos de caso: one YAML file per project per language, at
 * `src/content/case-studies/<locale>/<slug>.yaml`. Every slug must exist in
 * every locale; the page route checks that and fails the build otherwise.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '*/*.yaml', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.strictObject({
      title: z.string().min(1),
      /** Position among the home previews, lowest first. */
      order: z.number().int().min(1),
      /** One or two sentences for the page header. */
      summary: z.string().min(1),
      /** The home preview: the problem and the result, one short sentence each. */
      preview: z.object({ problem: z.string().min(1).max(140), result: z.string().min(1).max(160) }),
      year: z.number().int().min(2000).max(2100),
      /** What kind of project it is, e.g. "Console application". */
      type: z.string().min(1),
      technologies: z.array(z.string().min(1)).min(1),
      repository: z.url().startsWith('https://github.com/'),
      feature: feature.optional(),
      problem: paragraphs,
      approach: z.object({ intro: paragraphs, points: z.array(point).default([]) }),
      result: paragraphs,
      learnings: z.array(point).min(1),
      media: z
        .array(z.object({ src: image(), alt: z.string().min(1), caption: z.string().optional() }))
        .default([]),
      examples: z.array(example).default([]),
    }),
});

export const collections = { caseStudies };
