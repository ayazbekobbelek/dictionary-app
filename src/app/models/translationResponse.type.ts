/**
 * Represents a translation response from the Yandex API.
 * @property {null} head - Not currently used, always null.
 * @property {DefEntity[]} def - Array of definition entities.
 */
export interface TranslationResponse {
  head: null;
  def: DefEntity[];
}

/**
 * Represents a definition entity in the Yandex API.
 * @property {string} text - The text of the definition.
 * @property {string} pos - The part of speech.
 * @property {Translations[]} tr - Array of translations.
 */
export interface DefEntity {
  text: string;
  pos: string;
  tr: Translations[];
}

/**
 * Represents a translation in the Yandex API.
 * @property {string} text - The translated text.
 * @property {string} pos - The part of speech.
 * @property {Synonyms[]} syn - Array of synonyms.
 * @property {Meanings[]} mean - Array of meanings.
 * @property {Examples[]} ex - Array of examples.
 */
export interface Translations {
  text: string;
  pos: string;
  syn: Synonyms[];
  mean: Meanings[];
  ex: Examples[];
}

/**
 * Represents a synonym in the Yandex API.
 * @property {string} text - The synonym text.
 */
export interface Synonyms {
  text: string;
}

/**
 * Represents a meaning in the Yandex API.
 * @property {string} text - The meaning text.
 */
export interface Meanings {
  text: string;
}

/**
 * Represents an example in the Yandex API.
 * @property {string} text - The example text.
 * @property {Translations[]} tr - Array of translations.
 */
export interface Examples {
  text: string;
  tr: Translations[];
}
