import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/authInterceptor';
import {NativeHttpInterceptor} from "./interceptors/native-http.interceptor";
import {UserService} from "./service/user.service";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { APP_INITIALIZER } from '@angular/core';
import { StarRatingModule } from 'ionic5-star-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const interceptorProviders =
    [
      { provide: HTTP_INTERCEPTORS, useClass: NativeHttpInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ];
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ StarRatingModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot({
    name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
  }), BrowserAnimationsModule],
  providers: [

    StatusBar,
    SplashScreen,
    AndroidPermissions,
    HTTP,
    interceptorProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: (ds: UserService) =>async () => {
        const a = await ds.getToken();
        return ds.set_token(a);
      },
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
