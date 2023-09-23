import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentications/auth.service';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { TokenService } from 'src/app/shared/token.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './responsive.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        translate: '0px',
        opacity: 1,
        backgroundColor: 'var(--blu)'
      })),
      state('closed', style({
        translate: '-300px',
        opacity: 0.5,
        backgroundColor: 'white'
      })),
      transition('open => closed', [
        animate('1s'),
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private http: HttpClient, private token: TokenService, private router: Router, private cart: CartService, private checkoutS: CheckoutService) {
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      this.product = JSON.parse(cartData);
    }
  }

  private cartKey = 'myCart';
  cartItems: Product[] = [];
  cartItemsSubscription!: Subscription;

  scrolled = false;

  cartVisible = false;
  profileMenuVisible = false;
  menuHovered = false;
  hideTimeout: any;
  isOpen: boolean = false;
  linkActive = false

  isAtuthenticated = this.authService.isAuthenticated

  isHome!: boolean;
  isCart!: boolean;
  isCatalog!: boolean;
  isContacts!: boolean;
  isLoggedIn: any;

  product = this.cart.items
  carrello = this.cart
  billingInfo = this.checkoutS.billingInfo

  ngOnInit() {
    this.isHome = true;
    this.isCart = false;
    this.isCatalog = false;
    this.isContacts = false;
    this.authService.isLogged$.subscribe((data) => {
      this.isLoggedIn = data;
    });

    // console.log('CARRELLO NORMALE CART SERVICE')
    // console.log(this.cart.items)

    // console.log('CARRELLO CON SUBJECT CART SERVICE')
    // console.log(this.cart.cartItemsSubject)


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

  goToHome() {
    this.isHome = true;
    this.isCart = false;
    this.isCatalog = false;
    this.isContacts = false;
    this.router.navigate([""]);
  }

  goToCart() {
    this.isHome = false;
    this.isCart = true;
    this.isCatalog = false;
    this.isContacts = false;
    this.router.navigate(["/cart"]);
  }

  goToCatalog() {
    this.isHome = false;
    this.isCart = false;
    this.isCatalog = true;
    this.isContacts = false;
    this.router.navigate(["/catalog"]);
  }

  goToContacts() {
    this.isHome = false;
    this.isCart = false;
    this.isCatalog = false;
    this.isContacts = true;
    this.router.navigate(["/contacts"]);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = scrollTop >= 1;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  showCart() {
    this.cartVisible = true;
    this.profileMenuVisible = false;
    this.clearHideTimeout();
  }
  hideCart() {
    this.setHideTimeout();
  }

  showProfileMenu() {
    this.cartVisible = false;
    this.profileMenuVisible = true;
    this.clearHideTimeout();
  }
  hideProfileMenu() {
    this.setHideTimeout();
  }

  onMenuHover() {
    this.menuHovered = true;
    this.clearHideTimeout();
  }

  onMenuLeave() {
    this.menuHovered = false;
    this.setHideTimeout();
  }

  clearHideTimeout() {
    clearTimeout(this.hideTimeout);
  }

  setHideTimeout() {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      this.cartVisible = false;
      this.profileMenuVisible = false;
    }, 100); // Imposta il tempo in millisecondi
  }

  LogOut() {
    this.authService.LogOut();
  }

  checkout() {
    // debugger
    if (!this.isAtuthenticated()) {
      this.http.post('https://api.kendydrink.com/login', {
        "email": "mmonti@gmail.com",
        "password": "monteLeone"
      }).subscribe((response: any) => {
        this.isAtuthenticated()
        const token = response.data.token;
        console.log(response.data.token);
        this.token.handleData(token);
        this.http.post('https://api.kendydrink.com/checkout', { cart: this.product }).subscribe((response: any) => {
          localStorage.setItem("data", response)
          console.log(response)
          this.router.navigate(["/checkout/billing-details"]);
        });
      });
    } else {
      this.http.post('https://api.kendydrink.com/checkout', { cart: this.product, billing: this.billingInfo }).subscribe((response: any) => {
        localStorage.setItem("data", response)
        console.log(response)
        this.router.navigate(["/checkout/billing-details"]);
      });
    }

  }

}
