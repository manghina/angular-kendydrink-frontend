import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private cart: CartService){ }
  /* @Output() eventEmitter = new EventEmitter<any>(); */

  @Input() product!: any;
  isLoaded: boolean = false;

  addToCart(): void{
    this.cart.addToCart(this.product!);
    setTimeout(()=>{
      this.isLoaded = true;      
    }, 500)
  }

}
