import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* constructor(private http: HttpClient){ } */

  /* getProduct(){
    return this.http.get<any>("http://192.168.106:8080/product/info").pipe(map((res:any) => {return res}))
  } */


}

export const products =
    [
        {
            id: 1,
            name: 'Men Ribbed Collar Shirt',
            category: 'Men Accessories', categoryId: 1,
            price: 20,
            image: 'https://wrukminim1.flixcart.com/image/495/594/jk4bngw0/shirt/m/n/h/xl-stin38-shopybucket-original-imaf7am82ne2rdwq.jpeg?q=50'
        },
        {
            id: 2,
            name: 'Wrist Watch',
            category: 'Men Accessories', categoryId: 1,
            price: 30,
            image: 'watch.png'
        },
        {
            id: 3,
            name: 'Swarovski Crystal Dangle Earring',
            category: 'Women Accessories', categoryId: 2,
            price: 5,
            image:
            'https://wrukminim1.flixcart.com/image/800/960/jen4vww0/hand-messenger-bag/h/c/z/trendy-handheld-mbg-0473-bpk-sling-bag-mark-keith-original-imaf3ahsud5j4mwe.jpeg?q=50'
        },
        {
            id: 4,
            name: 'Rose Gold 14kt Dangle Earring',
            category: 'Women Accessories', categoryId: 2,
            price: 20,
            image: 'https://wrukminim1.flixcart.com/image/800/960/jen4vww0/hand-messenger-bag/h/c/z/trendy-handheld-mbg-0473-bpk-sling-bag-mark-keith-original-imaf3ahsud5j4mwe.jpeg?q=50'
        },
         {
            id: 9,
            name: 'Mark & Keith Sling bag',
            category: 'Women Accessories', categoryId: 2,
            price: 20,
            image: 'https://wrukminim1.flixcart.com/image/800/960/jen4vww0/hand-messenger-bag/h/c/z/trendy-handheld-mbg-0473-bpk-sling-bag-mark-keith-original-imaf3ahsud5j4mwe.jpeg?q=50'
        },
        {
            id: 5,
            name: 'Shoes',
            category: 'Children Accessories', categoryId: 3,
            price: 20,
            image: 'https://wrukminim1.flixcart.com/image/800/960/jt4olu80/kids-t-shirt/c/a/p/4-5-years-131246520211-c703-gini-jony-original-imafejndjng3uu4f.jpeg?q=50'
        },
        {
            id: 6,
            name: 'Kids Scraf',
            category: 'Children Accessories', categoryId: 3,
            price: 10,
            image: 'https://wrukminim1.flixcart.com/image/800/960/jt4olu80/kids-t-shirt/c/a/p/4-5-years-131246520211-c703-gini-jony-original-imafejndjng3uu4f.jpeg?q=50'
        },
        {
            id: 7,
            name: 'Soccer Ball',
            category: 'Sports Accessories', categoryId: 4,
            price: 20,
            image: 'https://wrukminim1.flixcart.com/image/832/832/jhtg4280/kit/a/m/e/combo-of-spinner-brasil-football-wisdom-shinguard-l-encounter-original-imaf3g7h8hunvkyn.jpeg?q=70'
        },
        {
            id: 8,
            name: 'Base Ball',
            category: 'Sports Accessories', categoryId: 4,
            price: 15,
            image: 'https://wrukminim1.flixcart.com/image/832/832/jhtg4280/kit/a/m/e/combo-of-spinner-brasil-football-wisdom-shinguard-l-encounter-original-imaf3g7h8hunvkyn.jpeg?q=70'
        },
        {
            id: 10,
            name: 'Base Ball',
            category: 'Sports Accessories', categoryId: 4,
            price: 15,
            image: 'https://wrukminim1.flixcart.com/image/832/832/jhtg4280/kit/a/m/e/combo-of-spinner-brasil-football-wisdom-shinguard-l-encounter-original-imaf3g7h8hunvkyn.jpeg?q=70'
        },
        {
            id: 11,
            name: 'T Shirt',
            category: 'Children Accessories', categoryId: 3,
            price: 10,
            image: 'https://wrukminim1.flixcart.com/image/800/960/jt4olu80/kids-t-shirt/c/a/p/4-5-years-131246520211-c703-gini-jony-original-imafejndjng3uu4f.jpeg?q=50'
        },
    ]
