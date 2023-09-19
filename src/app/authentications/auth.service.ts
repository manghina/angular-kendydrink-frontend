import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = 'https://api.kendydrink.com/';
  isLoggedIn = false
  isAdmin = false
  isInfluencer = false
  user!: User | null | undefined;
  expirationTokenDate: Date | undefined;
  isExpired: boolean | undefined;

  // Crei un nuovo Subject di tipo boolean
  private isLogged = new Subject<boolean>();
  // Lo 'converti' in Observable, perchè questa variabile può variare nel tempo e ci si potrà fare la subscribe
  isLogged$ = this.isLogged.asObservable();

  // Questo metodo setta il valore della variabile, in base a cosa ci si passa nella firma (true o false)
  setIsLogged(value: boolean) {
    const todayDate = new Date();
    console.log("------------------------------");
    console.log("Data di oggi: ");
    console.log(todayDate);
    console.log("Data scadenza del token: ");
    console.log(this.expirationTokenDate);
    this.isLogged.next(value);
    if (this.expirationTokenDate != undefined) {
      this.isExpired = todayDate.getTime() > this.expirationTokenDate!.getTime();
      console.log("Is Token Expired? ");
      console.log(this.isExpired);
      console.log("------------------------------");
      if (this.isExpired) {
        this.isLogged.next(false);
      } else this.isLogged.next(value);
    } else console.log("------------------------------");
  }

  ngOnInit(): void {

  }

  isAuthenticated() { return this.isLoggedIn }

  isRoleAdmin() { return this.isAdmin }

  createUser(expiration: Date, type: string, user_id: number, value: string) {
    this.user = new User(expiration, type, user_id, value)
    this.isLoggedIn = true
  }

  apiLogInEmail = `${this.apiUrl}user/login/email`
  apiLogInGoogle = `${this.apiUrl}user/login/google`

  LogInEmail(body: {}) {
    return this.http.post(this.apiLogInEmail, {})
  }

  LogInGoogle(body: {}) { /* CREDO SIA DA MODIFICARE IN BASE ALLE API DI GOOGLE */
    return this.http.post(this.apiLogInGoogle, {})
  }

  Register(email: string, password: string) {
    return this.http.post(this.apiUrl + 'user', {})
  }

  LogOut() {
    this.user = null;
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
    this.ClearStorage()
  }

  ClearStorage() {
    localStorage.clear();
    this.setIsLogged(false);
  }

  GetToken() {
    // Se trova il token nel local o nel session storage, significa che l'utente è ancora loggato, quindi setta la variabile
    // isLogged a true 
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      this.setIsLogged(true);
      if (!localStorage.getItem("expiration")) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);
        this.expirationTokenDate = expirationDate;
        localStorage.setItem("expiration", expirationDate.toString());
      }
      return localStorage.getItem("token") || sessionStorage.getItem("token")
    } else { // se non trova il token, setta la variabile a false, perchè se il token non c'è significa che non è loggato
      this.setIsLogged(false);
      return '';
    }
  }

  // Estrae l'ID dell'utente dal token, separando la stringa dove trova i due punti e prendendo la prima parte (quella dell'id)
  GetId() {
    return this.GetToken()?.split(':')[0] || '';
  }

}
