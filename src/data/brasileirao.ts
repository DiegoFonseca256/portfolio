import type { Localized } from './localized';

/**
 * The Brasileirão note: an academic project with no public code, so it has no
 * page and no link. Source: Diego's CV. Don't add results it doesn't state.
 */
export const brasileirao = {
  /** Share of correct predictions of the final standings. */
  accuracy: 0.703,
  seasons: '2014–2019',
  course: 'ENG4040',
  year: 2024,
  title: { en: 'Predicting the Brasileirão', pt: 'Previsão do Brasileirão' } satisfies Localized<string>,
  figureLabel: {
    en: 'accuracy predicting the final standings of the Brasileirão, 2014–2019 seasons',
    pt: 'de acurácia prevendo a classificação final do Brasileirão, temporadas 2014–2019',
  } satisfies Localized<string>,
  text: {
    en: 'A machine learning model for the Brazilian football league, using Random Forest and logistic regression, with SHAP to interpret which performance factors drove the predictions.',
    pt: 'Um modelo de machine learning para o Campeonato Brasileiro, com Random Forest e regressão logística, e SHAP para interpretar quais fatores de desempenho pesaram nas previsões.',
  } satisfies Localized<string>,
  techniques: {
    en: ['Random Forest', 'Logistic regression', 'SHAP'],
    pt: ['Random Forest', 'Regressão logística', 'SHAP'],
  } satisfies Localized<string[]>,
  context: {
    en: "Academic project for ENG4040 at PUC-Rio, 2024. The code isn't public.",
    pt: 'Projeto acadêmico da disciplina ENG4040 na PUC-Rio, 2024. O código não é público.',
  } satisfies Localized<string>,
};
