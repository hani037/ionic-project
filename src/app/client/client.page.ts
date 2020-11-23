import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor(     private alertController: AlertController, private location: Location,private router: Router,private platform: Platform) { }

  ngOnInit() {
    this.backButtonEvent();
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
        console.log(this.router.url);
        if (this.router.url != '/client') {
          console.log('a2');
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === '/client') {
          console.log('a1');
            this.presentAlertConfirm();
        }
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Voulez-vous vraiment quitter l\'application?',
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Fermer l\'application',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }
}
