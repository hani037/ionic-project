import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../../model/product';
import {IonInfiniteScroll, LoadingController, ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../../sailor/services/photo.service";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {Address_lat_long} from "../../model/address_lat_long";
import {AddressService} from "../service/address.service";
import {CartService} from "../../service/chart.service";
import {RatingComponent} from "../rating/rating.component";
import {SearchComponent} from "../search/search.component";
import {data} from "@tensorflow/tfjs";
import {HoraireService} from "../../sailor/services/horaire.service";
import {Period} from "../../model/horaire";
import {SailorService} from "../service/sailor.service";
import {sailor} from "../../model/sailor";
import {Sailor} from "../../model/order";
import {HoraireSailorComponent} from "../../client/horaire-sailor/horaire-sailor.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit,OnDestroy {
  constructor(private loadingController: LoadingController,
              private productService: ProductService,
              public userservice: UserService,
              private horaireService:HoraireService,
              private addressService: AddressService,
              private sailorService:SailorService,
              public router:Router, private route: ActivatedRoute,
              public modalController: ModalController) {

  }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  customAlertOptions: any = {
    header: 'Search BY',
    translucent: true
  };
  public length = 5;
  public products: Product[];
  public loading = false;
  public sailor:Sailor;
  public id;
  public page=0;
  public is_search=false;
  public page_search=0;
  public size=6;
  public product_search;
  public distance_search;
  public latGeoPoint;
  public longGeoPoint;
  public sailor_id;
  public sailor_has_horaire=false;
  public sailor_is_open=false;
  public next_time_open:Period;
  @ViewChild('address') address:string=null;
  ngOnInit() {
    this.presentLoading();
    this.length = 5;
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.route.params.subscribe(params => {
        this.id = +params.id;
      });
      if(this.id){
        this.productService.getProductsOfSailor(this.id).toPromise().then(products => {
          console.log(products)
          this.products = products;
          this.sailorService.getSailor(this.id).subscribe(data=>{
            this.sailor = data;
            this.select_horaire();

          })


        }).catch(error=> {
          if(error.status == 504){
            this.router.navigate(['404'])
          }
        });
      }else  {
        /*
        this.productService.getProducts().subscribe(products=>{
          this.products = products;
          loading.dismiss();
          this.loading = true;
        })

         */
       this.productService.getProducts_page(this.page, this.size).toPromise().then(products => {
          console.log(products.content)
          this.products = products.content;
          loading.dismiss();
          this.loading = true;

        }).catch(error=> {
         if(error.status == 504){
           this.router.navigate(['404'])
         }
       });;


      }
    });

    const { role, data } = await loading.onDidDismiss();
  }

  set_search_data(product,distance,latGeoPoint,longGeoPoint){
    this.infiniteScroll.disabled = false;
    this.page_search = 0;
    this.product_search = product;
    this.distance_search = distance;
    this.latGeoPoint = latGeoPoint;
    this.longGeoPoint = longGeoPoint;
    this.productService.search(this.product_search,this.distance_search ,{latGeoPoint:this.latGeoPoint,longGeoPoint:this.longGeoPoint},this.page_search,this.size).subscribe(product=>{
      this.products = product.content;
      this.is_search = true;
    });
  }

  add_products(event) {
      if (this.is_search==false){
        this.page++;
        this.productService.getProducts_page(this.page,this.size).toPromise().then(products => {
          this.products.push(...products.content);
          event.target.complete();
          if (products.content.length==0){
            this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
          }

        }).catch(error=> {
          if(error.status == 504){
            this.router.navigate(['404'])
          }
        });
      }else {
        this.page_search++;
        this.productService.search(this.product_search,this.distance_search,{latGeoPoint:this.latGeoPoint,longGeoPoint:this.longGeoPoint},this.page_search,this.size).subscribe(products => {
          this.products.push(...products.content);
          event.target.complete();
          if (products.content.length==0){
            this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
          }

        })
      }

    }
    async cancel_search() {
      this.infiniteScroll.disabled = false;
      this.is_search = false;
        this.page_search = 0;
        this.page = 0;
        await this.presentLoading();
    }

  async rate() {
    const modal = await this.modalController.create({
      component: RatingComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'sailor': this.id
      }
    });
    return await modal.present();
  }

    async search() {
      const modal = await this.modalController.create({
        component: SearchComponent,
        cssClass: 'my-custom-class',

      });
       modal.onDidDismiss().then(data=>{
        if(data.data){
          console.log(data.data);
          this.set_search_data(data.data.product_search,data.data.distance_search,data.data.latGeoPoint,data.data.longGeoPoint)
        }
      });
      return await modal.present();
    }

  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }

  private select_horaire() {
    this.horaireService.get_horaire_sailor(this.sailor.userId).toPromise().then(async data=> {
      this.sailor_has_horaire = true;
      let today = new Date();
      if (today.getDay() == 1) {
        if (data.monday.length > 0) {
          for (let i = 0; i < data.monday.length; i++) {
            if(today.getHours()>+data.monday[i].start.split(':')[0]&&today.getHours()<+data.monday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.monday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.monday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.monday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.monday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.monday[i].start.split(':')[0]){
              this.next_time_open = data.monday[i];
              break;
            }else if(today.getHours()>+data.monday[i].end.split(':')[0]){
              if(i==data.monday.length-1){
                break;
              }

            }
          }
        }
      }else if (today.getDay() == 2) {
        if (data.tuesday.length > 0) {
          for (let i = 0; i < data.tuesday.length; i++) {
            if(today.getHours()>+data.tuesday[i].start.split(':')[0]&&today.getHours()<+data.tuesday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.tuesday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.tuesday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.tuesday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.tuesday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.tuesday[i].start.split(':')[0]){
              this.next_time_open = data.tuesday[i];
              break;
            }else if(today.getHours()>+data.tuesday[i].end.split(':')[0]){
              if(i==data.tuesday.length-1){
                break;
              }

            }
          }
        }
      }else if (today.getDay() == 3) {
        if (data.wednesday.length > 0) {
          for (let i = 0; i < data.wednesday.length; i++) {
            if(today.getHours()>+data.wednesday[i].start.split(':')[0]&&today.getHours()<+data.wednesday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.wednesday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.wednesday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.wednesday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.wednesday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.wednesday[i].start.split(':')[0]){
              this.next_time_open = data.wednesday[i];
              break;
            }else if(today.getHours()>+data.wednesday[i].end.split(':')[0]){
              if(i==data.wednesday.length-1){
                break;
              }

            }
          }
        }
      }else if (today.getDay() == 4) {
        if (data.thursday.length > 0) {
          for (let i = 0; i < data.thursday.length; i++) {
            if(today.getHours()>+data.thursday[i].start.split(':')[0]&&today.getHours()<+data.thursday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.thursday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.thursday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.thursday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.thursday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.thursday[i].start.split(':')[0]){
              this.next_time_open = data.thursday[i];
              break;
            }else if(today.getHours()>+data.thursday[i].end.split(':')[0]){
              if(i==data.thursday.length-1){
                break;
              }

            }
          }
        }
      }else if (today.getDay() == 5) {
        if (data.friday.length > 0) {
          for (let i = 0; i < data.friday.length; i++) {
            if(today.getHours()>+data.friday[i].start.split(':')[0]&&today.getHours()<+data.friday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.friday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.friday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.friday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.friday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.friday[i].start.split(':')[0]){
              this.next_time_open = data.friday[i];
              break;
            }else if(today.getHours()>+data.friday[i].end.split(':')[0]){
              if(i==data.monday.length-1){
                break;
              }

            }
          }
        }
      }else if (today.getDay() == 6) {
        if (data.saturday.length > 0) {
          for (let i = 0; i < data.saturday.length; i++) {
            if(today.getHours()>+data.saturday[i].start.split(':')[0]&&today.getHours()<+data.saturday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.saturday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.saturday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.saturday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.saturday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.saturday[i].start.split(':')[0]){
              this.next_time_open = data.saturday[i];
              break;
            }else if(today.getHours()>+data.saturday[i].end.split(':')[0]){
              if(i==data.saturday.length-1){
                break;
              }

            }
          }
        }
      }else  {
        if (data.sunday.length > 0) {
          for (let i = 0; i < data.sunday.length; i++) {
            if(today.getHours()>+data.sunday[i].start.split(':')[0]&&today.getHours()<+data.sunday[i].end.split(':')[0]){
              this.sailor_is_open = true;
              break;
            }else if(today.getHours()==+data.sunday[i].start.split(':')[0]){
              if(today.getMinutes()<+data.sunday[i].start.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()==+data.sunday[i].end.split(':')[0]){
              if(today.getMinutes()<+data.sunday[i].end.split(':')[1]){
                this.sailor_is_open = true;
                break;
              }
            }else if(today.getHours()<+data.sunday[i].start.split(':')[0]){
              this.next_time_open = data.sunday[i];
              break;
            }else if(today.getHours()>+data.sunday[i].end.split(':')[0]){
              if(i==data.monday.length-1){
                break;
              }

            }
          }
        }
      }
      const modal = await this.loadingController.getTop();
      if(modal){
        modal.dismiss();
        this.loading = true;

      }
    }).catch(async data=>{
      const modal = await this.loadingController.getTop();
      if(modal){
        modal.dismiss();
        this.loading = true;

      }
    })

  }
  async horaire() {
    const modal = await this.modalController.create({
      component: HoraireSailorComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'sailor': this.sailor
      }

    });

    return await modal.present();
  }
}
