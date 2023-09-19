import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(){
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      this.items = JSON.parse(cartData);
    }
  }

  private cartKey = 'myCart';
  items: Product[] = [];
  public cartItemsSubject = new Subject<Array<any>>();
  TotalPrice = 0;



  addToCart(product: Product) {
    const IndiceProdotto = this.items.findIndex(item => item.id === product.id);

    if (IndiceProdotto === -1) {
      this.items.push({ ...product, quantity: 1 });
    } else {
      this.items[IndiceProdotto].quantity++;
    }
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));

    this.cartItemsSubject.next(this.items);
  }

  getItems() {
    return this.items;
  }

  setCartItems(items: any) {
    this.cartItemsSubject.next(items);
  }



  clearCart() {
    this.items = [];
    this.cartItemsSubject.next(this.items);
    localStorage.removeItem(this.cartKey);
  }

  incrementQuantity(product: Product) {
    const IndiceProdotto = this.items.findIndex(item => item.id === product.id);
    if (IndiceProdotto !== -1) {
      this.items[IndiceProdotto].quantity++;
      localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    }
    this.cartItemsSubject.next(this.items);
  }

  decrementQuantity(product: Product) {
    const IndiceProdotto = this.items.findIndex(item => item.id === product.id);
    if (IndiceProdotto !== -1) {
      if (this.items[IndiceProdotto].quantity > 1) {
        this.items[IndiceProdotto].quantity--;
        localStorage.setItem(this.cartKey, JSON.stringify(this.items));
      } else {
        this.removeFromCart(product);
      }

    }
    this.cartItemsSubject.next(this.items);
  }

  totalCartPrice(): number {
    this.cartItemsSubject.next(this.items);
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  totalCartQuantity(): number {
    this.cartItemsSubject.next(this.items);
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }


  removeFromCart(product: Product) {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      if (this.items[index].quantity === 1) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity--;
      }
      localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    }
    this.cartItemsSubject.next(this.items);
  }

  deleteProduct(product: Product){
    let index = this.items.findIndex(item => item.id === product.id);
    if (this.items[index].quantity === 1) {
      this.items.splice(index, 1);
    }
  }





}
