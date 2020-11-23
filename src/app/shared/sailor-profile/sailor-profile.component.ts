import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user.model";
import {UserService} from "../../service/user.service";
import {LoadingController, ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {PhotoService} from "../../sailor/services/photo.service";
import {SailorService} from "../service/sailor.service";
import {sailor} from "../../model/sailor";
import {Router} from "@angular/router";
import {Sailor} from "../../model/order";
import {data} from "@tensorflow/tfjs";
import {AddressService} from "../service/address.service";
declare var google;

@Component({
  selector: 'app-sailor-profile',
  templateUrl: './sailor-profile.component.html',
  styleUrls: ['./sailor-profile.component.scss'],
})
export class SailorProfileComponent implements OnInit,OnDestroy {
  lat;
  long;
  sailor: Sailor;
  public loading = false;
  public is_edit = false;
  public adresse;
  noImage = 'assets/img/no-profile.png';
  constructor(public userService: UserService, private loadingController: LoadingController,
              private photoService:PhotoService,private sailorService:SailorService,
              public addressService:AddressService,public zone: NgZone,
              private router:Router) {

  }

  ngOnInit() {
    this.presentLoading();
    this.sailorService.add_image.subscribe(async data=>{
      if (data==true){

          this.sailorService.getSailorByToken().subscribe(async data=>{
            this.sailor =data;
            const modal = await this.loadingController.getTop();
            if(modal){
              modal.dismiss();
            }
          })



      }
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
        this.sailorService.getSailorByToken().subscribe(data=>{
          console.log(data)
          this.sailor =data;
          this.long = this.userService.userConnected.lon;
          this.lat = this.userService.userConnected.lat;
          this.addressService.get_lat_long_to_address(this.userService.userConnected.lat,this.userService.userConnected.lon).subscribe(data=>{
            this.adresse = data.results[0].formatted_address;
            loading.dismiss();
            this.loading = true;
          })
        })


    });

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async modifierUser(userRegistrationForm: NgForm) {
    console.log('aa')
    const sailor = new Sailor();
    sailor.name = userRegistrationForm.value.name;
    sailor.description = userRegistrationForm.value.description;
    sailor.lon= this.long;
    sailor.lat= this.lat;
    const user = new User();
    user.userName = this.userService.userConnected.userName;
    user.email = this.userService.userConnected.email;
    user.name = this.userService.userConnected.name;
    user.lon= this.long;
    user.lat= this.lat;
    user.id = this.userService.userConnected.id;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {this.userService.updateUser(user).subscribe(user => {
      this.sailorService.updateSailor(sailor).toPromise().then(async user => {
        this.sailorService.getSailorByToken().subscribe(data => {
          loading.dismiss();
          this.is_edit = false;

        })
      }).catch(error => {
        if (error.status == 504) {
          loading.dismiss();
          this.router.navigate(['404'])
        }
      });
    });
    })
  }
  async addPhotoToGallery() {
         await this.photoService.addNewToGallery_sailor();

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
