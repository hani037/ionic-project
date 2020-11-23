import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../service/product.service';
import {CartService} from '../../service/chart.service';
import {UserService} from '../../service/user.service';
import {Product} from '../../model/product';
import {LoadingController, ModalController} from '@ionic/angular';
import {RatingComponent} from "../rating/rating.component";
import {ReviewService} from "../service/review.service";
import {ClientReview} from "../../model/ClientReview";
import {HoraireService} from "../../sailor/services/horaire.service";
import {SearchComponent} from "../search/search.component";
import {HoraireSailorComponent} from "../../client/horaire-sailor/horaire-sailor.component";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit,OnDestroy {


  public product: Product;
  public listQuantity: number[] = [];
  noImage = 'assets/img/no-image.jpg';
  public selectedQuantity = 1;
  public loading = false;
  public bool = false;
  public ClientReview:ClientReview[];
  customAlertOptions: any = {
    header: 'Select Quantity',
    translucent: true
  };
  // tslint:disable-next-line:ban-types
  public id: Number;
  slideOpts = {
    effect: 'flip'
  };
    sel_description: boolean = false;
  sel_vendeur: boolean = false;

  constructor(private loadingController: LoadingController,
              private productService: ProductService,
              private route: ActivatedRoute,
              public router: Router,
              private userService: UserService,
              private cartService: CartService,
              public reviewService:ReviewService,
              public horaireService:HoraireService,
              public modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.presentLoading();
    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    if (this.userService.userConnected.id){
      this.get_product_review();

    }
  }
  get_product_review(){
    this.reviewService.get_product_review(this.id).subscribe(data=>{
      console.log(data)
      this.ClientReview=data;
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.productService.getProduct(this.id).subscribe(p => {
        this.product = p;
        console.log(this.product);
        loading.dismiss();
        this.loading = true;

        Array(Math.round(Math.abs(this.product.stock))).fill(0).map((x, i) => this.listQuantity.push(i + 1));
      });
    });

    const {role, data} = await loading.onDidDismiss();
  }

  arrayOne(n: number): any[] {
    return Array(Math.abs(n));
  }

  addToCart() {
    this.userService.isLoggedInObservable().subscribe( userConnected => {
      console.log('a')
      if (userConnected) {
        this.cartService.addCartProduct(this.product, this.selectedQuantity).subscribe( us => {
          this.router.navigate(['client/cart']);
        });
      } else {
        this.router.navigate(['sign-in']);
      }
    })
  }
  public async rate(){
    if(this.userService.userConnected.id){
    const modal = await this.modalController.create({
      component: RatingComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'product': this.product
      }
    });
    modal.onDidDismiss().then(data=>{
      console.log('aa',data)
      if(data.data){
        this.presentLoading();
        this.get_product_review();
      }
    })
    return await modal.present();
    }else {
      this.router.navigate(['sign-in'])
    }
  }

  async edit_review(review: ClientReview) {
      const modal = await this.modalController.create({
        component: RatingComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          'product': this.product,
          'review': review
        }
      });
      modal.onDidDismiss().then(data=>{
        console.log('aa',data)
        if(data.data){
          this.presentLoading();
          this.get_product_review();
        }
      })
      return await modal.present();


  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }

  async horaire() {
    const modal = await this.modalController.create({
      component: HoraireSailorComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'sailor': this.product.sailor
      }

    });

    return await modal.present();
  }
}
