import { Component } from '@angular/core';

import {LoadingController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {User} from "./model/user.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public user:User;
  public loading = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    private userService: UserService,
    private loadingController: LoadingController,
  ) {
    this.initializeApp();

  }
  async ngOnInit() {
    await this.userService.autoLogin();
    await this.presentLoading();
    this.userService._userConnected.subscribe(user=>{
      if (user==null){
        this.user = new User();
      }else {
        this.user = user;
        this.loading = true;
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
  await this.userService.logout();
  await this.router.navigate(['/sign-in']);
  }
  async presentLoading() {
      this.userService.user_connected().subscribe(user=>{
        this.user = user;
        this.loading = true;
      })
  }

}
