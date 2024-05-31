import { Component } from '@angular/core';
import { AppAuthService } from '../service/app.auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    noAccess: boolean = false;

  constructor(private authService: AppAuthService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['noaccess'] === 'true') {
        this.noAccess = true;
      }
    });
  }
  login() {
    this.authService.login();
  }
}
