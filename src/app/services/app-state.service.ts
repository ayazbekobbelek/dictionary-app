import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private searchClicked = new BehaviorSubject<boolean>(false);
  public searchClicked$ = this.searchClicked.asObservable();

  setSearchClicked(value: boolean): void {
    this.searchClicked.next(value);
  }
}
