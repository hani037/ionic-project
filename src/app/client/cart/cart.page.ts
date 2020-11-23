import { Component, OnInit } from '@angular/core';
import {Cart} from '../../model/cart';
import {CartService} from '../../service/chart.service';
import {LoadingController} from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public loading = false;
  cart: Cart;
  total = 0;
  noImage = 'assets/img/no-image.jpg';

  constructor(private cartService: CartService, private loadingController: LoadingController, public router: Router) { }
  ngOnInit() {
    this.presentLoading();
    this.presentLoadingremove();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.cartService.getCartProducts().toPromise().then(cart => {
        this.total = 0;
        this.cart = cart;
        loading.dismiss();
        this.loading = true;
        if (cart && cart.cartProducts) {
          cart.cartProducts.forEach(e => this.total += e.quantity * e.product.price);
        }
        console.log(this.cart);
      }).catch(error=> {
        if(error.status == 504){
          this.router.navigate(['404'])
        }
      });
    });
  }
  async presentLoadingremove() {
    this.cartService._cart.subscribe(async cart => {
      if (cart!=null){
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'S\'il vous plaît, attendez...',
        });
        await loading.present().then(() => {
          this.total = 0;
          this.cart = cart;
          loading.dismiss();
          if (cart && cart.cartProducts){
            cart.cartProducts.forEach(e =>  this.total += e.quantity * e.product.price);
          }
        });
      }

    });
  }
  getListQuantity(stock){
    return Array(Math.round(stock)).fill(0).map((x, i) => i + 1);
  }

  removeFromCart(cartProduct) {
    this.cartService.removeCartProduct(cartProduct).toPromise().then().catch(error=> {
      if(error.status == 504){
        this.router.navigate(['404'])
      }
    });;
  }



  quantityChanged(cartProduct, event) {
    cartProduct.quantity = event.source.value;
    this.cartService.updateCartProduct(cartProduct).toPromise().then().catch(error=> {
      if(error.status == 504){
        this.router.navigate(['404'])
      }
    });;
  }



}
