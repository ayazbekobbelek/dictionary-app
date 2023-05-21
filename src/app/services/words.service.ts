import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, map, Observable} from 'rxjs';
import {LexicalaResponse} from "../models/LexicalaResponse";
import {ThesaurusResponse} from "../models/thesaurusResponse.type";
import {TranslationResponse} from "../models/translationResponse.type";
import {ThesaurusService} from "./thesaurus.service";
import {LexicalaApiService} from "./lexicala-api.service";
import {YandexApiService} from "./yandex-api.service";
import {WordType} from "../models/word.type";

@Injectable({
  providedIn: 'root'
})
export class WordService {


  constructor(private http: HttpClient,
              private thesaurusApiService: ThesaurusService,
              private lexicalaApiService: LexicalaApiService,
              private yandexApiService: YandexApiService) {
  }

  getWordDetails(word: string, language: string): Observable<WordType> {
    const sourceLanguage = language.split('-')[0];

    return forkJoin({
      yandex: this.yandexApiService.getTranslation(word, language),
      thesaurus: this.thesaurusApiService.getResponse(word, 'en_US'),
      lexicala: this.lexicalaApiService.getWordDetails(word, sourceLanguage)
    }).pipe(map(({ lexicala, yandex, thesaurus }) => {
      const wordType: WordType = {
        word: word,
        pronunciation: lexicala?.results[0]?.headword?.pronunciation?.value,
        definition: lexicala ? lexicala.results.flatMap(result => result.senses.map(sense => sense.definition)).flat() : ["Not found"],
        examples: lexicala ? lexicala.results.flatMap(result => result.senses.map(sense => sense.examples.map(example => example.text))).flat(2) : ["Not Found"],
        translation: yandex ? yandex.def.flatMap(def => def.tr.map(translation => translation.text)).flat() : ["Not Found"],
        synonyms: thesaurus ? thesaurus.response.flatMap(response => response.list.synonyms.split(', ')) : ["Not Found"]
      };

      return wordType;
    }));
  }


}
