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
    login: 'user@test.com',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  doLogin() {
    const isSuccess = this.authService.Login({
      login: this.userCreds.login,
      password: this.userCreds.password
    });
    if (isSuccess) {
      this.router.navigateByUrl('/courses');
    } else {
      this.isAccessDenied = true;
    }
  }
}
