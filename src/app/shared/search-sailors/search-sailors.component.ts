import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-search-sailors',
  templateUrl: './search-sailors.component.html',
  styleUrls: ['./search-sailors.component.scss'],
})
export class SearchSailorsComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  public close(){
    this.modalController.dismiss(null);

  }
}
