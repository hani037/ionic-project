import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AlertController, IonRouterOutlet, Platform} from "@ionic/angular";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sailor',
  templateUrl: './sailor.page.html',
  styleUrls: ['./sailor.page.scss'],
})
export class SailorPage implements OnInit {


  constructor(     private alertController: AlertController, private location: Location,private router: Router,private platform: Platform) { }

  ngOnInit() {
    this.backButtonEvent();

  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

        if (this.router.url != '/sailor') {
          // await this.router.navigate(['/']);
          await this.location.back();
        } else if (this.router.url === '/sailor') {
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
