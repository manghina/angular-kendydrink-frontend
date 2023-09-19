import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  constructor(private cart: CartService, private checkoutService: CheckoutService, private location: Location){ }
  
  goBack(): void {
    this.location.back();
  }


}
