import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {LexicalaResponse} from "../models/LexicalaResponse";
import {ThesaurusResponse} from "../models/thesaurusResponse.type";
import {TranslationResponse} from "../models/translationResponse.type";
import {ThesaurusService} from "./thesaurus.service";
import {LexicalaApiService} from "./lexicala-api.service";
import {YandexApiService} from "./yandex-api.service";

@Injectable({
  providedIn: 'root'
})
export class WordService {


  constructor(private http: HttpClient,
              private thesaurusApiService: ThesaurusService,
              private lexicalaApiService: LexicalaApiService,
              private yandexApiService: YandexApiService) {
  }

  getWordDetails(word: string, language: string): Observable<[LexicalaResponse, TranslationResponse, ThesaurusResponse]> {
    const sourceLanguage = language.split('-')[0]
    return forkJoin([
      this.lexicalaApiService.getWordDetails(word, sourceLanguage),
      this.yandexApiService.getTranslation(word, language),
      this.thesaurusApiService.getResponse(word, 'en_US')
    ]);
  }


}
