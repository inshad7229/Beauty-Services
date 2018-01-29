import { TestBed, inject } from '@angular/core/testing';

import { SaloonService } from './saloon.service';

describe('SaloonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaloonService]
    });
  });

  it('should be created', inject([SaloonService], (service: SaloonService) => {
    expect(service).toBeTruthy();
  }));
});
