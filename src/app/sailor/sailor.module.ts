import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SailorPageRoutingModule } from './sailor-routing.module';

import { SailorPage } from './sailor.page';
import {SharedModule} from "../shared/shared.module";
import {SailorProductListComponent} from "./product-list/product-list.component";
import {ProductCreationComponent} from "./product-creation/product-creation.component";
import {ExpeditionListComponent} from "./expedition-list/expedition-list.component";
import {ToolBarSailorComponent} from "../shared/tool-bar-sailor/tool-bar-sailor.component";
import {CommandeComponent} from "./commande/commande.component";
import {CommandeDetailsComponent} from "./commande-details/commande-details.component";
import {ListCommandeComponent} from "./list-commande/list-commande.component";
import {HoraireComponent} from "./horaire/horaire.component";
import {DaysComponent} from "./days/days.component";
import {FilterCommandePipe} from "../filter-commande.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SailorPageRoutingModule,
        SharedModule
    ],
    exports: [
        DaysComponent
    ],
    declarations: [SailorPage, SailorProductListComponent, ProductCreationComponent, ExpeditionListComponent, FilterCommandePipe,

        ToolBarSailorComponent, CommandeComponent, CommandeDetailsComponent, ListCommandeComponent, HoraireComponent, DaysComponent]
})
export class SailorPageModule {}
