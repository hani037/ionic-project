import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {NgForm} from '@angular/forms';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public is_error:boolean=false;
  public error:string;
constructor(private loadingController: LoadingController,public router: Router, private userService: UserService) {
    this.userService.autoLogin();
  }

  ngOnInit() {
  }
  async sign_in(f: NgForm) {
    this.is_error = false;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present().then(() => {
      this.userService.login(f.value.login, f.value.password).then(user => {
        if(this.userService.userConnected.sailor){
          loading.dismiss();
          this.router.navigate(['/sailor']);
        }else {
          loading.dismiss();
          this.router.navigate(['/']);
        }

      }).catch(error=> {
        loading.dismiss();
        this.is_error = true;
        if(error.status == 500||error.status == 401){
          this.error = 'login ou mot de passe non valide'
        }else if(error.status == 504){
          this.router.navigate(['404'])
        }else{
          this.error = 'probléme de connexion'
        }
      });
    })

  }
}
