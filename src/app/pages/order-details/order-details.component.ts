import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from 'src/app/components/product/product.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  constructor(private products: ProductsService, private route: ActivatedRoute, private location: Location) {}

  order: any;
  orderId!: any;
  isLoaded: boolean = false;
  customer!: any;
  customerAddress!: any;
  productOrdered: any;
  onEdit: boolean = false
  productError!: any
  trackingCode!: string
  discountCode!: string
  discountPercentage!: number

  goBack(){ this.location.back() }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = this.route.snapshot.paramMap.get('id');
      if (orderId !== null) {
        this.orderId = parseInt(orderId);
        this.order = this.products.getOrderId(this.orderId);
        this.isLoaded = true;

        this.productOrdered = this.getOrderedProduct(this.orderId)
        this.trackingCode = this.getOrders(this.orderId).trackingCode
        this.discountCode = this.getOrders(this.orderId).discountApplied
        this.discountPercentage = this.getOrders(this.orderId).discountPercent
        // console.log(this.productOrdered); PER DEBUG
      } else {
        // Cosa fare se l'ID dell'ordine è null
      }
    });
  }


  getOrders(i: number): any {
    const orders = this.products.orders.find(item => item.id === i);
    return orders ? orders : 'Non sono ancora stati effettuati degli ordini';
  }

  getOrderedProduct(orderId: number) {
    const orderedProductItem = this.products.orderedProduct.find(item => item.id === orderId);
    this.productError = orderedProductItem ? orderedProductItem?.product : 'Prodotti non disponibili'
    return orderedProductItem ? orderedProductItem.product : 'Prodotti non disponibili';
  }

  edit(){ this.onEdit = true }
  saveChanges(){ this.onEdit = false } // FARE ANCHE RICHIESTA PATCH
  
}
