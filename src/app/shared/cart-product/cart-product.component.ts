import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../service/chart.service';
import {ExpeditionProduct} from '../../model/order';
import {CartProduct} from '../../model/cartProduct';
import {Product} from '../../model/product';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {
  noImage = 'assets/img/no-image.jpg';
  product : Product;
  @Input() cartProduct : CartProduct;
  @Input() expeditionProduct : ExpeditionProduct;
  @Input() enableModification : boolean;
  @Input() is_sailor : boolean;
  customAlertOptions: any = {
    header: 'Select Quantity',
    translucent: true
  };

  constructor(private cartService: CartService,private router:Router) { }

  ngOnInit() {
    console.log(this.cartProduct,this.expeditionProduct)
    if (this.cartProduct){
      this.product = this.cartProduct.product;
    } else if(this.expeditionProduct) {
      this.product = this.expeditionProduct.product;
    }
  }

  getListQuantity(stock){
    return new Array(Math.round(stock)).fill(0).map((x,i)=>i+1);
  }
  removeFromCart() {
    this.cartService.removeCartProduct(this.cartProduct).subscribe();
  }
  quantityChanged(value) {
    this.cartProduct.quantity = value;
    this.cartService.updateCartProduct(this.cartProduct).subscribe();
  }
  arrayOne(n: number): any[] {
    return Array(Math.abs(n));
  }
}
