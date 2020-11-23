import {Component, OnDestroy, OnInit} from '@angular/core';
import {Expedition} from "../../model/order";
import {PaymentService} from "../../shared/service/payment.service";
import {ExpeditionService} from "../../shared/service/expedition.service";
import {LoadingController} from "@ionic/angular";
import {OrderService} from "../../shared/service/order.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-expedition-list',
  templateUrl: './expedition-list.component.html',
  styleUrls: ['./expedition-list.component.scss'],
})
export class ExpeditionListComponent implements OnInit,OnDestroy {
  expeditions : Expedition;
  public loading = false;
  public id;
  constructor(private router:Router,private expeditionService: ExpeditionService, private paymentService: PaymentService,
              private loadingController: LoadingController, private orderService: OrderService,private route: ActivatedRoute,) {

  }


  ngOnInit() {
    this.presentLoading();


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez....',
    });
    await loading.present().then(() => {
      this.route.params.subscribe(params => {
        this.id = +params.id;
        this.expeditionService.getExpeditionSailor().toPromise().then(exception=>{
          this.expeditions = exception[this.id];
          loading.dismiss();
          this.loading = true;
        }).catch(error=> {
          if(error.status == 504){
            this.router.navigate(['404'])
          }
        });;
      });
    });

    const { role, data } = await loading.onDidDismiss();
  }

  changer_status(action: string) {
    this.expeditionService.changer_status(action, this.expeditions.id).toPromise().then(data=>{
      console.log(data)
      this.expeditions = data;
    }).catch(error=> {
      if(error.status == 504){
        this.router.navigate(['404'])
      }
    });
  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
}
