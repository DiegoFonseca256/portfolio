import type { Localized } from './localized';

/**
 * Skills as grouped text, from Diego's CV, plus C#/.NET (StockQuoteAlert) and
 * what the two Estudos de caso use. No logos or icons.
 */
export interface SkillGroup {
  title: Localized<string>;
  items: Localized<string[]>;
}

const same = (items: string[]): Localized<string[]> => ({ en: items, pt: items });

export const skillGroups: SkillGroup[] = [
  {
    title: { en: 'Languages', pt: 'Linguagens' },
    items: same(['Python', 'C#', 'JavaScript', 'SQL', 'C', 'HTML', 'CSS']),
  },
  {
    title: { en: 'Data and AI', pt: 'Dados e IA' },
    items: {
      en: ['pandas', 'SQLite', 'Plotly', 'LLM APIs (Groq)'],
      pt: ['pandas', 'SQLite', 'Plotly', 'APIs de LLM (Groq)'],
    },
  },
  {
    title: { en: 'Frameworks and tools', pt: 'Frameworks e ferramentas' },
    items: same(['.NET', 'Django', 'Node.js', 'Streamlit', 'Git', 'GitHub', 'Arduino', 'MATLAB', 'OpenDSS']),
  },
  {
    title: { en: 'Concepts', pt: 'Conceitos' },
    items: {
      en: ['REST APIs', 'Object-oriented programming', 'Databases', 'Data analysis', 'Agile methods'],
      pt: ['APIs REST', 'Programação orientada a objetos', 'Banco de dados', 'Análise de dados', 'Metodologias ágeis'],
    },
  },
];

/** Spoken languages, from the CV. */
export const spokenLanguages: { language: Localized<string>; level: Localized<string> }[] = [
  { language: { en: 'Portuguese', pt: 'Português' }, level: { en: 'Native', pt: 'Nativo' } },
  { language: { en: 'English', pt: 'Inglês' }, level: { en: 'Fluent', pt: 'Fluente' } },
  { language: { en: 'Spanish', pt: 'Espanhol' }, level: { en: 'Intermediate', pt: 'Intermediário' } },
];
