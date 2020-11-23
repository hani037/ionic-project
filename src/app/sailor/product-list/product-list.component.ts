import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/service/product.service";
import {Product} from "../../model/product";
import {UserService} from "../../service/user.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sailor-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class SailorProductListComponent implements OnInit,OnDestroy {


  constructor(private productService: ProductService,public router:Router,
              private userService: UserService,private loadingController: LoadingController) { }

  public products : Product[];
  loading = false;
  ngOnInit() {
    this.presentLoading();




  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.productService.getProductsOfConnectedSailor().toPromise().then(products => {
        this.products = products;
        loading.dismiss();
        this.loading = true;
      }).catch(error=> {
        if(error.status == 504){
          this.router.navigate(['404'])
        }
      });


    });

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

    create() {
        this.router.navigate(['sailor/product/create'])
    }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
}

