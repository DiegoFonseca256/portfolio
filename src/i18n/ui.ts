import type { Locale } from './locales';

/**
 * Interface copy. English is the reference: every other locale must provide
 * every key, so a missing translation fails `astro check` (and therefore the build).
 */
const en = {
  'meta.title': 'Diego Fonseca',
  'meta.description':
    'Computer Engineering student at PUC-Rio building software, data and AI tools for real problems. Looking for a software development internship.',
  'home.headline': 'Software, data and AI applied to real problems.',
  'home.context':
    'Computer Engineering student at PUC-Rio, looking for a software development internship.',
  'contact.heading': 'Contact',
  'contact.email': 'E-mail',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',
  'lang.switch': 'Português',
  'lang.switchLabel': 'Ler em português',
  'theme.dark': 'Dark theme',
  'identity.role': 'Computer Engineering student · PUC-Rio · Rio de Janeiro',
  'nav.skip': 'Skip to content',
  'nav.label': 'Site',
} as const;

type Keys = keyof typeof en;

const pt: Record<Keys, string> = {
  'meta.title': 'Diego Fonseca',
  'meta.description':
    'Estudante de Engenharia da Computação na PUC-Rio que constrói ferramentas de software, dados e IA para problemas reais. Buscando estágio em desenvolvimento de software.',
  'home.headline': 'Software, dados e IA aplicados a problemas reais.',
  'home.context':
    'Estudante de Engenharia da Computação na PUC-Rio, buscando estágio em desenvolvimento de software.',
  'contact.heading': 'Contato',
  'contact.email': 'E-mail',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',
  'lang.switch': 'English',
  'lang.switchLabel': 'Read in English',
  'theme.dark': 'Tema escuro',
  'identity.role': 'Estudante de Engenharia da Computação · PUC-Rio · Rio de Janeiro',
  'nav.skip': 'Pular para o conteúdo',
  'nav.label': 'Site',
};

const dictionaries: Record<Locale, Record<Keys, string>> = { en, pt };

export function t(locale: Locale) {
  return (key: Keys): string => dictionaries[locale][key];
}
