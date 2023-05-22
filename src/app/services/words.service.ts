import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, map, Observable} from 'rxjs';
import {YandexApiService} from "./yandex-api.service";
import {WordType, WordDetailsType} from "../models/word.type";
import {WordsApiService} from "./words-api.service";


/**
 * Service for fetching word details and translations.
 */
@Injectable({
  providedIn: 'root'
})
export class WordService {

  /**
   * Constructor for the WordService.
   * @param {HttpClient} http - The injected HttpClient.
   * @param {YandexApiService} yandexApiService - The injected YandexApiService.
   * @param {WordsApiService} wordsApiService - The injected WordsApiService.
   */
  constructor(private http: HttpClient,
              private yandexApiService: YandexApiService,
              private wordsApiService: WordsApiService) {
  }

  /**
   * Fetches details about a word and its translation in a specified language.
   * @param {string} word - The word to fetch details for.
   * @param {string} language - The language to translate the word into.
   * @returns {Observable<WordType>} - An Observable containing the WordType object.
   */
  getWordDetails(word: string, language: string): Observable<WordType> {

    // ForkJoin is used to wait for both observables to complete
    return forkJoin({
      yandex: this.yandexApiService.getTranslation(word, language),
      wordApi: this.wordsApiService.getWordDetails(word)
    }).pipe(map(({yandex, wordApi}) => {
      const wordType: WordType = {
        word: word,
        pronunciation: wordApi?.pronunciation?.all,
        translation: yandex ? yandex.def.map(def => def.tr.map(translation => translation.text)).flat() : [],
        wordDetails: wordApi ? wordApi.results.map( result => {
          const w: WordDetailsType = {
            definition: result.definition,
            synonyms: result.synonyms ? result.synonyms : [],
            examples: result.examples ? result.examples: []
          }
          return w
        }) : []
      };

      return wordType;
    }));
  }
}
