import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }
  homeform!: FormGroup;
  displayPsw = false;
  URL_API_REGISTER = 'https://api.kendydrink.com/user';

  ngOnInit(): void {
    this.homeform = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.http.post(this.URL_API_REGISTER, {
      name: this.homeform.value.name,
      surname: this.homeform.value.surname,
      email: this.homeform.value.email,
      password: this.homeform.value.password
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 204) {
          // Gestisci l'errore 204 (No Content)
        } else if (error.status === 409) {
          // Gestisci l'errore 409 (Conflict)
          console.log('Quest\'email è già stata registrata');
        } else if (error.status === 422) {
          // Gestisci l'errore 422 (Unprocessable Entity)
          console.log('L\'email non esiste');
        } else {
          // Altri errori
          console.error('Errore HTTP:', error);
          return throwError('Si è verificato un errore durante la registrazione');
        }
        return throwError('');
      })
    )
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }

  toggleDisplayPsw() {
    this.displayPsw = !this.displayPsw;
  }
}
