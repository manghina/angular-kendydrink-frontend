import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(){ }

  name = ''
  surname = ''
  email = ''
  phoneNumber = ''
  city = ''
  country = ''
  shippingAddress = ''
  zipCode = ''

  billingInfo: any


}
