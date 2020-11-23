import {Component, OnDestroy, OnInit} from '@angular/core';
import {HoraireService} from "../services/horaire.service";
import {Horaire} from "../../model/horaire";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.scss'],
})
export class HoraireComponent implements OnInit,OnDestroy {
  public _horaire:Horaire;
  public loading = false;
  constructor(private horaireService:HoraireService,private loadingController: LoadingController) { }

  async ngOnInit() {

      await this.presentLoading();
      this.horaireService._horaire.subscribe(data=>{
          this._horaire = data;
      })

  }
    async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'S\'il vous plaît, attendez...',
        });
        await loading.present().then(async () => {
            await this.horaireService.get_horaire().catch(data=>{
                this.horaireService.set_horaire().subscribe();
            });
            this.horaireService._horaire.subscribe(data=>{
                this._horaire = data;
                loading.dismiss();
                this.loading = true;
            })


        });

        const { role, data } = await loading.onDidDismiss();
    }

    modifier() {
        this.horaireService.modifier_horaire().subscribe(data=>{
            console.log(data)
        })
    }
    async ngOnDestroy(){
        const modal = await this.loadingController.getTop();
        if(modal){
            modal.dismiss();
        }
    }
}
