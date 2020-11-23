import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-lost-connection',
  templateUrl: './lost-connection.page.html',
  styleUrls: ['./lost-connection.page.scss'],
})
export class LostConnectionPage implements OnInit {

  constructor(private loadingController: LoadingController,private userService:UserService,private router:Router) { }

  ngOnInit() {
  }

  async refresh() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.userService.autoLogin().then(data => {
        this.router.navigate([''])
        loading.dismiss()
      })
          .catch(data=>loading.dismiss())
    })
  }
}
