import { TestBed } from '@angular/core/testing';

import { AuhService } from './auh.service';

describe('AuhService', () => {
  let service: AuhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
