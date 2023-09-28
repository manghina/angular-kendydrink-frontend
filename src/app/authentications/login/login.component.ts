import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { URL_API } from '../../shared/constant';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formemail!: FormGroup;
  formOTP!: FormGroup;
  formPsw!: FormGroup;
  displayPsw = false;
  errorLogin = false;
  emailForm!: string

  firstStep = false
  pageLoginWithOTP = true
  pageLoginWithPsw = false
  buttonDisabled: boolean = false;

  constructor(private authService: AuthService, private http: HttpClient, private location: Location) { }

  ngOnInit(): void {
    this.formemail = new FormGroup({ email: new FormControl(null, [Validators.required, Validators.email]) })
    this.formOTP = new FormGroup({ email: new FormControl(null, [Validators.required, Validators.email]), otp: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]) })
    this.formPsw = new FormGroup({ email: new FormControl(null, [Validators.required, Validators.email]), password: new FormControl(null, [Validators.required, Validators.minLength(8)]) })
  }


  continueBtn() {
    this.emailForm = this.formemail.value.email
    this.pageLoginWithOTP = true;
  }

  passwordPage() { this.pageLoginWithPsw = true; this.pageLoginWithOTP = false }
  otpPage() { this.pageLoginWithOTP = true; this.pageLoginWithPsw = false }

  sendOTPCode() {
    this.http.post(URL_API + 'otp', {}).subscribe((response: any) => {
      console.log(response)
    });
    this.buttonDisabled = true;
    setTimeout(() => {
      this.buttonDisabled = false;
    }, 10000);
  }

  submitLoginOTP() {
    this.http.post(URL_API + 'otp', { otp: this.formOTP.value.otp }).subscribe(response => {
      console.log(response)
    })
  }

  submitLoginPsw() {
    this.http.post(URL_API + 'login', { email: this.formPsw.value.email, password: this.formPsw.value.password }).subscribe((response: any) => {
      localStorage.setItem("auth_token", response.data.token/*.slice(2,response.value.length)*/);

      const expirationDate = new Date(response.expiration * 1000); // Moltiplica per 1000 per convertire in millisecondi
      console.log("LOGIN DATES");
      console.log(expirationDate);

      this.authService.expirationTokenDate = expirationDate;
      localStorage.setItem("expiration", expirationDate.toString())

      /* this.router.navigate(["/shop"]); */
      this.authService.isLoggedIn = true
      this.authService.createUser(response.expiration, response.type, response.user_id, response.value)
      this.goBack()
    });
  }

  goBack(): void {
    this.location.back();
  }


  // onSubmit(){

  /* const formData = new FormData();
  formData.append('email', this.homeform.value.email);
  formData.append('password', this.homeform.value.password); */
  /* formData.append('rememberMe', this.homeform.value.rememberMe); */

  /* const headers = new HttpHeaders().set('enctype', 'multipart/form-data');

  this.http.post(this.authService.apiLogInEmail, formData, { headers }).subscribe((data: any) => {
    console.log(data);
    this.router.navigate(["/shop"]);
    this.authService.createUser(data.id, data.email, data.expires, data.type)
    console.log(this.authService.user);
    localStorage.setItem('user', JSON.stringify(this.authService.user))
  },
  error => {
    // Codice per gestire gli errori
    this.errorLogin = true;
  }

  ); */

  // }


  toggleDisplayPsw() { this.displayPsw = !this.displayPsw; }

}
