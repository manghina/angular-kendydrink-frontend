import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard  {
  constructor(private router: Router) { }

  billingDetails = false
  shippingInfo = true
  payments = false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if(this.billingDetails){
      return true
    } else if(this.shippingInfo){
      return true
    } else if(this.shippingInfo === false){
      this.router.navigate(['/checkout/shipping-info'])
      return false
    } else{
      this.router.navigate(['/checkout/billing-details'])
      return false
    }
  }

  

}
