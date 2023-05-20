import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
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

  getWordDetails(word: string, language: string): Observable<LexicalaResponse> {
    const url = `${this.API_URL}?text=${word}&language=${language}`;
    return this.http.get<LexicalaResponse>(url, this.httpOptions);
  }
}
