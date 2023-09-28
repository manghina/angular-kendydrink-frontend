import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentications/auth.service';
import { User } from '../models/user.model';
import { URL_API } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService, /* private authInterceptor: AuthInterceptor */) { }

  urlChangeInfo = URL_API + 'user/';

  UserInfo!: User
  orders = []
  responseDeletedUser!: string

  getUserInfo(url: string) {
    /* const headers = new HttpHeaders().set('Authorization', `Bearer: 2:`); */

    /* return this.http.get(this.urlChangeInfo, {'headers: Bearer: 2:c4b5d4c3f81d25c7500b7b4c9adf496964a5bd6659c30'}).subscribe((response: any) => {
      console.log(response);
    }); */
  }

  getInfo() {
    return this.http.get(this.urlChangeInfo + this.authService.GetId());
  }

  deleteUser() {
    this.http.delete('https://jsonplaceholder.typicode.com/posts/1').subscribe(() =>
      this.responseDeletedUser = 'Eliminazione avvenuta con successo!'
      // aggiungere display Popup Conferma cancellazione profilo
    );
  }

}
