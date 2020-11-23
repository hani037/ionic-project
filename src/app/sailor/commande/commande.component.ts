import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Expedition} from "../../model/order";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
})
export class CommandeComponent implements OnInit {
  @Input() expedition: Expedition;
  @Input() nb: number;
  public total=0;

  constructor(public router: Router) { }

  async ngOnInit() {
    await this.expedition.expeditionProducts.forEach(p =>{
      this.total += p.quantity * p.price;
    } );
  }

}
