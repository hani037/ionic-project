import {Component, Input, OnInit} from '@angular/core';
import {HoraireService} from "../services/horaire.service";
import {Period} from "../../model/horaire";

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
})
export class DaysComponent implements OnInit {
  @Input() name:string;
  @Input() client_view;
  @Input() period:Period[];
  public clicked= false;

  constructor(private horaireService: HoraireService) {

  }

  ngOnInit() {
    if(this.period==null) {
      this.period = [];
    }
   // this.checked = this.day.open;
    this.horaireService._clicked.subscribe(value => {
      if (value==true){
        this.clicked=false;
      }
    })
  }

  clicked_() {
    this.horaireService.clicked();
    this.clicked =true;
  }

  start_time(value: string, i: number) {
  this.horaireService.modifier_start(this.name,i,value);
  }

  end_time(value: string, i: number) {
    this.horaireService.modifier_end(this.name,i,value);

  }

  cancel(i:number) {
    this.horaireService.cancel(this.name,i);
  }

  add() {
    this.horaireService.add(this.name)
  }

  cancel_all(checked: boolean) {
    if (checked==false){
      this.horaireService.cancel_all(this.name)
    }else if (this.period.length==0) {
      this.add();
      this.clicked_();
    }
  }
}
