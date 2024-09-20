import { TestBed } from '@angular/core/testing';

import { YourService } from './your.service';

describe('YourService', () => {
  let service: YourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
