import { Component } from '@angular/core';
import { AppAuthService } from '../service/app.auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AppAuthService) {
  }

  login() {
    this.authService.login();
  }
}
