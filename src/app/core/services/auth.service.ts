import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import v1 from 'uuid/v1';

import { USERPROFILE_MOCK } from '../../mocks/userProfileMock';
import { IUser } from '../../protected/user-profile/interfaces/iuser';
import { ICreds } from '../interfaces/icreds';
import { ILocalStorage } from '../interfaces/iLocalStorage';
import { APPCONFIG } from '../../config';
import { ICourse } from '../../features/courses/interfaces/icourse';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
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

  constructor(@Inject('LOCALSTORAGE') private localStorage: ILocalStorage, private http: HttpClient) {
    this.token = this.localStorage.getItem(this.LS_KEYS.token);
    this.userInfo = JSON.parse(this.localStorage.getItem(this.LS_KEYS.userData));

    if (this.token && this.userInfo) {
      this.isLoggedIn = true;
    }
  }

  public Login(credentials: ICreds) {
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

  public Logout(): void {
    console.warn(`${this.userInfo.username} wants to logout`);
    this.token = null;
    this.userInfo = null;
    this.isLoggedIn = false;
    this.clearStorageData();
  }

  public IsAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  public GetUserInfo() {
    return this.userInfo;
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

  private GetUserData(token: string) {
    // request headers
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post(APPCONFIG.apis.userInfo, '', {headers});
  }

  private processUserData(data) {
    this.userInfo = data;

    // set user data to storage
    this.localStorage.setItem(this.LS_KEYS.userData, JSON.stringify(data));

    // we are logged in with token and user info
    this.isLoggedIn = true;

    return this.isLoggedIn;
  }

  private handleLoginError(error: HttpErrorResponse) {
    return throwError((error.status === 401) ? MESSAGES.auth.notAuthorized : MESSAGES.auth.generalLoginError);
  }
}
