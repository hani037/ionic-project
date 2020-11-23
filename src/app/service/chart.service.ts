import { Injectable } from '@angular/core';
import { CartProduct } from '../model/cartProduct';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart } from '../model/cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartsUrl = '/api/v1/carts';

  readonly _cart = new BehaviorSubject<Cart>(null);
  private dataStore: { cart: Cart } = { cart : new Cart()};
  readonly cart = this._cart.asObservable();

  constructor(private http: HttpClient) {

  }


  public getCartProducts(): Observable<Cart> {
    return this.http.get<Cart>(this.cartsUrl).pipe(map(cart => {
      this.dataStore.cart = cart;
      this._cart.next(Object.assign({}, this.dataStore).cart);
      return cart;
    }));
  }

  public addCartProduct(product, quantity) : Observable<CartProduct> {
    return this.http.post<CartProduct>(this.cartsUrl, { product : product, quantity : quantity}).pipe(map(cartProduct => {
      this.dataStore.cart.cartProducts.push(cartProduct);
      this._cart.next(Object.assign({}, this.dataStore).cart);
      return cartProduct;
    }));
  }

  public updateCartProduct(cartProduct: CartProduct) : Observable<CartProduct> {
    return this.http.put<CartProduct>(this.cartsUrl, cartProduct)
        .pipe(map(cartProduct => {
          this.dataStore.cart.cartProducts.forEach((t, i) => {
            if (t.id === cartProduct.id) {
              this.dataStore.cart.cartProducts[i] = cartProduct;
            }
          });
          this._cart.next(Object.assign({}, this.dataStore).cart);
          return cartProduct;
        }));
  }

  public chooseCartAddress(addressId: string) : Observable<void> {
    return this.http.put<void>(this.cartsUrl+ '/address/'+ addressId, {})
        .pipe(map( () => {
          this.dataStore.cart.addressId = addressId;
          this._cart.next(Object.assign({}, this.dataStore).cart);
        }));
  }

  public removeCartProduct(cartProduct: CartProduct) {
    return this.http.delete<CartProduct>(this.cartsUrl +'/'+ cartProduct.id).pipe(map( () => {
      this.dataStore.cart.cartProducts.forEach((t, i) => {
        if (t.id === cartProduct.id) {
          this.dataStore.cart.cartProducts.splice(i, 1);
        }
      });
      this._cart.next(Object.assign({}, this.dataStore).cart);
    }));
  }

  public clearCartProduct() {
    this.dataStore.cart = null;
    this._cart.next(Object.assign({}, this.dataStore).cart);

  }

}
