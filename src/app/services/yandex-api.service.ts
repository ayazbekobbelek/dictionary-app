import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {TranslationResponse} from "../models/translationResponse.type";
import {Languages} from "../models/languages.type";

/**
 * Service for interacting with the Yandex API.
 */
@Injectable({
  providedIn: 'root'
})
export class YandexApiService {

  // Yandex API key from the environment.
  private readonly API_KEY = environment.yandexApiKey;

  // Yandex API base URL from the environment.
  private readonly API_URL = environment.yandexApiUrl;

  /**
   * Constructor for the YandexApiService.
   * @param {HttpClient} http - The injected HttpClient.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches the translation of a word from the Yandex API.
   * @param {string} word - The word to translate.
   * @param {string} lang - The language to translate the word into.
   * @returns {Observable<TranslationResponse>} - An Observable containing the TranslationResponse.
   */
  getTranslation(word: string, lang: string): Observable<TranslationResponse> {
    const url = `${this.API_URL}?key=${this.API_KEY}&lang=${lang}&text=${word}`;
    return this.http.get<TranslationResponse>(url).pipe(
      catchError(this.handleError<TranslationResponse>('getTranslation', undefined))
    );
  }

  /**
   * Fetches the languages supported by the Yandex API.
   * @returns {Observable<Languages>} - An Observable containing the list of supported languages.
   */
  getSupportedLanguages(): Observable<Languages> {
    const url = `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.API_KEY}`;
    return this.http.get<Languages>(url).pipe(
      catchError(this.handleError<Languages>('getSupportedLanguages', undefined))
    );
  }

  /**
   * Generic error handler for all HTTP operations.
   * @param {string} operation - Name of the operation that caused the error.
   * @param {T} result - Optional value to return as the observable result.
   * @returns {Function} - Function that handles the error.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
