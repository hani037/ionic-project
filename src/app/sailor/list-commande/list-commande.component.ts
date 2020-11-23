import {Component, OnDestroy, OnInit} from '@angular/core';
import {Expedition} from "../../model/order";
import {ExpeditionService} from "../../shared/service/expedition.service";
import {PaymentService} from "../../shared/service/payment.service";
import {LoadingController, ModalController} from "@ionic/angular";
import {OrderService} from "../../shared/service/order.service";
import {SearchComponent} from "../../shared/search/search.component";
import {SearchCommandeComponent} from "../../shared/search-commande/search-commande.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss'],
})
export class ListCommandeComponent implements OnInit,OnDestroy {

  expeditions: Expedition[];
  public loading = false;
  public search_:string;
  public select_:number;
  public is_search=false;
  constructor(private router:Router,private expeditionService: ExpeditionService, private paymentService: PaymentService,
              private loadingController: LoadingController, private orderService: OrderService,
              public modalController: ModalController) {

  }


  ngOnInit() {
    this.presentLoading();

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {

      this.expeditionService.getExpeditionSailor().toPromise().then(expeditions => {
        this.expeditions = expeditions;
        console.log(expeditions);
        loading.dismiss();
        this.loading = true;
      }).catch(error=> {
        if(error.status == 504){
          this.router.navigate(['404'])
        }
      });;

    });

    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async search() {
    const modal = await this.modalController.create({
      component: SearchCommandeComponent,
      cssClass: 'my-custom-class',

    });
    modal.onDidDismiss().then(data=>{
      console.log(data)
      if(data.data){
        this.is_search = true;
        this.search_ = data.data.search;
        this.select_ = data.data.select;
        //this.set_search_data(data.data.product_search,data.data.distance_search,data.data.latGeoPoint,data.data.longGeoPoint)
      }
    });
    return await modal.present();
  }

  cancel_search() {
    this.select_=0;
    this.search_=null;
    this.is_search = false
  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
}
