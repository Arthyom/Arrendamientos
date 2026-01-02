import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonThreePartsComponent } from './common-three-parts.component';

describe('CommonThreePartsComponent', () => {
  let component: CommonThreePartsComponent;
  let fixture: ComponentFixture<CommonThreePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonThreePartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonThreePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
