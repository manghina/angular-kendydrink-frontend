import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { URL_API } from 'src/app/shared/constant';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent {

  constructor(private cart: CartService, private router: Router, private location: Location, private checkoutService: CheckoutService, private http: HttpClient) {
    this.URL_API = URL_API
  }

  secondStep = false
  thirdStep = true

  product = this.cart.items
  URL_API = ''
  phoneNumber = this.checkoutService.phoneNumber
  email = this.checkoutService.email
  shippingAddress = this.checkoutService.shippingAddress
  city = this.checkoutService.city
  country = this.checkoutService.country


  goBack(): void {
    this.location.back();
  }

  sendCart() {
    let billing = localStorage.getItem('billingInfo')
    if (billing)
      billing = JSON.parse(billing)
    this.http.post(URL_API + 'checkout', { cart: this.product, billing: [billing] }).subscribe((response: any) => {
      window.location.href = response.url
      // this.router.navigate(['payments', response])
    });
  }

}
