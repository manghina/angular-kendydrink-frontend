import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* import { AuthInterceptor } from './authentications/auth.interceptor'; */
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FreeShippingNavComponent } from './components/free-shipping-nav/free-shipping-nav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AngularPaginatorModule } from 'angular-paginator';

import { CarouselModule } from './components/carousel/carousel.module';
import { ProductComponent } from './components/product/product.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './authentications/login/login.component';
import { RegisterComponent } from './authentications/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BillingDetailsComponent } from './pages/checkout-pages/billing-details/billing-details.component';
import { ShippingInfoComponent } from './pages/checkout-pages/shipping-info/shipping-info.component';
import { PaymentsComponent } from './pages/checkout-pages/payments/payments.component';
import { AuthInterceptor } from './authentications/auth.interceptor';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    FreeShippingNavComponent,
    NavbarComponent,
    ProductComponent,
    ReviewsComponent,
    FooterComponent,
    ProductDetailsComponent,
    CartComponent,
    CatalogComponent,
    ContactsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    BillingDetailsComponent,
    ShippingInfoComponent,
    PaymentsComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    AngularPaginatorModule,
    SlickCarouselModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }