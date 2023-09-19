import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { BillingDetailsComponent } from '../billing-details/billing-details.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent {

  constructor(private cart: CartService, private location: Location, private checkoutService: CheckoutService, private http: HttpClient){ }

  secondStep = false
  thirdStep = true

  product = this.cart.items

  phoneNumber = this.checkoutService.phoneNumber
  email = this.checkoutService.email
  shippingAddress = this.checkoutService.shippingAddress
  city = this.checkoutService.city
  country = this.checkoutService.country


  goBack(): void {
    this.location.back();
  }

  sendCart(){
    this.http.post('https://api.kendydrink.com/checkout', {cart: this.product}).subscribe((response: any) => {
      console.log(response)
    });
  }

}
