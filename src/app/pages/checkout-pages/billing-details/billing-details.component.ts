import { Component } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent {

  constructor(private cart: CartService, private checkoutService: CheckoutService){ }
  homeform!: FormGroup;
  product = this.cart.items
  
  secondStep = false
  thirdStep = true


  ngOnInit() {
    this.homeform = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      city: new FormControl(''),
      country: new FormControl(''),
      shippingAddress: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
    })
  }



  onSubmit(){

    this.checkoutService.name = this.homeform.value.name
    this.checkoutService.surname = this.homeform.value.surname
    this.checkoutService.email = this.homeform.value.email
    this.checkoutService.phoneNumber = this.homeform.value.phoneNumber
    this.checkoutService.city = this.homeform.value.city
    this.checkoutService.country = this.homeform.value.country
    this.checkoutService.shippingAddress = this.homeform.value.shippingAddress
    this.checkoutService.zipCode = this.homeform.value.zipCode

  }

}
