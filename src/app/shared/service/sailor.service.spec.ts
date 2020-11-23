import { TestBed } from '@angular/core/testing';

import { SailorService } from './sailor.service';

describe('SailorService', () => {
  let service: SailorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SailorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
