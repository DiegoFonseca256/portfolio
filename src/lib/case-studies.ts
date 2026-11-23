import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, localeParam, localizePath, type Locale } from '@/i18n/locales';

export type CaseStudy = CollectionEntry<'caseStudies'>['data'];

/** Where an Estudo de caso lives, e.g. `/projects/stockquotealert/` or `/pt/projects/stockquotealert/`. */
export function caseStudyPath(slug: string, locale: Locale): string {
  return localizePath(`/projects/${slug}/`, locale);
}

/**
 * Every Estudo de caso, keyed by slug, with its content in each locale. Entries
 * live at `<locale>/<slug>.yaml`; a slug missing from any locale, or a file
 * outside a locale folder, fails the build.
 */
export async function caseStudiesBySlug(): Promise<Map<string, Record<Locale, CaseStudy>>> {
  const bySlug = new Map<string, Partial<Record<Locale, CaseStudy>>>();
  for (const entry of await getCollection('caseStudies')) {
    const [folder, slug, ...rest] = entry.id.split('/');
    const locale = locales.find((l) => l === folder);
    if (!locale || !slug || rest.length > 0) {
      throw new Error(`Estudo de caso "${entry.id}" must live at <locale>/<slug>.yaml, with locale one of: ${locales.join(', ')}`);
    }
    bySlug.set(slug, { ...bySlug.get(slug), [locale]: entry.data });
  }

  const complete = new Map<string, Record<Locale, CaseStudy>>();
  for (const [slug, translations] of bySlug) {
    const missing = locales.filter((l) => !translations[l]);
    if (missing.length > 0) throw new Error(`Estudo de caso "${slug}" has no ${missing.join(', ')} version`);
    complete.set(slug, translations as Record<Locale, CaseStudy>);
  }
  return complete;
}

/** Static paths for `[...locale]/projects/[slug].astro`: every Estudo de caso in every locale. */
export async function caseStudyPaths() {
  const studies = await caseStudiesBySlug();
  return [...studies].flatMap(([slug, translations]) =>
    locales.map((locale) => ({
      params: { locale: localeParam(locale), slug },
      props: { locale, slug, study: translations[locale] },
    })),
  );
}

/** The Estudos de caso in `locale`, in home-preview order, each with its slug. */
export async function caseStudiesIn(locale: Locale): Promise<(CaseStudy & { slug: string })[]> {
  const studies = await caseStudiesBySlug();
  return [...studies]
    .map(([slug, translations]) => ({ ...translations[locale], slug }))
    .sort((a, b) => a.order - b.order);
}
