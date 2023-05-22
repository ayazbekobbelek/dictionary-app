/**
 * Represents a response from the WordsAPI.
 * @property {string} word - The requested word.
 * @property {Result[]} results - The results for the word, containing its definition, part of speech, synonyms, types, derivations, and examples.
 * @property {Syllables} syllables - The syllables of the word, including their count and list.
 * @property {Pronunciation} pronunciation - The pronunciation of the word.
 */
export interface WordsAPIResponse {
  word:          string;
  results:       Result[];
  syllables:     Syllables;
  pronunciation: Pronunciation;
}

/**
 * Represents the pronunciation of a word.
 * @property {string} all - The complete pronunciation of the word.
 */
export interface Pronunciation {
  all: string;
}

/**
 * Represents a result in the WordsAPI response.
 * @property {string} definition - The definition of the word.
 * @property {string} partOfSpeech - The part of speech of the word.
 * @property {string[]} synonyms - The synonyms of the word.
 * @property {string[]} typeOf - The types of the word.
 * @property {string[]} [hasTypes] - Other types that the word has, if available.
 * @property {string[]} [derivation] - The derivations of the word, if available.
 * @property {string[]} [examples] - Example sentences or phrases using the word, if available.
 */
export interface Result {
  definition:   string;
  partOfSpeech: string;
  synonyms:     string[];
  typeOf:       string[];
  hasTypes?:    string[];
  derivation?:  string[];
  examples?:    string[];
}

/**
 * Represents the syllables of a word.
 * @property {number} count - The count of syllables in the word.
 * @property {string[]} list - The list of syllables.
 */
export interface Syllables {
  count: number;
  list:  string[];
}
