import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ThesaurusResponse} from "../models/thesaurusResponse.type";

@Injectable({
  providedIn: 'root'
})
export class ThesaurusService {
  private readonly API_KEY = environment.thesaurusApiKey;
  private readonly API_URL = environment.thesaurusApiUrl;

  constructor(private http: HttpClient) {
  }

  getResponse(word: String, language: string) {
    const url = `${this.API_URL}?word=${word}&language=${language}&key=${this.API_KEY}&output=json`
    return this.http.get<ThesaurusResponse>(url)
  }
}
