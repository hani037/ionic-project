import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SailorComponent } from './sailor.component';

describe('SailorComponent', () => {
  let component: SailorComponent;
  let fixture: ComponentFixture<SailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
