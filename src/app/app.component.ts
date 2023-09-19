import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentications/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecommerce-kendy-italia';
  constructor(private authService: AuthService){ }

  ngOnInit(): void{

    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')! )
      this.authService.createUser(user.expiration, user.type, user.user_id, user.value)
    }

    this.authService.isExpired = true;

    const token = this.authService.GetToken();
    this.authService.expirationTokenDate = new Date(localStorage.getItem("expiration")!);

  }
}
