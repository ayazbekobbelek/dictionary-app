export interface TranslationResponse {
  head: null
  def: (DefEntity)[];
}
export interface DefEntity {
  text: string;
  pos: string;
  tr: (Translations)[];
}
export interface Translations {
  text: string;
  pos: string;
  syn: (Synonyms)[];
  mean: (Meanings)[];
  ex: (Examples)[];
}
export interface Synonyms {
  text: string;
}

export interface Meanings {
  text: string;
}
export interface Examples {
  text: string;
  tr: (Translations)[];
}
