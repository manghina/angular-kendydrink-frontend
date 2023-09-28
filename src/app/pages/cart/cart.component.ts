import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private cart: CartService, private location: Location) {
    this.URL_API = this.URL_API
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      this.product = JSON.parse(cartData);
    }
  }


  private cartKey = 'myCart';
  cartItems: Product[] = [];
  cartItemsSubscription!: Subscription;
  URL_API = ''
  product = this.cart.items
  carrello = this.cart

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    // Carica il carrello di default presente nel localStorage
    const cartFromLocalStorage = localStorage.getItem('cart');
    if (cartFromLocalStorage) {
      this.cart.setCartItems(cartFromLocalStorage);
    }

    // Sottoscrizione al Subject del carrello
    this.cartItemsSubscription = this.cart.cartItemsSubject.subscribe(
      (cartItems: Array<any>) => {
        this.cartItems = cartItems;
        // ... //
      }
    );
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  addToCart(product: Product) {
    this.cart.addToCart(product);
    // console.log('PRODOTTO AGGIUNTO AL CARRELLO');
  }





}
