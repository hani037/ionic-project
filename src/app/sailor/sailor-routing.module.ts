import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductCreationComponent} from "./product-creation/product-creation.component";
import {ExpeditionListComponent} from "./expedition-list/expedition-list.component";
import {SailorProductListComponent} from "./product-list/product-list.component";
import {SailorActivate} from "../shared/activate/sailor-activate";
import {ClientPage} from "../client/client.page";
import {SailorPage} from "./sailor.page";
import {SailorProfileComponent} from "../shared/sailor-profile/sailor-profile.component";
import {ListCommandeComponent} from "./list-commande/list-commande.component";
import {CommandeDetailsComponent} from "./commande-details/commande-details.component";
import {HoraireComponent} from "./horaire/horaire.component";

const routes: Routes = [
    {  path: '',
        component: SailorPage,
        children: [
            { path: 'product/create', component: ProductCreationComponent },
            { path: 'profile', component: SailorProfileComponent },
            { path: 'product/:id', component: ProductCreationComponent },
            { path: 'orders', component: ListCommandeComponent },
            { path: 'horaire', component: HoraireComponent },
            { path: 'orders/:id', component: ExpeditionListComponent },
            { path: '', component: SailorProductListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SailorPageRoutingModule {}
