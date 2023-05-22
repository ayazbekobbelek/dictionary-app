import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WordService} from "../../services/words.service";
import {switchMap} from "rxjs";
import {WordType} from "../../models/word.type";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  word: string = '';
  languagePair: string = '';
  wordDetails: WordType | undefined;


  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private appStateService: AppStateService
  ) {

  }

  ngOnInit() {
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
