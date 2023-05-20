import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {TranslationResponse} from "../models/translationResponse.type";
import {Languages} from "../models/languages.type";

@Injectable({
  providedIn: 'root'
})
export class YandexApiService {
  private readonly API_KEY = environment.yandexApiKey;
  private readonly API_URL = environment.yandexApiUrl;

  constructor(private http: HttpClient) {
  }

  getTranslation(word: string, lang: string): Observable<TranslationResponse> {
    const url = `${this.API_URL}?key=${this.API_KEY}&lang=${lang}&text=${word}`;
    return this.http.get<TranslationResponse>(url)
  }

  getSupportedLanguages(): Observable<Languages> {
    const url = `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.API_KEY}`;
    return this.http.get<Languages>(url)
  }

}
