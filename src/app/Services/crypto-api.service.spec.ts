import { TestBed } from '@angular/core/testing';

import { CryptoAPIService } from './crypto-api.service';

describe('CryptoAPIService', () => {
  let service: CryptoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
