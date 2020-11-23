import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../service/chart.service";
import {UserService} from "../../service/user.service";
import {AddressService} from "../../shared/service/address.service";
import {Address} from "../../model/user.model";
import {NgForm} from "@angular/forms";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-expedition-address',
  templateUrl: './expedition-address.component.html',
  styleUrls: ['./expedition-address.component.scss'],
})
export class ExpeditionAddressComponent implements OnInit,OnDestroy {
  public loading = false;
  @ViewChild('form1', { read: NgForm }) f1: any;
  @ViewChild('form2', { read: NgForm }) f2: any;
  constructor(private userService: UserService,
              private addressService: AddressService,
              private cartService: CartService,
              public router: Router,
              private loadingController: LoadingController) {
  }

  address: Address;
  edit = false;

  ngOnInit() {
    this.presentLoading();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      this.addressService.getAddress().subscribe(adressList => {
        console.log(adressList)
        if (adressList && adressList.length > 0) {
          this.address = adressList[0];
        }
        loading.dismiss();
        this.loading = true;
      });

    });

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  confirmAddress(addressId) {
    this.cartService.chooseCartAddress(addressId).subscribe(() => {
      this.router.navigate(['/client/expedition']);
    });
  }

  updateAddress() {
    console.log(this.f1.value.name);
    const address = {
      id: this.address.id,
      name: this.f1.value.name,
      addressLigne1: this.f1.value.address1,
      addressLigne2: this.f1.value.address2,
      city: this.f1.value.city,
      country: this.f1.value.country,
      zipCode: this.f1.value.zipcode
    };
    this.addressService.updateAddress(address).toPromise().then(updatedAddress => {
      console.log(updatedAddress);
      this.address = updatedAddress;
      this.edit = false;
    }).catch(error=> {
      if(error.status == 504){
        this.router.navigate(['404'])
      }
    });;

  }
  createAddress() {
    console.log(this.f2.value.name);
    const address = {
      name: this.f2.value.name,
      addressLigne1: this.f2.value.address1,
      addressLigne2: this.f2.value.address2,
      city: this.f2.value.city,
      country: this.f2.value.country,
      zipCode: this.f2.value.zipcode
    };
    this.addressService.createAddress(address).subscribe(updatedAddress => {
      console.log(updatedAddress);
      this.address = updatedAddress;
      this.edit = false;
    });

  }

  async ngOnDestroy(){
    const modal = await this.loadingController.getTop();
    if(modal){
      modal.dismiss();
    }
  }
}

