import { TestBed } from '@angular/core/testing';

import { InfiniteLoaderService } from './infinite-loader-service';

describe('InfiniteLoader', () => {
  let service: InfiniteLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
