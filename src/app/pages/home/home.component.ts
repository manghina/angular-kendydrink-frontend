import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Slide } from "../../components/carousel/carousel.interface";
import { AnimationType } from "../../components/carousel/carousel.animations";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/models/products.model";
import { CartService } from "src/app/services/cart.service";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './responsive.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;

  animationType = AnimationType.Scale;
  endCall: boolean = false;

  animationTypes = [
    {
      name: "Scale",
      value: AnimationType.Scale
    },
    {
      name: "Fade",
      value: AnimationType.Fade
    },
    {
      name: "Flip",
      value: AnimationType.Flip
    },
    {
      name: "Jack In The Box",
      value: AnimationType.JackInTheBox
    }
  ];
  slides: Slide[] = [
    {
      headline: "KENDY DRINK ITALIA",
      src:
        "../../../assets/slides/slide1.jpg"
    },
    {
      headline: "KENDY DRINK ITALIA",
      src:
        "../../../assets/slides/slide2.jpg"
    },
    {
      headline: "KENDY DRINK ITALIA",
      src:
        "../../../assets/slides/slide3.jpg"
    },
    /* {
      headline: "Focus On The Writing",
      src:
        "https://unsplash.it/1503/700"
    } */
  ];

  constructor(private _productsService: ProductsService, private cart: CartService, private http: HttpClient){ }

  setAnimationType(type: { value: AnimationType; }) {
    this.animationType = type.value;
    setTimeout(() => {
      this.carousel.onNextClick();
    });
  }

  //products = this.carrellino.cartProducts
  product: any = [];

  ngOnInit(){
    console.log('ngOnInit Home Component')
    /* this.product = this._productsService.getProducts() */ /* PRIMA, CON I MIEI PRODOTTI LOCALI */
    
    this.product = this.getBestProducts()
    

    /* this._productsService.getAllProducts()
    this._productsService.AllProducts
    this.product = this._productsService.AllProducts

    console.log('LISTA TUTTI I PRODOTTI');
    console.log(this.product); */
    

    /* this.product = this._productsService.getAllProducts() */
    /* this._productsService.getAllProducts().subscribe((data: Product[]) => {
      this.product = data;
    }); */
  }

  getBestProducts(){
    this.http.get('https://api.kendydrink.com/' + 'product/best').subscribe(data => {
      this.product = data;
      this.endCall = true;
      console.log(data)
    });
  }


  addToCart(product: Product) {
    this.cart.addToCart(product);
    // console.log('PRODOTTO AGGIUNTO AL CARRELLO');
  }


  /* addToCart(product: any){
    this.carrellino.event.emit(product);
    console.log('ciao')
  } */

  /* view(product:IProducts){
    // console.log(product.product_id)
  } */



}
