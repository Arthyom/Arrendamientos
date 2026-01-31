import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArrendatarioIconToolComponent } from './arrendatario-icon-tool.component';

describe('ArrendatarioIconToolComponent', () => {
  let component: ArrendatarioIconToolComponent;
  let fixture: ComponentFixture<ArrendatarioIconToolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrendatarioIconToolComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArrendatarioIconToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
