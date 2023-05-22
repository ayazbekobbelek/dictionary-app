export interface WordType{
  word: string,
  pronunciation?: string,
  translation?: string[],
  wordDetails: WordDetailsType[]
}

export interface WordDetailsType{
  definition: string,
  synonyms?: string[],
  examples?: string[]
}
