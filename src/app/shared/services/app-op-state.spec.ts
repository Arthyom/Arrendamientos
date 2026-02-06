import { TestBed } from '@angular/core/testing';

import { AppOpState } from './app-op-state';

describe('AppOpState', () => {
  let service: AppOpState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppOpState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
