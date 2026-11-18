export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Route param for the `[...locale]` rest segment: undefined for the default locale. */
export function localeParam(locale: Locale): string | undefined {
  return locale === defaultLocale ? undefined : locale;
}

export function localeFromParam(param: string | undefined): Locale {
  const found = locales.find((l) => l === param);
  return found ?? defaultLocale;
}

/** Static paths for a page that must exist in every locale. */
export function everyLocale() {
  return locales.map((locale) => ({ params: { locale: localeParam(locale) }, props: { locale } }));
}

/** The BCP 47 tag for `lang` and `hreflang` attributes. */
export function htmlLang(locale: Locale): string {
  return locale === 'pt' ? 'pt-BR' : 'en';
}

/** Path of `pathname` in `target` locale, keeping the visitor on the equivalent page. */
export function localizePath(pathname: string, target: Locale): string {
  const withoutPrefix = pathname.replace(/^\/pt(?=\/|$)/, '') || '/';
  if (target === defaultLocale) return withoutPrefix;
  return withoutPrefix === '/' ? '/pt/' : `/pt${withoutPrefix}`;
}
