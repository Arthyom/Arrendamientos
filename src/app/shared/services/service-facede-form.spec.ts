import { TestBed } from '@angular/core/testing';

import { ServiceFacedeForm } from './service-facede-form';

describe('ServiceFacedeForm', () => {
  let service: ServiceFacedeForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFacedeForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
