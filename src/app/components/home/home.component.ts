import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {YandexApiService} from "../../services/yandex-api.service";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  word = '';
  sourceLanguage = '';
  targetLanguage = '';
  languages: string[] = [];
  targetLanguages: string[] = [];
  languageMap: Map<string, string[]> = new Map();
  searchClicked: boolean = false;


  constructor(private router: Router,
              private yandexApiService: YandexApiService,
              private appStateService: AppStateService) {
    this.appStateService.searchClicked$.subscribe(value => this.searchClicked = value);
  }

  ngOnInit() {
    this.yandexApiService.getSupportedLanguages().subscribe(languagePairs => {
      const languageSet = new Set<string>();
      for (const pair of languagePairs) {
        const [source, target] = pair.split('-');
        if (source == "en") {
          if (this.getLanguageName(source) !== source && this.getLanguageName(target) !== target) {
            languageSet.add(source);
            if (this.languageMap.has(source)) {
              this.languageMap.get(source)!.push(target);
            } else {
              this.languageMap.set(source, [target]);
            }
          }
        }

        this.languages = Array.from(languageSet);
      }
    })
  }

  search() {
    this.appStateService.setSearchClicked(true);
    // Navigate to the word detail page within the HomeComponent's router outlet
    this.router.navigate(['home', 'word'], {
      queryParams: {
        word: this.word,
        languagePair: `${this.sourceLanguage}-${this.targetLanguage}`
      }
    });
  }

  updateTargetLanguages() {
    // Update target languages based on the selected source language
    this.targetLanguage = '';
    this.targetLanguages = this.languageMap.get(this.sourceLanguage) || [];
  }

  getLanguageName(code: string): string {
    const languageMap: { [key: string]: string } = {
      "bg": "Bulgarian",
      "cs": "Czech",
      "da": "Danish",
      "de": "German",
      "el": "Greek",
      "en": "English",
      "es": "Spanish",
      "et": "Estonian",
      "fi": "Finnish",
      "fr": "French",
      "hu": "Hungarian",
      "it": "Italian",
      "lt": "Lithuanian",
      "lv": "Latvian",
      "nl": "Dutch",
      "no": "Norwegian",
      "pt": "Portuguese",
      "ru": "Russian",
      "sk": "Slovak",
      "sv": "Swedish",
      "tr": "Turkish",
      "uk": "Ukrainian",
      "zh": "Simplified Chinese"
    };

    return languageMap[code] || code;
  }

  navigateToHome() {
    this.appStateService.setSearchClicked(false);
    this.router.navigateByUrl('/home');
  }


}
