import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{
  constructor(public http: HttpClient){ }
  products = [];
  singleProduct = {};

  proooodotti = this.getProducts()
  AllProducts: any = []


  getProducts() {
    return [
      {id: '1', name: 'Coconut & Pineapple - Linea Step', img: '../../../assets/products/step/product1.png', price: 13.20, desc: `
      Preparato in polvere per bevanda istantanea.

      Sciogliere il contenuto della bustina in due litri d\'acqua o più, secondo il proprio gusto.
      In acqua naturale o frizzante. Senza glutine adatto ai diabetici
      `, quantity: 1, qty: 213, linea: 'step'},
      {id: '2', name: 'Watermelon - Linea Step', img: '../../../assets/products/step/product2.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 3456, linea: 'step'},
      {id: '2', name: 'Apple & Pear - Linea Step', img: '../../../assets/products/step/product3.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 3546, linea: 'step'},
      {id: '4', name: 'Berry Punch - Linea Step', img: '../../../assets/products/step/product4.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 65, linea: 'step'},
      {id: '5', name: 'IceTea Cranberry - Linea Step', img: '../../../assets/products/step/product5.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 44, linea: 'step'},
      {id: '6', name: 'IceTea Lemon - Linea Step', img: '../../../assets/products/step/product6.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 54, linea: 'step'},
      {id: '7', name: 'IceTea Peach - Linea Step', img: '../../../assets/products/step/product7.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 43, linea: 'step'},
      {id: '8', name: 'Lemon - Linea Step', img: '../../../assets/products/step/product8.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 213, linea: 'step'},
      {id: '9', name: 'Morello Cherry - Linea Step', img: '../../../assets/products/step/product9.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 27613, linea: 'step'},
      {id: '10', name: 'Sicilia Orange - Linea Step', img: '../../../assets/products/step/product10.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 324, linea: 'step'},
      {id: '11', name: 'Peach & Apricot - Linea Step', img: '../../../assets/products/step/product11.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 12, linea: 'step'},
      {id: '12', name: 'Pineapple & Melon - Linea Step', img: '../../../assets/products/step/product12.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 332, linea: 'step'},
      {id: '13', name: 'Very Berry - Linea Step', img: '../../../assets/products/step/product13.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 98542, linea: 'step'},
      {id: '14', name: 'Wild Strawberry - Linea Step', img: '../../../assets/products/step/product14.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 994, linea: 'step'},
      {id: '15', name: 'Almond - Linea Step Max', img: '../../../assets/products/step/product15.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 5526, linea: 'step'},
      {id: '16', name: 'Red Grapes - Linea Step Max', img: '../../../assets/products/step/product16.png', price: 13.20, desc: 'descrizione vuota', quantity: 1, qty: 264, linea: 'step'},
    ];
  }

  orderedProduct = [
    {id: 1, product: [{id: 1, name: 'Kendy Fragola', quantity: 22, price: 13.20}, {id: 2, name: 'Kendy Lemon', quantity: 7, price: 13.20}]},
    {id: 2, product: [{id: 3, name: 'Kendy Coconut & Pineapple', quantity: 2, price: 13.20}, {id: 4, name: 'Kendy Sicilia Orange', quantity: 5, price: 13.20}, {id: 5, name: 'Kendy Ice Tea Peach', quantity: 3, price: 13.20}]},
    {id: 3, product: [{id: 2, name: 'Kendy Lemon', quantity: 13, price: 13.20}, {id: 4, name: 'Kendy Sicilia Orange', quantity: 7, price: 13.20}]},
    {id: 4, product: [{id: 6, name: 'Kendy Ice Tea Lemon', quantity: 6, price: 13.20}, {id: 5, name: 'Kendy Ice Tea Peach', quantity: 17, price: 13.20}]},
  ]

  ordersNotOrdered = [
    {id: 1, name: '', surname: '', phoneNumber: null, total: 382.8, payment: 'Paypal', state: 'Pagato', trackingCode: '312nk32kj3k', date: '5 giugno 2023', discountApplied: 'PRESTI10', discountPercent: 5},
    {id: 2, name: '', surname: '', phoneNumber: null, total: 132, payment: 'Bonifico Bancario', state: 'Spedito', trackingCode: 'a908dsf8as', date: '19 maggio 2023', discountApplied: 'FOIS99', discountPercent: 7},
    {id: 3, name: '', surname: '', phoneNumber: null, total: 264, payment: 'Bonifico Bancario', state: 'Preparazione in corso', trackingCode: 'kllk1lk3j1', date: '28 marzo 2023', discountApplied: 'FOIS99', discountPercent: 7},
    {id: 4, name: '', surname: '', phoneNumber: null, total: 303.6, payment: 'Paypal', state: 'Preparazione in corso', trackingCode: 'jk2n4kj32', date: '9 marzo 2023', discountApplied: '', discountPercent: 0},
  ]

  orders = this.ordersNotOrdered.sort((a, b) => b.id - a.id);




  getAllProducts(){
    return this.http.get('https://api.kendydrink.com/' + 'products').subscribe(data => {
      this.AllProducts = data
    })
  }

  getOrderId(orderId: number) {
    return this.orders.find(order => order.id === orderId);
  }

}
