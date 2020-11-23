import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../shared/service/order.service";
import {Order} from "../../model/order";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss'],
})
export class ListCommandeComponent implements OnInit,OnDestroy {
  public order:Order[];
  public loading=false;
  constructor(private router:Router,private orderService: OrderService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.orderService.getOrder().toPromise().then(order=>{
        console.log(order)
      this.order = order;
      this.loading = true;
      loading.dismiss();
      });
    }).catch(error=> {
      if(error.status == 504){
        this.router.navigate(['404'])
      }
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
