import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WordsAPIResponse} from "../models/wordsApiResponse";

@Injectable({
  providedIn: 'root'
})
export class WordsApiService {
  private readonly API_URL = environment.wordsApiUrl;
  private readonly API_HOST = environment.wordsApiHost;
  private readonly API_KEY = environment.wordsApiKey;
  private httpOptions = {
    headers: new HttpHeaders({
      'X-Rapidapi-Key': this.API_KEY,
      'X-Rapidapi-Host': this.API_HOST
    })
  }
  constructor(private http: HttpClient) { }

  getWordDetails(word: string): Observable<WordsAPIResponse> {
    const url = `${this.API_URL}/${word}`;
    return this.http.get<WordsAPIResponse>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<WordsAPIResponse>('getWordDetails', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
