export interface WordsResponse {
  word: string;
  results?: (ResultsEntity)[] | null;
  syllables: Syllables;
  pronunciation: Pronunciation;
}
export interface ResultsEntity {
  definition: string;
  partOfSpeech: string;
  synonyms?: (string)[] | null;
  typeOf?: (string)[] | null;
  hasTypes?: (string)[] | null;
  derivation?: (string)[] | null;
  examples?: (string)[] | null;
}
export interface Syllables {
  count: number;
  list?: (string)[] | null;
}
export interface Pronunciation {
  all: string;
}
