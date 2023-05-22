import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WordsAPIResponse} from "../models/wordsApiResponse";


/**
 * Service for interacting with the Words API.
 */
@Injectable({
  providedIn: 'root'
})
export class WordsApiService {

  // Base URL of the Words API.
  private readonly API_URL = environment.wordsApiUrl;

  // Host of the Words API.
  private readonly API_HOST = environment.wordsApiHost;

  // API key for the Words API.
  private readonly API_KEY = environment.wordsApiKey;

  // Options for the HTTP request.
  private httpOptions = {
    headers: new HttpHeaders({
      'X-Rapidapi-Key': this.API_KEY,
      'X-Rapidapi-Host': this.API_HOST
    })
  }

  /**
   * Constructor for the WordsApiService.
   * @param {HttpClient} http - The injected HttpClient.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches details about a word from the Words API.
   * @param {string} word - The word to fetch details for.
   * @returns {Observable<WordsAPIResponse>} - An Observable containing the WordsAPIResponse.
   */
  getWordDetails(word: string): Observable<WordsAPIResponse> {
    const url = `${this.API_URL}/${word}`;
    return this.http.get<WordsAPIResponse>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<WordsAPIResponse>('getWordDetails', undefined))
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
