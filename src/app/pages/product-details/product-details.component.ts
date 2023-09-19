import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductsService, private cartService: CartService, private location: Location, private http: HttpClient) {}
  prodottino!: Product;
  product = this.cartService.items;
  carrello = this.cartService;
  idProdotto: any
  prodotto: any
  isLoaded: boolean = false;

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId !== null) {
        this.getProductById(productId);
        this.idProdotto = productId
      } else {
        // Cosa fare se l'ID del prodotto è null
      }
    });

    this.http.get('https://api.kendydrink.com/product/' + this.idProdotto).subscribe((data: any) => {
      this.prodotto = data;
      this.prodottino = this.prodotto[0];
      this.isLoaded = true;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  private getProductById(id: string): void {
    const products = this.productService.getProducts();
    /* this.prodottino = products.find(p => p.id === id) || new Product(); */
  }

  /* getSingleProduct() {
    return this.http.get('https://api.kendydrink.com/product/' + this.idProdotto).subscribe((data: any) => {
      console.log(data);
      this.prodotto = data;
      this.prodottino = this.prodotto[0];
    });
  } */




  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  /* slideConfig = {"slidesToShow": 4, "slidesToScroll": 4}; */

  slideConfig = {
    /* dots: true, */
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          /* dots: true */
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


}
