import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap,  catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { ICreds } from '../interfaces/icreds';
import { ILocalStorage } from '../interfaces/iLocalStorage';
import { APPCONFIG } from '../../config';
import { MESSAGES } from '../constants/messages';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userInfo: IUser;
  private token: string;
  private isLoggedIn = false;
  private LS_KEYS = {
    token: 'token',
    userData: 'userData'
  };
  private REQUEST_DELAY = 2000;

  constructor(@Inject('LOCALSTORAGE') private localStorage: ILocalStorage, private http: HttpClient) {
    this.token = this.localStorage.getItem(this.LS_KEYS.token);
    this.userInfo = JSON.parse(this.localStorage.getItem(this.LS_KEYS.userData));

    if (this.token && this.userInfo) {
      this.isLoggedIn = true;
    }
  }

  public Login(credentials: ICreds): Observable<boolean> {
    // request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // request params
    const params = new URLSearchParams();
    params.set('login', credentials.login);
    params.set('password', credentials.password);

    // request
    return this.http.post(APPCONFIG.apis.auth, params.toString(), {headers}).pipe(
      map(data => this.processToken(data)),
      mergeMap(token => this.GetUserData(token)),
      map(data => this.processUserData(data)),
      catchError(this.handleLoginError)
    );
  }

  public Logout(): Observable<boolean> {
    this.token = null;
    this.userInfo = null;
    this.isLoggedIn = false;
    this.clearStorageData();
    return of(this.isLoggedIn).pipe(delay(this.REQUEST_DELAY));
  }

  public IsAuthenticated(): Observable<boolean> {
    return of(this.isLoggedIn);
  }

  public GetUserInfo(): Observable<IUser> {
    return of(this.userInfo);
  }

  public getToken(): string {
    return this.token;
  }

  public clearStorageData() {
    this.localStorage.removeItem(this.LS_KEYS.token);
    this.localStorage.removeItem(this.LS_KEYS.userData);
  }

  // utils
  private processToken(tokenObj) {
    const {token} = tokenObj;
    this.token = token;

    // save token to local storage
    this.localStorage.setItem(this.LS_KEYS.token, token);

    return token;

  }

  private GetUserData(token: string): Observable<IUser> {
    // request headers
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<IUser>(APPCONFIG.apis.userInfo, '', {headers});
  }

  private processUserData(userData: IUser) {
    this.userInfo = userData;

    // set user data to storage
    this.localStorage.setItem(this.LS_KEYS.userData, JSON.stringify(userData));

    // we are logged in with token and user info
    this.isLoggedIn = true;

    return this.isLoggedIn;
  }

  private handleLoginError(error: HttpErrorResponse) {
    return throwError((error.status === 401) ? MESSAGES.auth.notAuthorized : MESSAGES.auth.generalLoginError);
  }
}
