import { TestBed } from '@angular/core/testing';

import { LexicalaApiService } from './lexicala-api.service';

describe('LexicalaApiService', () => {
  let service: LexicalaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LexicalaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
