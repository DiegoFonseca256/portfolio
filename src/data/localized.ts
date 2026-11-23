import type { Locale } from '@/i18n/locales';

/** A value in every locale. A missing translation is a type error, so it fails `astro check` and the build. */
export type Localized<T> = Record<Locale, T>;
