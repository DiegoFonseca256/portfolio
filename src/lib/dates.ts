import { htmlLang, type Locale } from '@/i18n/locales';

/** "Nov 2024" / "nov 2024" for a `YYYY-MM` month. */
export function formatMonth(month: string, locale: Locale): string {
  const [year, m] = month.split('-').map(Number);
  const date = new Date(Date.UTC(year!, m! - 1, 15));
  const name = new Intl.DateTimeFormat(htmlLang(locale), { month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace('.', '');
  return `${name} ${year}`;
}
