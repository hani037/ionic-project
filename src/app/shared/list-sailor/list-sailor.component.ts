import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SailorService} from "../service/sailor.service";
import {IonInfiniteScroll, LoadingController, ModalController} from "@ionic/angular";
import {sailor} from "../../model/sailor";
import {Router} from "@angular/router";
import {RatingComponent} from "../rating/rating.component";
import {SearchComponent} from "../search/search.component";
import {SearchSailorsComponent} from "../search-sailors/search-sailors.component";

@Component({
  selector: 'app-list-sailor',
  templateUrl: './list-sailor.component.html',
  styleUrls: ['./list-sailor.component.scss'],
})
export class ListSailorComponent implements OnInit,OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public loading=false;
  public sailors:sailor[];
  public page=0;
  public is_search=false;
  public page_search=0;
  public size=3;
  public sailor_search;
  public distance_search;
  public latGeoPoint;
  public longGeoPoint;
  constructor(public modalController: ModalController,private loadingController: LoadingController,private sailorService: SailorService,public router:Router) { }

  ngOnInit() {

    this.presentLoading();

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.sailorService.getsailor_page(this.page,this.size).toPromise().then(data => {
        this.sailors = data.content;
        console.log(this.sailors)
        loading.dismiss();
        this.loading = true;
      }).catch(error=> {
        if(error.status == 504){
          this.router.navigate(['404'])
        }
      });;
    });

    const {role, data} = await loading.onDidDismiss();
  }
  set_search_data(sailor,distance,latGeoPoint,longGeoPoint){
    this.infiniteScroll.disabled = false;
    this.page_search = 0;
    this.sailor_search = sailor;
    this.distance_search = distance;
    this.latGeoPoint = latGeoPoint;
    this.longGeoPoint = longGeoPoint;
    this.sailorService.search(this.sailor_search,this.distance_search ,{latGeoPoint:this.latGeoPoint,longGeoPoint:this.longGeoPoint},this.page_search,this.size).subscribe(sailor=>{
      this.sailors = sailor.content;
      this.is_search = true;
    });
  }

  add_sailors(event) {
    if (this.is_search==false){
      this.page++;
      this.sailorService.getsailor_page(this.page,this.size).toPromise().then(sailors => {
        this.sailors.push(...sailors.content);
        event.target.complete();
        if (sailors.content.length==0){
          this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
        }

      }).catch(error=> {
        if(error.status == 504){
          this.router.navigate(['404'])
        }
      });
    }else {
      this.page_search++;
      this.sailorService.search(this.sailor_search,this.distance_search,{latGeoPoint:this.latGeoPoint,longGeoPoint:this.longGeoPoint},this.page_search,this.size).subscribe(sailors => {
        this.sailors.push(...sailors.content);
        event.target.complete();
        if (sailors.content.length==0){
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
}
