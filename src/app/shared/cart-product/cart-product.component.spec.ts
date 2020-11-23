import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartProductComponent } from './cart-product.component';

describe('CartProductComponent', () => {
  let component: CartProductComponent;
  let fixture: ComponentFixture<CartProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartProductComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
