import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ICreds } from '../../core/interfaces/icreds';
import { GlobalLoaderService } from '../../core/services/global-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public isAccessDenied: boolean;
  public userCreds: ICreds = {
    login: 'Morales',
    password: 'id'
  };
  private loginSubscription;

  constructor(private authService: AuthService,
              private router: Router,
              private loaderService: GlobalLoaderService) {
  }

  ngOnInit() {
  }

  doLogin() {
    this.loaderService.show();
    this.loginSubscription = this.authService.Login({
      login: this.userCreds.login,
      password: this.userCreds.password
    }).subscribe(
      (isAuthorized) => {
        if (isAuthorized) {
          this.loaderService.hide();
          this.router.navigateByUrl('app/courses');
        }
      },
      (error) => {
        this.loaderService.hide();
        this.isAccessDenied = true;
        console.warn(error);
      }
    );
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
