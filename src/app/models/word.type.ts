/**
 * Represents a detailed word object returned from the application's WordService.
 * @property {string} word - The word itself.
 * @property {string} [pronunciation] - The pronunciation of the word, if available.
 * @property {string[]} [translation] - The translations of the word, if available.
 * @property {WordDetailsType[]} wordDetails - Additional details about the word, such as its definition, synonyms, and examples.
 */
export interface WordType {
  word: string;
  pronunciation?: string;
  translation?: string[];
  wordDetails: WordDetailsType[];
}

/**
 * Represents additional details about a word.
 * @property {string} definition - The definition of the word.
 * @property {string[]} [synonyms] - The synonyms of the word, if available.
 * @property {string[]} [examples] - Example sentences or phrases using the word, if available.
 */
export interface WordDetailsType {
  definition: string;
  synonyms?: string[];
  examples?: string[];
}
