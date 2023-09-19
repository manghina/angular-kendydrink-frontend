import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  constructor(private _productsService: ProductsService, private cart: CartService, private http: HttpClient){ }

  product: any = [];
  currentPage = 1;
  itemsPerPage = 9;
  maxSize = 5;
  titleShowingProducts: string = 'tutti i prodotti'

  changeTitle(title: string){
    this.titleShowingProducts = title
    if (title == 'tutti i prodotti'){ this.product = this.getAllProducts() }
    else if (title == 'granite e dessert'){ this.product = this.getGraniteAndDessert() }
    else if (title == 'linea frutti'){ this.product = this.getLineaFrutti() }
    else if (title == 'linea step'){ this.product = this.getLineaStep() }
  }


  ngOnInit(){ this.getAllProducts() }

  getAllProducts(){
    return this.http.get('https://api.kendydrink.com/' + 'products/all').subscribe((data: any) => {
      this.product = data
    });
  }

  getGraniteAndDessert(){
    return this.http.get('https://api.kendydrink.com/' + 'product/3').subscribe((data: any) => {
      this.product = data
    });
  }

  getLineaFrutti(){
    return this.http.get('https://api.kendydrink.com/' + 'product/1').subscribe((data: any) => {
      this.product = data
    });
  }

  getLineaStep(){
    return this.http.get('https://api.kendydrink.com/' + 'product/2').subscribe((data: any) => {
      this.product = data
    });
  }



  addToCart(product: Product) {
    this.cart.addToCart(product);
    // console.log('PRODOTTO AGGIUNTO AL CARRELLO');
  }


}
