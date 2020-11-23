import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {LoadingController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AddressService} from "../service/address.service";
declare var google;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit,OnDestroy {
  user: User;
  lat;
  long;
  public adresse;
  public loading = false;
  public is_edit = false;

  constructor(public addressService:AddressService,private userService: UserService, private loadingController: LoadingController,private router:Router) { }

  ngOnInit() {
    this.presentLoading();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.userService._userConnected.subscribe(user => {
        this.user = user;
        this.long = this.userService.userConnected.lon;
        this.lat = this.userService.userConnected.lat;
        this.addressService.get_lat_long_to_address(this.userService.userConnected.lat,this.userService.userConnected.lon).subscribe(data=>{
          console.log(data)
          if (data.status!=='ZERO_RESULTS'){
            this.adresse = data.results[0].formatted_address;
            loading.dismiss();
            this.loading = true;
          }else {
            loading.dismiss();
            this.loading = true;
          }

        })
      })

    });

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  modifierUser(userRegistrationForm: NgForm) {
    const user = new User();
    user.userName = userRegistrationForm.value.login;
    user.firstName = userRegistrationForm.value.prenom;
    user.lastName = userRegistrationForm.value.nom;
    user.lon= this.long;
    user.lat= this.lat;
    user.id = this.user.id;
    console.log(user);
    this.userService.updateUser(user).subscribe(user => {
      console.log(user);
      this.is_edit = false;
    });
  }
  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
  public address(){
    let input = document.getElementById('googlePlaces').getElementsByTagName('input')[0];
    let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // retrieve the place object for your use
      let place = autocomplete.getPlace();
      this.adresse = place.formatted_address;
      this.lat=place.geometry.location.lat();
      this.long=place.geometry.location.lng()
    })
  }
  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.

  ClearAutocomplete() {
    this.long = null;
    this.lat = null;
  }
}
