import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-search-commande',
  templateUrl: './search-commande.component.html',
  styleUrls: ['./search-commande.component.scss'],
})
export class SearchCommandeComponent implements OnInit {
    search: string ;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  public close(){
    this.modalController.dismiss(null);

  }
  search_(search,select){
    this.modalController.dismiss({search,select});

  }
}
