import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { URL_API } from 'src/app/shared/constant';
import { Product } from '../../models/products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductsService, private cartService: CartService, private location: Location, private http: HttpClient) {
    this.URL_API = URL_API
  }
  prodottino!: Product;
  product = this.cartService.items;
  carrello = this.cartService;
  idProdotto: any
  prodotto: any
  isLoaded: boolean = false;
  URL_API = ''

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

    this.http.get(URL_API + 'product/' + this.idProdotto).subscribe((data: any) => {
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
  }





  slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" },
    { img: "http://placehold.it/350x150/666666" }
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
