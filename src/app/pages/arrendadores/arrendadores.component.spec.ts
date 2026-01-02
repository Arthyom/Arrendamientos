import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadoresComponent } from './arrendadores.component';

describe('ArrendadoresComponent', () => {
  let component: ArrendadoresComponent;
  let fixture: ComponentFixture<ArrendadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
