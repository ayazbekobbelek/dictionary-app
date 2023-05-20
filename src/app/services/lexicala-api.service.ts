import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'
import {LexicalaResponse} from "../models/LexicalaResponse";

@Injectable({
  providedIn: 'root'
})
export class LexicalaApiService {
  private readonly API_KEY = "9aea8e5f1bmsh47d7b7bb2cb3a83p12ed7bjsnb67ba7b9a832"
  private readonly API_URL = "https://lexicala1.p.rapidapi.com/search-entries"
  private readonly API_HOST = "lexicala1.p.rapidapi.com"
  private httpOptions = {
    headers: new HttpHeaders({
      'X-Rapidapi-Key': this.API_KEY,
      'X-Rapidapi-Host': this.API_HOST
    })
  };
  constructor(private http: HttpClient) { }

  getWordDetails(word: string, language: string): Observable<LexicalaResponse> {
    const url = `${this.API_URL}?text=${word}&language=${language}`;
    return this.http.get<LexicalaResponse>(url, this.httpOptions);
  }
}
