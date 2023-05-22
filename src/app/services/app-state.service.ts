import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * Service for managing application state.
 */
@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  // BehaviorSubject keeping track of the search operation state
  private searchClicked = new BehaviorSubject<boolean>(false);

  // Observable to expose the search operation state to subscribers
  public searchClicked$ = this.searchClicked.asObservable();

  /**
   * Updates the state of the search operation.
   * @param {boolean} value - The new state of the search operation.
   */
  setSearchClicked(value: boolean): void {
    this.searchClicked.next(value);
  }
}
