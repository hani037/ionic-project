import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
import {AddressService} from "../shared/service/address.service";
import {Address_lat_long} from "../model/address_lat_long";
import {LoadingController} from "@ionic/angular";
declare var google;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
        lat;
        long;
        public Address_status:boolean=false;
        public sel = 1;
        public is_sailor= false;
    public is_error:boolean=false;
    public error:string;
  constructor(private loadingController: LoadingController,public router: Router,
              private userService: UserService,private addressService: AddressService,public zone: NgZone) {

  }


  ngOnInit() {
  }


  async createUser(userRegistrationForm: NgForm) {
      const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
      });
      await loading.present().then(async () => {
      this.Address_status= false;
      this.is_error = false;
    const user = new User();
    if(!this.is_sailor){
        user.firstName = userRegistrationForm.value.prenom;
        user.lastName = userRegistrationForm.value.nom;
    }else{
        user.name = userRegistrationForm.value.name;
        user.description = userRegistrationForm.value.description;
    }
      user.userName = userRegistrationForm.value.login;
      user.password = userRegistrationForm.value.password;
    user.email = userRegistrationForm.value.email;
    user.sailor = this.is_sailor;



       let address:address_resp;

            user.lon= this.long;
            user.lat= this.lat;
            this.userService.createUser(user).then(
                user => {
                    // this.userService.users.push(user);
                    loading.dismiss();
                    this.router.navigate(['/sign-in']);
                    console.log(user);
                }).catch(error=>{
                loading.dismiss();
                this.is_error = true;
                if(error.status == 500){
                    this.error = 'login existe'
                }else if (error.status == 504) {
                    this.error = 'probléme de connexion'

                }
            })

      });
    }

    next(checked: boolean) {
        this.sel = 2;
        this.is_sailor = checked;
    }

    sign_in() {
      this.sel = 1;
      this.is_error = false;
        this.router.navigate(['sign-in']);
    }
    public address(){
        let input = document.getElementById('googlePlaces').getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            // retrieve the place object for your use
            let place = autocomplete.getPlace();
            this.lat=place.geometry.location.lat();
            this.long=place.geometry.location.lng()
        })
    }

    ClearAutocomplete() {
        this.long = null;
        this.lat = null;
    }
}
