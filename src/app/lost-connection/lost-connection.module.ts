import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostConnectionPageRoutingModule } from './lost-connection-routing.module';

import { LostConnectionPage } from './lost-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostConnectionPageRoutingModule
  ],
  declarations: [LostConnectionPage]
})
export class LostConnectionPageModule {}
