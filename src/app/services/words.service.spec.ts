import { TestBed } from '@angular/core/testing';

import { WordsService } from './words.service';

describe('WordsApiService', () => {
  let service: WordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
