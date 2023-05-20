import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'
import { TranslationResponse } from '../models/translationResponse.type'
import { Languages} from "../models/languages.type"

@Injectable({
  providedIn: 'root'
})
export class YandexApiService {
  private readonly API_KEY = "dict.1.1.20230517T221942Z.b175c3aa30f1b8d4.edae9534cc30661589b8dea9d6acd7b4b3ed6552"
  private readonly API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup"

  constructor(private http: HttpClient) { }

  getTranslation(word: String, lang: String) {
    const url = `${this.API_URL}?key=${this.API_KEY}&lang=${lang}&text=${word}`
    return this.http.get<TranslationResponse>(url)
  }

  getSupportedLanguages() {
    const url = `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.API_KEY}`;
     return this.http.get<Languages>(url)
  }

}
