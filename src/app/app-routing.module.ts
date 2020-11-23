import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginActivate} from "./shared/activate/login-activate";
import {SailorActivate} from "./shared/activate/sailor-activate";
import {GlobalActivate} from "./shared/activate/global-activate";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'client',
    pathMatch: "full"
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule),
    canActivate: [GlobalActivate]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sailor',
    loadChildren: () => import('./sailor/sailor.module').then( m => m.SailorPageModule),
    canActivate: [SailorActivate]
  },
  {
    path: '404',
    loadChildren: () => import('./lost-connection/lost-connection.module').then(m => m.LostConnectionPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule),
    canActivate: [LoginActivate]
  },
  {
    path: 'lost-connection',
    loadChildren: () => import('./lost-connection/lost-connection.module').then( m => m.LostConnectionPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
