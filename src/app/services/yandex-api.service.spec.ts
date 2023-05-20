import { TestBed } from '@angular/core/testing';

import { YandexApiService } from './yandex-api.service';

describe('YandexApiService', () => {
  let service: YandexApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YandexApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
