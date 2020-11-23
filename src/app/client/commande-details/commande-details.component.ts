import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../shared/service/order.service";
import {Order} from "../../model/order";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.scss'],
})
export class CommandeDetailsComponent implements OnInit,OnDestroy {
  public id;
  public order:Order;
  public loading = false;
  constructor(private route: ActivatedRoute,private orderService: OrderService, private loadingController: LoadingController,
              private router:Router
  ) { }

  ngOnInit() {
    this.presentLoading();


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.route.params.subscribe(params => {
        this.id = +params.id;
        this.orderService.getOrder().toPromise().then(order=>{
          this.order = order[this.id];
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
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
}
