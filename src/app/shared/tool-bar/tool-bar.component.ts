import {Component, OnDestroy, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {UserService} from "../../service/user.service";
import {CartService} from "../../service/chart.service";
import {PaymentService} from "../service/payment.service";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  numberCartProduct = 0;
  userconnected = false;
  subscription;
  subscription1;

  constructor(private cartService: CartService,public paymentService:PaymentService,private userService: UserService, public route: Router) {

  }

  ngOnInit() {
    this.paymentService.panier.subscribe(data=>{
      if (data==true){
        this.numberCartProduct = 0;
        this.cartService.clearCartProduct();
      }
    })
    this.subscription = this.userService.isLoggedInObservable().subscribe(userConnected => {
      if(!userConnected) {
        this.numberCartProduct = 0;
        this.cartService.clearCartProduct();
      } else {
        this.userconnected = true;
        this.cartService.getCartProducts().subscribe();
      }
    });
    this.subscription1 = this.cartService._cart.subscribe(cart => {
      this.numberCartProduct = 0;
      if(cart && cart.cartProducts){
        cart.cartProducts.forEach(cp => this.numberCartProduct+=cp.quantity);
      }
    });
    this.userService._userConnected.subscribe(userConnected => {
      if(!userConnected) {
        this.userconnected = false;
      }
    })
  }

  navigate_to_chart() {
    this.route.navigateByUrl('client/cart');
  }

    navigate_to_boutique() {
      this.route.navigateByUrl('client/boutique_sailor');

    }
}
