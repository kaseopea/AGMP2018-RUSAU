import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { AuthService } from '../core/services/auth.service';
import { AuthActionTypes, AuthLogin, AuthLoginFailed, AuthLoginSuccess, AuthLogoutFailed, AuthLogoutSuccess} from '../actions/auth.actions';
import { IUser } from '../protected/user-profile/interfaces/iuser';
import { ILocalStorage } from '../core/interfaces/iLocalStorage';
import { GENERAL_CONST } from '../core/constants/general.constant';
import { GlobalLoaderService } from '../core/services/global-loader.service';
import { UIHideLoader, UIShowLoader } from '../actions/ui.actions';

@Injectable()
export class AuthEffects {
  private REQUEST_DELAY = 1000;
  private SHOW_LOADER_ACTIONS = [
    AuthActionTypes.AuthLogin,
    AuthActionTypes.AuthLogout
  ];
  private HIDE_LOADER_ACTIONS = [
    AuthActionTypes.AuthLoginSuccess,
    AuthActionTypes.AuthLoginFailed,
    AuthActionTypes.AuthLogoutSuccess,
    AuthActionTypes.AuthLogoutFailed
  ];

  constructor(private actions$: Actions<AuthLogin>,
              private authService: AuthService,
              private router: Router,
              private loaderService: GlobalLoaderService,
              @Inject('LOCALSTORAGE') private localStorage: ILocalStorage) {
  }


  // LOGIN
  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogin),
    mergeMap(action => {
      return this.authService.Login(action['creds']).pipe(
        delay(this.REQUEST_DELAY),
        map((profile) => new AuthLoginSuccess(<IUser>profile)),
        catchError((err) => of(new AuthLoginFailed(err)))
      );
    })
  );

  // Login Success
  @Effect({dispatch: false})
  loginSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLoginSuccess),
    tap((action) => {
      // set token and user profile to localStorage
      this.localStorage.setItem(GENERAL_CONST.localStorage.keys.token, action.profile.fakeToken);
      this.localStorage.setItem(GENERAL_CONST.localStorage.keys.profile, JSON.stringify(action.profile));
      this.router.navigateByUrl('/app/courses');
    })
  );

  // Logout
  @Effect()
  logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.AuthLogout),
    mergeMap(() => {
      return this.authService.Logout().pipe(
        delay(this.REQUEST_DELAY),
        map((isAuthorized) => new AuthLogoutSuccess(isAuthorized)),
        catchError((err) => of(new AuthLogoutFailed(err)))
      );
    })
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
    })
  );


  // Show loader
  @Effect()
  showLoader: Observable<any> = this.actions$.pipe(
    ofType(...this.SHOW_LOADER_ACTIONS),
    map(() => new UIShowLoader())
  );

  // Hide loader
  @Effect()
  hideLoader$: Observable<any> = this.actions$.pipe(
    ofType(...this.HIDE_LOADER_ACTIONS),
    map(() => new UIHideLoader())
  );
}
