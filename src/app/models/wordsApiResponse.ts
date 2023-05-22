export interface WordsAPIResponse {
  word:          string;
  results:       Result[];
  syllables:     Syllables;
  pronunciation: Pronunciation;
}

export interface Pronunciation {
  all: string;
}

export interface Result {
  definition:   string;
  partOfSpeech: string;
  synonyms:     string[];
  typeOf:       string[];
  hasTypes?:    string[];
  derivation?:  string[];
  examples?:    string[];
}

export interface Syllables {
  count: number;
  list:  string[];
}
