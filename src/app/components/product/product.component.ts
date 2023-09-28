import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private cart: CartService) {
    this.URL_API = this.URL_API
  }
  /* @Output() eventEmitter = new EventEmitter<any>(); */
  URL_API = ''
  @Input() product!: any;
  isLoaded: boolean = false;

  addToCart(): void {
    this.cart.addToCart(this.product!);
    setTimeout(() => {
      this.isLoaded = true;
    }, 500)
  }

}
