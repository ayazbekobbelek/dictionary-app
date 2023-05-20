import { TestBed } from '@angular/core/testing';

import { ThesaurusService } from './thesaurus.service';

describe('ThesaurusService', () => {
  let service: ThesaurusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThesaurusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
