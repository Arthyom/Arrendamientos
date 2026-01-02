import { TestBed } from '@angular/core/testing';

import { ServiceArrDataRequester } from './service-arr-data-requester';

describe('ServiceArrDataRequester', () => {
  let service: ServiceArrDataRequester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceArrDataRequester);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
