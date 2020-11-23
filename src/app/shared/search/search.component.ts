import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AddressService} from "../service/address.service";
import {UserService} from "../../service/user.service";
declare var google;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild("places")
  public places: ElementRef;
  public Address_status:boolean=false;
  lat;
  long;
  constructor(public modalController: ModalController,private addressService:AddressService,private userService:UserService,public zone: NgZone,) {

}

  ngOnInit() {

  }

  search_with_my_position(product: string , distance:  number) {
    const product_search = product;
    const distance_search = distance;
    navigator.geolocation.getCurrentPosition((position: Position) => {
      const latGeoPoint = position.coords.latitude;
      const longGeoPoint = position.coords.longitude;
      this.dismissModal(product_search,distance_search,latGeoPoint,longGeoPoint);
    })
  }

  async search_with_address(product: string, distance: number) {
    const product_search = product;
    const distance_search = distance;
      const latGeoPoint = this.lat;
      const longGeoPoint = this.long;
      this.dismissModal(product_search, distance_search, latGeoPoint, longGeoPoint);
  }
  dismissModal(product_search,distance_search,latGeoPoint,longGeoPoint) {
    let data={
      product_search,
      distance_search,
      latGeoPoint,
      longGeoPoint,
    }
    this.modalController.dismiss(data);
  }
  public close(){
    this.modalController.dismiss(null);

  }

  search_with_my_adresse(product: string , distance:  number) {
    const product_search = product;
    const distance_search = distance;
    this.dismissModal(product_search,distance_search,this.userService.userConnected.lat,this.userService.userConnected.lon);
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
  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.

  ClearAutocomplete() {
    this.long = null;
    this.lat = null;
  }
}
