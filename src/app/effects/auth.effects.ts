import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { AuthService } from '../core/services/auth.service';
import {
  AuthActionTypes,
  AuthLogin,
  AuthLoginFailed,
  AuthLoginSuccess, AuthLogoutFailed,
  AuthLogoutSuccess
} from '../actions/auth.actions';
import { IUser } from '../protected/user-profile/interfaces/iuser';
import { ILocalStorage } from '../core/interfaces/iLocalStorage';
import { GENERAL_CONST } from '../core/constants/general.constant';
import { GlobalLoaderService } from '../core/services/global-loader.service';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions<AuthLogin>,
              private authService: AuthService,
              private router: Router,
              private loaderService: GlobalLoaderService,
              @Inject('LOCALSTORAGE') private localStorage: ILocalStorage) {
  }

  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogin),
    mergeMap(action => {
      return this.authService.Login(action['creds']).pipe(
        map((profile) => new AuthLoginSuccess(<IUser>profile)),
        catchError((err) => of(new AuthLoginFailed(err)))
      );
    })
  );

  // Start global loader on login request
  @Effect({dispatch: false})
  loginStart$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogin),
    tap(() => this.loaderService.show())
  );

  // Save data to storage on login success
  @Effect({dispatch: false})
  loginSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLoginSuccess),
    tap((action) => {
      // set token and user profile to localStorage
      this.localStorage.setItem(GENERAL_CONST.localStorage.keys.token, action.profile.fakeToken);
      this.localStorage.setItem(GENERAL_CONST.localStorage.keys.profile, JSON.stringify(action.profile));
      this.router.navigateByUrl('app/courses');
      this.loaderService.hide();
    })
  );

  // Hide global loader on login failed
  @Effect({dispatch: false})
  loginFailed$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLoginFailed),
    tap(() => this.loaderService.hide())
  );

  // // Logout
  @Effect()
  logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogout),
    mergeMap(() => {
      return this.authService.Logout().pipe(
        map((isAuthorized) => new AuthLogoutSuccess(isAuthorized)),
        catchError((err) => of(new AuthLogoutFailed(err)))
      );
    })
  );

  // Logout loader start
  @Effect({dispatch: false})
  logoutStart$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogout),
    tap(() => this.loaderService.show())
  );

  // Logout success
  @Effect({dispatch: false})
  logoutSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogoutSuccess),
    tap(() => {
      // clear local storage items
      this.localStorage.removeItem(GENERAL_CONST.localStorage.keys.token);
      this.localStorage.removeItem(GENERAL_CONST.localStorage.keys.profile);
      this.router.navigateByUrl('/login');
      this.loaderService.hide();
    })
  );

  // Hide global loader on logout failed
  @Effect({dispatch: false})
  logoutFailed$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogoutFailed),
    tap(() => this.loaderService.hide())
  );
}
