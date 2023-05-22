import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, map, Observable} from 'rxjs';
import {ThesaurusService} from "./thesaurus.service";
import {YandexApiService} from "./yandex-api.service";
import {WordType, WordDetailsType} from "../models/word.type";
import {WordsApiService} from "./words-api.service";


@Injectable({
  providedIn: 'root'
})
export class WordService {


  constructor(private http: HttpClient,
              private thesaurusApiService: ThesaurusService,
              private yandexApiService: YandexApiService,
              private wordsApiService: WordsApiService) {
  }

  getWordDetails(word: string, language: string): Observable<WordType> {

    return forkJoin({
      yandex: this.yandexApiService.getTranslation(word, language),
      thesaurus: this.thesaurusApiService.getResponse(word, 'en_US'),
      wordApi: this.wordsApiService.getWordDetails(word)
    }).pipe(map(({yandex, thesaurus, wordApi}) => {
      const wordType: WordType = {
        word: word,
        pronunciation: wordApi?.pronunciation?.all,
        translation: yandex ? yandex.def.map(def => def.tr.map(translation => translation.text)).flat() : [],
        wordDetails: wordApi ? wordApi.results.map(result => {
          const w: WordDetailsType = {
            definition: result.definition,
            synonyms: result.synonyms ? result.synonyms : [],
            examples: result.examples ? result.examples: []
          }
          console.log(w)
          return w
        }) : []
        // definition: wordApi ? wordApi.results.map(result => result.definition) : [],
        // examples: wordApi ? wordApi.results.flatMap(result => result.examples ? result.examples : []) : [],
        // synonyms: wordApi ? wordApi.results.flatMap(result => result.synonyms ? result.synonyms : []) : []
        //synonyms: thesaurus ? thesaurus.response.flatMap(response => response.list.synonyms.split(', ')) : []
      };

      return wordType;
    }));
  }


}
