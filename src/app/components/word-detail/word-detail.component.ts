import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TranslationResponse} from "../../models/translationResponse.type"
import {ThesaurusResponse} from "../../models/thesaurusResponse.type";
import {LexicalaResponse} from "../../models/LexicalaResponse";
import {WordService} from "../../services/words.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  word: string = '';
  languagePair: string = '';
  details: LexicalaResponse | undefined;
  translation: TranslationResponse | undefined;
  synonyms: ThesaurusResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService
  ) {

  }

  ngOnInit() {
    this.updateWordDetails();
    this.route.queryParams.pipe(
      switchMap(params => {
        this.word = params['word'][0].toUpperCase()+params['word'].substring(1);
        this.languagePair = params['languagePair'];

        return this.wordService.getWordDetails(this.word, this.languagePair);
      })
    ).subscribe(response => {
      this.details = response[0];
      this.translation = response[1];
      this.synonyms = response[2];
    });
  }

  private updateWordDetails() {
    this.route.queryParams.subscribe(params => {
      this.word = params['word']
      this.languagePair = params['languagePair']
    })
    this.wordService.getWordDetails(this.word, this.languagePair).subscribe(response => {
      this.details = response[0]
      this.translation = response[1]
      this.synonyms = response[2]
    })
  }

  getPrononcuation(lexicalaResponse: LexicalaResponse) {
    let prononcuation = ''
    lexicalaResponse.results.forEach(response => {
      prononcuation = response.headword.pronunciation?.value ?? ''
    })
    return prononcuation
  }

  getDefinitions(lexicalaResponse: LexicalaResponse) {
    const definitions: string[] = []
    lexicalaResponse.results.forEach(response => {
      response.senses.forEach(sense => {
        if (sense.definition) {
          definitions.push(sense.definition)
        }
      })
    })
    return definitions
  }

  getExamples(lexicalaResponse: LexicalaResponse) {
    const examples: string[] = []
    lexicalaResponse.results?.forEach(response => {
      response.senses?.forEach(sense => {
        sense.examples?.forEach(example => {
          if(example.text){
            examples.push(example.text)
          }
        })
      })
    })
    return examples
  }


  getTranslation(translationResponse: TranslationResponse) {
    const translations: string[] = []
    translationResponse.def.forEach(translation => {
      translation.tr.forEach(tr => {
        if (tr.text){
          translations.push(tr.text)
        }
      })
    })
    return translations
  }

  getSynonyms(thesaurusResponse : ThesaurusResponse) {
    const synonyms: string[] = []
    thesaurusResponse.response.forEach(response => {
      if(response.list.synonyms){
        synonyms.push(...response.list.synonyms.split('|'))
      }
    })
    return synonyms
  }

}
