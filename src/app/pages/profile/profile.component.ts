import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentications/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', './responsive.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private profile: ProfileService, private authService: AuthService, private form: FormBuilder, private products: ProductsService){ }

  formDown!: FormGroup;
  onEditDown = false
  displayPopup = false

  user: any = []
  userInfo: any
  isInfluencer = this.authService.isInfluencer
  nameAndSurname!: string
  name!: string
  surname!: string
  responseDeletedUser = this.profile.responseDeletedUser
  productError!: string
  ordini!: any
  
  getShippingAddress(): string {
    if (this.user.address && this.user.city && this.user.country) {
      return `${this.user.address.line1}, ${this.user.address.city}, ${this.user.address.country}`;
    }
    return 'non impostato';
  }
  
  getPhoneNumber(): string {
    if (this.user.phone) {
      return `${this.user.phoneNumber}`;
    }
    return 'non impostato';
  }

  getPostalCode(): string {
    if (this.user.address.postal_code) {
      return this.user.address.postal_code;
    }
    return 'non impostato';
  }

  getOrders(i: number): any {
    const orders = this.products.orders.find(item => item.id === i);
    return orders ? orders : 'Non sono ancora stati effettuati degli ordini';
  }


  // NOrders = this.user.orders.length
  orders: any[] = []
  isLoaded: boolean = false;


  ngOnInit(): void {

    this.formDown = this.form.group({
      name:[null, Validators.required],
      surname: [null, [Validators.required, Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.minLength(8)]],
      address: [null, Validators.required],
      phoneNumber: [null],
      zipCode: [null]
    })

    console.log('ORDE');
    console.log(this.getOrders(1));
    this.ordini = this.getOrders(1)

    
    // Chiama il profileService, il metodo getInfo per riprendere le sue informazioni
    this.profile.getInfo().subscribe({ 
      // Ci sono tre stati della richiesta: next (mentre riceve informazioni), error(se qualcosa va in errore), complete (quando la richiesta è terminata)
      next: (result) => {
        // Fare qualcosa mano mano che riceve i dati dal back
        this.user = result;
        this.nameAndSurname = this.user.name.split(' ');
        this.name = this.nameAndSurname[0];
        this.surname = this.nameAndSurname[1];
        console.log(result);
        
        
      },
      error: (error) => {
        // Fare qualcosa in caso di errore
        console.log(error);

      },
      complete: () => {
        // Quando la richiesta è completata
        this.isLoaded = true;
      } 
    });

  }


  saveChanges(){ }
  deleteProfile(){ }

}
