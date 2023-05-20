import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {WordsResponse} from "../models/wordsResponse.type";
import {TranslationResponse} from "../models/translationResponse.type";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private _word = new BehaviorSubject<string>("");
  private _details = new BehaviorSubject<WordsResponse | null>(null);
  private _translation = new BehaviorSubject<TranslationResponse | null >(null);

  word$ = this._word.asObservable();
  details$ = this._details.asObservable();
  translation$ = this._translation.asObservable();

  updateWord(word: string) {
    this._word.next(word);
  }

  updateDetails(details: WordsResponse) {
    this._details.next(details);
  }

  updateTranslation(translation: TranslationResponse) {
    this._translation.next(translation);
  }
}
