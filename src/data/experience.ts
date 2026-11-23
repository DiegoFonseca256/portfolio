import type { Localized } from './localized';

/** A month, as `YYYY-MM`. */
type Month = `${number}-${number}`;

/**
 * One Experiência in the timeline: work or education. Source: Diego's CV.
 * Achievements are only what the CV states; don't add outcomes it doesn't.
 */
export interface Experience {
  kind: 'work' | 'education';
  org: Localized<string>;
  role: Localized<string>;
  start: Month;
  /** `null` while it's ongoing. */
  end: Month | null;
  /** A short line under the role, e.g. the expected graduation. */
  note?: Localized<string>;
  achievements: Localized<string[]>;
}

/** Most recent first. */
export const experiences: Experience[] = [
  {
    kind: 'education',
    org: { en: 'University of Leeds', pt: 'Universidade de Leeds' },
    role: { en: 'Exchange programme in Business', pt: 'Intercâmbio em Business' },
    start: '2025-09',
    end: '2026-01',
    achievements: { en: [], pt: [] },
  },
  {
    kind: 'work',
    org: { en: 'Empresa Júnior (student-run consultancy)', pt: 'Empresa Júnior' },
    role: { en: 'Senior Web Development Consultant', pt: 'Consultor Sênior de Web Development' },
    start: '2024-11',
    end: '2025-09',
    achievements: {
      en: [
        'Took part in two successful web development cases, trained new members, updated the services offered and ran market research on them.',
        'In technical infrastructure, automated internal processes, built technical improvements across areas and managed the internal database.',
      ],
      pt: [
        'Participei de dois cases de sucesso em web development, capacitei novos membros, atualizei os serviços oferecidos e conduzi pesquisas de mercado sobre eles.',
        'Na infraestrutura técnica, automatizei processos internos, desenvolvi inovações técnicas em diferentes áreas e gerenciei o banco de dados interno.',
      ],
    },
  },
  {
    kind: 'work',
    org: { en: 'DEE, PUC-Rio (PSR funding)', pt: 'DEE PUC-Rio (financiamento PSR)' },
    role: { en: 'Research project', pt: 'Projeto de pesquisa' },
    start: '2024-07',
    end: '2024-12',
    achievements: {
      en: [
        "Researched the impact of combining photovoltaic systems and electric vehicles on the power distribution grid, at PUC-Rio's Department of Electrical Engineering.",
        'Built analyses and simulations in Python to assess the effects on the distribution network.',
      ],
      pt: [
        'Pesquisei o impacto da combinação de sistemas fotovoltaicos e veículos elétricos no sistema de distribuição de energia, no Departamento de Engenharia Elétrica da PUC-Rio.',
        'Desenvolvi análises e simulações em Python para avaliar os efeitos sobre a rede de distribuição.',
      ],
    },
  },
  {
    kind: 'education',
    org: { en: 'PUC-Rio', pt: 'PUC-Rio' },
    role: { en: 'BSc in Computer Engineering', pt: 'Bacharelado em Engenharia da Computação' },
    start: '2023-01',
    end: null,
    note: { en: 'Expected to graduate in June 2028.', pt: 'Previsão de formatura: junho de 2028.' },
    achievements: { en: [], pt: [] },
  },
];
