export interface ThesaurusResponse {
  response: (ResponseEntity)[];
}
export interface ResponseEntity {
  list: List;
}
export interface List {
  category: string;
  synonyms: string;
}
