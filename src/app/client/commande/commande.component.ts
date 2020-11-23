import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Expedition} from "../../model/order";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
})
export class CommandeComponent implements OnInit {
  public total=0;
  public loading = false;
  constructor(public router: Router) { }
  @Input() expedition: Expedition[];
  @Input() nb: number;
  @Input() status: string;
  async ngOnInit() {
    await this.expedition.forEach(e => e.expeditionProducts.forEach(p =>{
      this.total += p.quantity * p.price;
    } ));
    this.loading = true;
  }

  navigate() {
    if(this.status=='PAYED'){
      this.router.navigate(['client/commandes/'+this.nb])
    }else{
      this.router.navigate(['client/expedition'])

    }
  }
}
