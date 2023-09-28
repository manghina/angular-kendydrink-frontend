import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  url = ''
  constructor(private cart: CartService, private checkoutService: CheckoutService, private location: Location, private route: ActivatedRoute) {
    debugger
    this.url = this.route.snapshot.params['url']
  }

  goBack(): void {
    this.location.back();
  }


}
