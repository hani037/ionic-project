import { Injectable } from '@angular/core';
import {Address} from "../../model/user.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
declare var google: any;



@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private geocoder: any;

  addresssUrl = '/api/v1/address';

  constructor(private http: HttpClient) { }

  updateAddress(address): Observable<Address> {
    return this.http.put<Address>(this.addresssUrl, address);
  }

  getAddress(): Observable<Address[]> {
    return this.http.get<Address[]>(this.addresssUrl);
  }
  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }
  get_address_lat_long(address:string) {
    return this.http.get<address_resp>('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyAz_5xGEJZpM0BL-NQvJMz8pJUAnn0h7m0').toPromise();
    //return this.nativeGeocoder.forwardGeocode(address, this.options)
  }

  get_lat_long_to_address(lat,lng) {
    return this.http.get<{results:{formatted_address:string}[],status:string}>('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyAz_5xGEJZpM0BL-NQvJMz8pJUAnn0h7m0');
    //return this.nativeGeocoder.forwardGeocode(address, this.options)
  }
    createAddress(address) {
      return this.http.post<Address>(this.addresssUrl, address);

    }
}

