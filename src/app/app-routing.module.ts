import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';


import { LoginComponent } from './authentications/login/login.component';
import { ProfileGuard } from './authentications/profile.guard';
import { RegisterComponent } from './authentications/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { BillingDetailsComponent } from './pages/checkout-pages/billing-details/billing-details.component';
import { PaymentsComponent } from './pages/checkout-pages/payments/payments.component';
import { ShippingInfoComponent } from './pages/checkout-pages/shipping-info/shipping-info.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';


const routes: Routes = [

  /* {path: '', component: MainPageComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'settings', component: SettingsComponent},
  ]}, */

  /* {path: '', component: HomeComponent, pathMatch: 'prefix'}, */

  /* {path: 'cart', component: CartComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'product', component: ProductDetailsComponent, children: [
    {path: ':id', component: ProductDetailsComponent}
  ]},
  {path: 'contacts', component: ContactsComponent}, */

  /* {path: '', component: MainComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
  ]}, */

  /* {path: '', component: HomeComponent, canActivate: [AuthGuard]}, */

  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'contacts', component: ContactsComponent },

  { path: 'billing-details', component: BillingDetailsComponent },
  { path: 'shipping-info', component: ShippingInfoComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'checkout', component: CheckoutComponent },

  { path: 'product', component: ProductDetailsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'order', component: OrderDetailsComponent, canActivate: [ProfileGuard] },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [ProfileGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  /* LOGIN AND REGISTER */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
