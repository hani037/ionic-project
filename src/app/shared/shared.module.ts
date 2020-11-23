import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductComponent} from './product/product.component';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {IonicModule} from '@ionic/angular';
import {StarsComponent} from './stars/stars.component';
import {CartProductComponent} from './cart-product/cart-product.component';
import {ProfileComponent} from "./profile/profile.component";
import {FormsModule} from "@angular/forms";
import {SailorProfileComponent} from "./sailor-profile/sailor-profile.component";
import {StarRatingModule} from "ionic5-star-rating";
import {RatingComponent} from "./rating/rating.component";
import {SearchComponent} from "./search/search.component";
import {SearchCommandeComponent} from "./search-commande/search-commande.component";
import {ListSailorComponent} from "./list-sailor/list-sailor.component";
import {SailorComponent} from "./sailor/sailor.component";
import {SearchSailorsComponent} from "./search-sailors/search-sailors.component";


@NgModule({
    declarations: [ProductListComponent, ProductDetailsComponent,RatingComponent,SearchComponent,SearchCommandeComponent,
        ListSailorComponent,SailorComponent,SearchSailorsComponent,
        ProductComponent, ToolBarComponent, StarsComponent, CartProductComponent, ProfileComponent, SailorProfileComponent],
    exports: [
        ToolBarComponent,
        CartProductComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        StarRatingModule
    ]
})
export class SharedModule { }
