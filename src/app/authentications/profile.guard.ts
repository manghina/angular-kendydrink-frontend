import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log("can Active /profile: isExpired: ");
      console.log(this.authService.isExpired);


    // Se trova il token nello storage
    if (this.authService.GetToken()) {
      const expirationTokenDate = new Date(localStorage.getItem("expiration")!); // Prende la data di scadenza
      const isExpired = new Date() > expirationTokenDate; // E la compara con la data del momento stesso, per vedere se è scaduto
      if (isExpired) { // Se il token è scaduto
        this.authService.setIsLogged(false); // Aggiorna la variabile IsLogged nell'authservice su false
        this.authService.ClearStorage(); // e pulisce il local storage, cancellando token e expiration
      } else {
        this.authService.setIsLogged(true); // altrimenti, se non è scaduto, aggiorna la variabile IsLogged nell'authservice su true
      } 
    } else { // Se invece non trova il token nello storage, 
      this.authService.setIsLogged(false); // aggiorna la variabile IsLogged nell'authservice su false
      this.authService.ClearStorage(); // e pulisce il local storage cancellando token e expiration
    }

      
    if(!this.authService.isExpired){
      return true
    } else{
      this.authService.LogOut();
      this.router.navigate(['/shop'])
      return false
    }
  }

}
