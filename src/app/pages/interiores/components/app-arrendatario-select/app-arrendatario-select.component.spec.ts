import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppArrendatarioSelectComponent } from './app-arrendatario-select.component';

describe('AppArrendatarioSelectComponent', () => {
  let component: AppArrendatarioSelectComponent;
  let fixture: ComponentFixture<AppArrendatarioSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppArrendatarioSelectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppArrendatarioSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
