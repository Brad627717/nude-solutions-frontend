import { TestBed } from '@angular/core/testing';

import { InsuredItemApiService } from './insured-item-api.service';

describe('InsuredItemApiService', () => {
  let service: InsuredItemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuredItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
