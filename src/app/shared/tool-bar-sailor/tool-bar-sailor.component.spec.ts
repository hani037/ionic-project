import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolBarSailorComponent } from './tool-bar-sailor.component';

describe('ToolBarSailorComponent', () => {
  let component: ToolBarSailorComponent;
  let fixture: ComponentFixture<ToolBarSailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBarSailorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolBarSailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
