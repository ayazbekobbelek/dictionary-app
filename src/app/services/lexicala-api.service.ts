import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs'
import {LexicalaResponse} from "../models/LexicalaResponse";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LexicalaApiService {
  private readonly API_URL = environment.lexicalaApiUrl;
  private readonly API_HOST = environment.lexicalaApiHost;
  private readonly API_KEY = environment.lexicalaApiKey;
  private httpOptions = {
    headers: new HttpHeaders({
      'X-Rapidapi-Key': this.API_KEY,
      'X-Rapidapi-Host': this.API_HOST
    })
  };

  constructor(private http: HttpClient) {
  }


  getWordDetails(word: string, language: string): Observable<LexicalaResponse | undefined> {
    const url = `${this.API_URL}?text=${word}&language=${language}`;
    return this.http.get<LexicalaResponse>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<LexicalaResponse>('getWordDetails', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
