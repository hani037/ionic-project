import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostConnectionPage } from './lost-connection.page';

const routes: Routes = [
  {
    path: '',
    component: LostConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostConnectionPageRoutingModule {}
