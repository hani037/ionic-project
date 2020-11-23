import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoraireComponent } from './horaire.component';

describe('HoraireComponent', () => {
  let component: HoraireComponent;
  let fixture: ComponentFixture<HoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
