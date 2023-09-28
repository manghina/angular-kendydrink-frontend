import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { URL_API } from '../shared/constant';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(private http: HttpClient, private router: Router) {

  }

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
    this.isLogged.next(value);
    localStorage.setItem('isLogged', 'true')
    if (this.expirationTokenDate != undefined) {
      this.isExpired = todayDate.getTime() > this.expirationTokenDate!.getTime();
      if (this.isExpired) {
        this.isLogged.next(false);
      } else this.isLogged.next(value);
    }
  }

  ngOnInit(): void {

  }

  isAuthenticated() {
    return !!localStorage.getItem('isLogged')
  }

  isRoleAdmin() { return this.isAdmin }

  createUser(expiration: Date, type: string, user_id: number, value: string) {
    this.user = new User(expiration, type, user_id, value)
    this.isLoggedIn = true
  }

  apiLogInEmail = `${URL_API}user/login/email`
  apiLogInGoogle = `${URL_API}user/login/google`

  LogInEmail(body: {}) {
    this.setIsLogged(true);
    return this.http.post(this.apiLogInEmail, {})
  }

  LogInGoogle(body: {}) { /* CREDO SIA DA MODIFICARE IN BASE ALLE API DI GOOGLE */
    this.setIsLogged(true);
    return this.http.post(this.apiLogInGoogle, {})
  }

  Register(email: string, password: string) {
    return this.http.post(URL_API + 'register', {})
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
    if (localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")) {
      this.setIsLogged(true);
      if (!localStorage.getItem("expiration")) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);
        this.expirationTokenDate = expirationDate;
        localStorage.setItem("expiration", expirationDate.toString());
      }
      return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
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
