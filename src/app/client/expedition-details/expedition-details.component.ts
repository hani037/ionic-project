import {Component, OnDestroy, OnInit} from '@angular/core';
import {Expedition, Order} from "../../model/order";
import {OrderService} from "../../shared/service/order.service";
import {PaymentService} from "../../shared/service/payment.service";
import {LoadingController} from "@ionic/angular";
import {ExpeditionService} from "../../shared/service/expedition.service";
import {Router} from "@angular/router";
declare var Stripe;
@Component({
  selector: 'app-expedition-details',
  templateUrl: './expedition-details.component.html',
  styleUrls: ['./expedition-details.component.scss'],
})
export class ExpeditionDetailsComponent implements OnInit,OnDestroy {
  public loading = false;
  order : Order;
  expeditions : Expedition[];

  total : number = 0;
  constructor(private orderService: OrderService, private paymentService: PaymentService,
              private loadingController: LoadingController,private expeditionService: ExpeditionService,public router: Router) {

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
      this.orderService.createDraftOrder().toPromise().then(order => {
        console.log(order);
        this.order = order;
        loading.dismiss();
        this.loading = true;
        this.order.expeditions.forEach(e => e.expeditionProducts.forEach(p => this.total += p.quantity * p.product.price));
      }).catch(error=> {
        if(error.status == 504){
          this.router.navigate(['404'])
        }
      });

    });

    const { role, data } = await loading.onDidDismiss();
  }


  passerPayment(){
    this.router.navigate(['/client/payment']);

    /* this.paymentService.createSession(this.order.id).subscribe(session => {
       console.log(session)
       this.paymentService.validatePayment(this.order.id,session.id).subscribe(res=>{
         console.log(res);
       })
       /*const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
       stripe.redirectToCheckout({
         // Make the id field from the Checkout Session creation API response
         // available to this file, so you can provide it as parameter here
         // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
         sessionId: session.id
         // tslint:disable-next-line:only-arrow-functions
       }).then(function(result) {
         // If `redirectToCheckout` fails due to a browser or network
         // error, display the localized error message to your customer
         // using `result.error.message`.
       });
     });

     */
  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }

}
