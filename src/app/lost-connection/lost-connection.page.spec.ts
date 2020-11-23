import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostConnectionPage } from './lost-connection.page';

describe('LostConnectionPage', () => {
  let component: LostConnectionPage;
  let fixture: ComponentFixture<LostConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostConnectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
