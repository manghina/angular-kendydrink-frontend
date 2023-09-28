import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent {

  constructor(private cart: CartService, private checkoutService: CheckoutService, private router: Router) {
    this.URL_API = this.URL_API
  }
  homeform!: FormGroup;
  product = this.cart.items
  URL_API = ''
  secondStep = false
  thirdStep = true

  info: any


  ngOnInit() {
    this.homeform = new FormGroup({
      name: new FormControl(1, Validators.required),
      surname: new FormControl(1, Validators.required),
      email: new FormControl('e@e.it', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(1, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      city: new FormControl('1'),
      country: new FormControl('1'),
      shippingAddress: new FormControl(1, Validators.required),
      zipCode: new FormControl(1, Validators.required),
    })
  }



  onSubmit() {
    this.info = this.checkoutService.name + ', ' + this.checkoutService.surname + ', ' + this.checkoutService.email + ', ' + this.checkoutService.phoneNumber + ', ' + this.checkoutService.city + ', ' + this.checkoutService.country + ', ' + this.checkoutService.shippingAddress + ', ' + this.checkoutService.zipCode
    this.checkoutService.billingInfo = this.homeform.value
    localStorage.setItem('billingInfo', JSON.stringify(this.homeform.value))
    this.router.navigate(['/shipping-info'])

  }

}
