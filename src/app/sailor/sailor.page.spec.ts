import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SailorPage } from './sailor.page';

describe('SailorPage', () => {
  let component: SailorPage;
  let fixture: ComponentFixture<SailorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SailorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
