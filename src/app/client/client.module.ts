import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPageRoutingModule } from './client-routing.module';

import { ClientPage } from './client.page';
import {SharedModule} from "../shared/shared.module";
import {ExpeditionAddressComponent} from './expedition-address/expedition-address.component';
import {ExpeditionDetailsComponent} from "./expedition-details/expedition-details.component";
import {StripePaymentComponent} from "./stripe-payment/stripe-payment.component";
import {NgxStripeModule} from "ngx-stripe";
import {PaymentFailedComponent} from "./payment-failed/payment-failed.component";
import {PaymentSuccessComponent} from "./payment-success/payment-success.component";
import {CommandeComponent} from "./commande/commande.component";
import {CommandeDetailsComponent} from "./commande-details/commande-details.component";
import {ListCommandeComponent} from "./list-commande/list-commande.component";
import {HoraireSailorComponent} from "./horaire-sailor/horaire-sailor.component";
import {SailorPageModule} from "../sailor/sailor.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPageRoutingModule,
    SharedModule,
    NgxStripeModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51HHGViFQ3RxGrxCxiMCTLFryJ9s9Y8HrQAV4w78iA4VaqoLQ1Kj7W2NJCfHCQ0MblwrEp25UvYlb11whd2z15Tlp00EIysRl0a'),
    SailorPageModule

  ],
  declarations: [ClientPage, ExpeditionAddressComponent, ExpeditionDetailsComponent,HoraireSailorComponent,
    StripePaymentComponent, PaymentFailedComponent, PaymentSuccessComponent, CommandeComponent, CommandeDetailsComponent, ListCommandeComponent]
})
export class ClientPageModule {}
