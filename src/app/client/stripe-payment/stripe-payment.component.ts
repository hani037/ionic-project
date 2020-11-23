import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../../shared/service/payment.service";
import {Router} from "@angular/router";
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {OrderService} from "../../shared/service/order.service";
import {LoadingController} from "@ionic/angular";
@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private loadingController: LoadingController, private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  async createToken() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'S\'il vous plaît, attendez...',
    });
    await loading.present().then(() => {
      const name = this.stripeTest.get('name').value;
      this.stripeService
          .createToken(this.card.element, {name})
          .subscribe((result) => {
            if (result.token) {
              // Use the token
              console.log(result.token.id);
              this.paymentService.chargeCard(result.token.id).subscribe(resp => {
                    loading.dismiss();
                    this.router.navigate(['/client/payment/success']);
                    this.paymentService.panier.next(true);
                  },
                  err => {
                    loading.dismiss();
                    this.router.navigate(['/client/payment/failed']);
                  })
            } else if (result.error) {
              // Error creating the token
              loading.dismiss();
              console.log(result.error.message);
            }
          });
    })
  }


}
