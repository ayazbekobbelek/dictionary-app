import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WordService} from "../../services/words.service";
import {switchMap} from "rxjs";
import {WordType} from "../../models/word.type";
import {AppStateService} from "../../services/app-state.service";

/**
 * Component for displaying the details of a specific word.
 */
@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  word: string = '';
  languagePair: string = '';
  wordDetails: WordType | undefined;

  /**
   * Constructor for the WordDetailComponent.
   * @param {ActivatedRoute} route - The active route.
   * @param {WordService} wordService - The WordService for fetching word details.
   * @param {AppStateService} appStateService - The AppStateService for tracking application state.
   */
  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private appStateService: AppStateService
  ) {

  }

  /**
   * Angular lifecycle hook that is called once upon component initialization.
   */
  ngOnInit() {
    // set the application state to indicate a search operation,
    // then update word details based on the query parameters of the current route
    this.appStateService.setSearchClicked(true)
    this.updateWordDetails();
    this.route.queryParams.pipe(
      switchMap(params => {
        this.word = params['word'][0].toUpperCase() + params['word'].substring(1);
        this.languagePair = params['languagePair'];

        return this.wordService.getWordDetails(this.word, this.languagePair);
      })
    ).subscribe(response => {
      this.wordDetails = response
    });
  }

  /**
   * Fetches the details of the word specified in the current route's query parameters.
   */
  private updateWordDetails() {
    this.route.queryParams.subscribe(params => {
      this.word = params['word']
      this.languagePair = params['languagePair']
    })
    this.wordService.getWordDetails(this.word, this.languagePair).subscribe(response => {
      this.wordDetails = response
    })
  }


}
