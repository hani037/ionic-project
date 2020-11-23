import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/chart.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {ExpeditionService} from "../service/expedition.service";

@Component({
  selector: 'app-tool-bar-sailor',
  templateUrl: './tool-bar-sailor.component.html',
  styleUrls: ['./tool-bar-sailor.component.scss'],
})
export class ToolBarSailorComponent implements OnInit {


  number_expedition = 0;
  constructor(private expeditionService: ExpeditionService, public router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.isLoggedInObservable().subscribe(userConnected => {
      if (userConnected){
        if(userConnected.sailor) {
          this.expeditionService.getExpeditionSailor().subscribe(expedition => {
            this.number_expedition = expedition.length;

          });
        }
      }

    });
  }

}
