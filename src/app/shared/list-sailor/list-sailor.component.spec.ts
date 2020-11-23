import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListSailorComponent } from './list-sailor.component';

describe('ListSailorComponent', () => {
  let component: ListSailorComponent;
  let fixture: ComponentFixture<ListSailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSailorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
