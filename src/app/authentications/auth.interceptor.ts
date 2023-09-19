import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authservice = this.injector.get(AuthService);
    let jwtToken;

    if(authservice.GetToken()){ // Se trova il token nel local storage
      jwtToken = request.clone({ // clona la richiesta inserendo il Bearer token nell'header
        headers: request.headers.set("Authorization", "Bearer " + authservice.GetToken()),
      });
    } else jwtToken = request.clone(); // Altrimenti, se non lo trova, clona la richiesta senza inserire nulla

    return next.handle(jwtToken).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          // qui puoi gestire la logica per il caso di login fallito
          // ad esempio, puoi navigare l'utente alla pagina di login
          this.router.navigate(["/login"]);
        } else if (error.status === 400) {
          /* alert(error.error); */
        }
        return throwError(error.error);
      })
    );
  }
}