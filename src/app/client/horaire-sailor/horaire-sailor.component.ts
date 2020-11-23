import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Horaire} from "../../model/horaire";
import {HoraireService} from "../../sailor/services/horaire.service";
import {LoadingController, ModalController} from "@ionic/angular";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {sailor} from "../../model/sailor";
import {SailorService} from "../../shared/service/sailor.service";

@Component({
  selector: 'app-horaire-sailor',
  templateUrl: './horaire-sailor.component.html',
  styleUrls: ['./horaire-sailor.component.scss'],
})
export class HoraireSailorComponent implements OnInit,OnDestroy {
  public _horaire:Horaire;
  public loading = false;
  public without_horaire =false;
  @Input() sailor:sailor;
  id;
  noImage = 'assets/img/no-profile.png';

  constructor(private sailorService:SailorService,public modalController: ModalController,private router:Router,private horaireService:HoraireService,private loadingController: LoadingController,private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id = params.id
    })
    if (this.sailor){
      this.id = this.sailor.userId
    }

    await this.presentLoading();


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(async () => {
       this.horaireService.get_horaire_sailor(this.id).toPromise().then(data=>{
         this._horaire =data;
         this.loading = true;
        loading.dismiss();
      }).catch(error=> {
         if(error.status == 504){
           this.router.navigate(['404'])
         }
         loading.dismiss();
          this.without_horaire = true;
         this.loading = true;

       })


    });

    const { role, data } = await loading.onDidDismiss();
  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
  public close(){
    this.modalController.dismiss(null);

  }
}
