import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoraireSailorComponent } from './horaire-sailor.component';

describe('HoraireSailorComponent', () => {
  let component: HoraireSailorComponent;
  let fixture: ComponentFixture<HoraireSailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraireSailorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoraireSailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
