export interface LexicalaResponse {
  n_results: number;
  page_number: number;
  results_per_page: number;
  n_pages: number;
  available_n_pages: number;
  results: (ResultsEntity)[];
}
export interface ResultsEntity {
  id: string;
  source: string;
  language: string;
  version: number;
  headword: Headword;
  senses: (SensesEntity)[] ;
}
export interface Headword {
  text: string;
  pronunciation: Pronunciation;
  pos: string;
  subcategory: string;
}
export interface Pronunciation {
  value: string;
}
export interface SensesEntity {
  id: string;
  definition: string;
  examples: (ExamplesEntity)[];
}
export interface ExamplesEntity {
  text: string;
}
