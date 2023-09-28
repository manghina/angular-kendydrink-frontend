import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { URL_API } from 'src/app/shared/constant';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  product = [
    {
      "id": 1,
      "quantity": 1
    },
    {
      "id": 2,
      "quantity": 2
    },
    {
      "id": 3,
      "quantity": 3
    },
    {
      "id": 4,
      "quantity": 4
    },
    {
      "id": 5,
      "quantity": 5
    }
  ]
  constructor(private http: HttpClient) {
    console.log("checkout")
    // this.sendCart()
  }
  sendCart() {
    this.http.post(URL_API + 'checkout', { cart: this.product }).subscribe((response: any) => {
      console.log(response)
    });
  }
}
