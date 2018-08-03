import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ICreds } from '../../core/interfaces/icreds';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isAccessDenied: boolean;
  public userCreds: ICreds = {
    login: 'Morales',
    password: 'id'
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  doLogin() {
    this.authService.Login({
      login: this.userCreds.login,
      password: this.userCreds.password
    }).subscribe(
      (isAuthorized) => {
        if (isAuthorized) {
          this.router.navigateByUrl('app/courses');
        }
      },
      (error) => {
        this.isAccessDenied = true;
        console.warn(error);
      }
    );
  }
}
