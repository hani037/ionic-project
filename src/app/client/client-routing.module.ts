import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';
import {ProductListComponent} from '../shared/product-list/product-list.component';
import {ProductDetailsComponent} from '../shared/product-details/product-details.component';
import {ClientActivate} from "../shared/activate/client-activate";
import {ProfileComponent} from "../shared/profile/profile.component";
import {ExpeditionAddressComponent} from "./expedition-address/expedition-address.component";
import {ExpeditionDetailsComponent} from "./expedition-details/expedition-details.component";
import {StripePaymentComponent} from "./stripe-payment/stripe-payment.component";
import {PaymentFailedComponent} from "./payment-failed/payment-failed.component";
import {PaymentSuccessComponent} from "./payment-success/payment-success.component";
import {ListCommandeComponent} from "./list-commande/list-commande.component";
import {CommandeDetailsComponent} from "./commande-details/commande-details.component";
import {ListSailorComponent} from "../shared/list-sailor/list-sailor.component";
import {HoraireSailorComponent} from "./horaire-sailor/horaire-sailor.component";

const routes: Routes = [
  {
    path: '',
    component: ClientPage,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'boutique_sailor/:id',
        component: ProductListComponent
      },
      {
        path: 'boutique_sailor',
        component: ListSailorComponent
      },
      {
        path: 'horaire/:id',
        component: HoraireSailorComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate:[ClientActivate]

      },
      {
        path: 'address_confirmation',
        component: ExpeditionAddressComponent,
        canActivate:[ClientActivate]

      },
      {path: 'payment/failed', component: PaymentFailedComponent},
      {path: 'payment/success', component: PaymentSuccessComponent},
      {
        path: 'expedition',
        component: ExpeditionDetailsComponent,
        canActivate:[ClientActivate]

      },
      {
        path: 'commandes',
        component: ListCommandeComponent,
        canActivate:[ClientActivate]

      },
      {
        path: 'commandes/:id',
        component: CommandeDetailsComponent,
        canActivate:[ClientActivate]

      },
      {
        path: 'payment',
        component: StripePaymentComponent,
        canActivate:[ClientActivate]

      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
        canActivate:[ClientActivate]
      },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule {}
